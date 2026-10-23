/**
 * One WebGL renderer for every 3D car on the page.
 *
 * Browsers allow only ~16 WebGL contexts at once, and each context costs GPU
 * memory. Instead, every car gets a plain 2D canvas; a single hidden renderer
 * draws each visible car in turn and copies the frame into its canvas, in one
 * shared animation loop. Models are fetched and parsed once per URL, then
 * cloned per car. three.js itself is loaded only when the first car appears.
 */
let enginePromise = null;

function loadEngine() {
  enginePromise ??= Promise.all([
    import("three"),
    import("three/examples/jsm/loaders/GLTFLoader.js"),
    // The models are meshopt-compressed (~6× smaller); this decodes them.
    import("three/examples/jsm/libs/meshopt_decoder.module.js"),
  ]).then(([THREE, { GLTFLoader }, { MeshoptDecoder }]) =>
    createEngine(THREE, new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)),
  );
  return enginePromise;
}

function createEngine(THREE, loader) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Filmic tone mapping keeps the pastels soft instead of clipping to flat colour.
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);

  // Soft contact shadow texture, drawn once and shared by every car.
  const glow = document.createElement("canvas");
  glow.width = glow.height = 64;
  const ctx = glow.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(0,0,0,0.32)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const shadowTexture = new THREE.CanvasTexture(glow);

  const models = new Map();
  const cars = new Set();
  let frame = 0;

  const loadModel = (url) => {
    if (!models.has(url)) models.set(url, loader.loadAsync(url).then((gltf) => gltf.scene));
    return models.get(url);
  };

  const studio = (scene) => {
    // Studio-style three-point light, no shadow maps: a sky/ground fill, a warm
    // key from the front, a cool rim from behind for the outline.
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c8, 1.5));
    const key = new THREE.DirectionalLight(0xfff2e2, 2.6);
    key.position.set(4, 5, 4);
    const rim = new THREE.DirectionalLight(0xd6e4ff, 1.8);
    rim.position.set(-5, 3, -4);
    const bounce = new THREE.DirectionalLight(0xffffff, 0.5);
    bounce.position.set(0, -3, 2);
    scene.add(key, rim, bounce);
  };

  const tick = () => {
    frame = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let anyVisible = false;
    for (const car of cars) {
      if (!car.visible || !car.model) continue;
      anyVisible = true;
      if (!car.still) car.model.rotation.y += 0.0018;
      const w = Math.max(1, Math.round(car.width * dpr));
      const h = Math.max(1, Math.round(car.height * dpr));
      if (car.canvas.width !== w || car.canvas.height !== h) {
        car.canvas.width = w;
        car.canvas.height = h;
      }
      if (renderer.domElement.width < w || renderer.domElement.height < h) {
        renderer.setSize(Math.max(w, renderer.domElement.width), Math.max(h, renderer.domElement.height), false);
      }
      renderer.setViewport(0, 0, w, h);
      renderer.setScissor(0, 0, w, h);
      renderer.setScissorTest(true);
      car.camera.aspect = w / h;
      car.camera.updateProjectionMatrix();
      renderer.render(car.scene, car.camera);
      const out = car.canvas.getContext("2d");
      out.clearRect(0, 0, w, h);
      // The viewport sits at the bottom-left of the shared canvas.
      out.drawImage(renderer.domElement, 0, renderer.domElement.height - h, w, h, 0, 0, w, h);
      if (!car.shown) {
        car.shown = true;
        car.onReady?.();
      }
    }
    if (anyVisible) frame = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  return {
    async mount({ canvas, url, paint, startAngle, still, onReady }) {
      const car = { canvas, visible: false, width: 1, height: 1, still, onReady, model: null };
      car.scene = new THREE.Scene();
      car.camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
      studio(car.scene);
      cars.add(car);

      const source = await loadModel(url);
      if (!cars.has(car)) return car;
      const group = source.clone(true);
      group.traverse((node) => {
        if (!node.isMesh) return;
        // Own materials per car, so one car's paint doesn't recolour the others.
        node.material = Array.isArray(node.material) ? node.material.map((m) => m.clone()) : node.material.clone();
        if (!paint) return;
        const body = new THREE.Color(paint);
        [].concat(node.material).forEach((m) => {
          const c = m.color;
          if (c && Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b) > 0.08) {
            c.copy(body);
            // A satin finish so the key and rim lights read as highlights on the body.
            if ("roughness" in m) m.roughness = 0.42;
            if ("metalness" in m) m.metalness = 0.12;
          }
        });
      });
      const box = new THREE.Box3().setFromObject(group);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      group.position.sub(center);
      const pivot = new THREE.Group();
      pivot.add(group);
      pivot.rotation.y = startAngle;
      car.scene.add(pivot);
      const reach = Math.max(size.x, size.z);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(reach * 1.3, reach * 1.3),
        new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -size.y / 2 + 0.001;
      car.scene.add(shadow);
      const radius = Math.max(size.x, size.y, size.z);
      car.camera.position.set(radius * 1.27, radius * 0.6, radius * 1.76);
      car.camera.lookAt(0, 0, 0);
      car.model = pivot;
      car.dispose = () => {
        shadow.geometry.dispose();
        shadow.material.dispose();
        group.traverse((node) => {
          if (node.isMesh) [].concat(node.material).forEach((m) => m.dispose());
        });
      };
      wake();
      return car;
    },
    update(car, { visible, width, height }) {
      if (visible !== undefined) car.visible = visible;
      if (width) car.width = width;
      if (height) car.height = height;
      wake();
    },
    unmount(car) {
      cars.delete(car);
      car.dispose?.();
    },
  };
}

/** Starts a car in `canvas`; returns a handle with `update` and `destroy`. */
export function mountCar(options) {
  let destroyed = false;
  let engine = null;
  let car = null;
  const pending = {};
  loadEngine().then(async (e) => {
    if (destroyed) return;
    engine = e;
    car = await e.mount(options);
    if (destroyed) e.unmount(car);
    else e.update(car, pending);
  });
  return {
    update(next) {
      Object.assign(pending, next);
      if (engine && car) engine.update(car, next);
    },
    destroy() {
      destroyed = true;
      if (engine && car) engine.unmount(car);
    },
  };
}
