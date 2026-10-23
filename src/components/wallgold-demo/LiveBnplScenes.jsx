import { useMemo } from "react";
import scenes from "./scenes.json";
import { BrowserBar } from "./source/ui.jsx";
import WallGold from "./source/surfaces/WallGold.jsx";
import Bnpl from "./source/surfaces/Bnpl.jsx";
import Site from "./source/surfaces/Site.jsx";
import Pos from "./source/surfaces/Pos.jsx";
import { surfView } from "./source/surf.js";
import "./source/scoped.css";
import "./LiveBnplScenes.css";

const LABELS = {
  "wallgold-home": "WallGold · entry",
  "wallgold-intro": "Goldpay · introduction",
  "wallgold-credit": "Goldpay · credit",
  "merchant-checkout": "Merchant · checkout",
  "merchant-summary": "Goldpay · purchase review",
  "merchant-terms": "Goldpay · installment plan",
  "pos-otp": "POS · identity check",
  "pos-waiting": "POS · waiting for customer",
  "pos-terms": "Customer · payment review",
};

function SceneContent({ scene, state }) {
  if (scene === "wallgold-home") return <WallGold S={state} />;
  if (scene === "wallgold-intro" || scene === "wallgold-credit") {
    return <Bnpl S={surfView(state, "wg", { embed: true, user: { ...state.user, logged: true } })} />;
  }
  if (scene === "merchant-checkout") return <Site S={state} />;
  if (scene === "merchant-summary" || scene === "merchant-terms") {
    return <><BrowserBar url={`pay.goldpay.ir/${state.flow.orderId}`} /><Bnpl S={surfView(state, "web")} /></>;
  }
  if (scene === "pos-otp" || scene === "pos-waiting") return <Pos S={state} />;
  return <Bnpl S={surfView(state, "app")} />;
}

export function LiveBnplScreen({ scene, hero = false }) {
  const state = useMemo(() => {
    const snapshot = structuredClone(scenes[scene]);
    if (snapshot.flow?.resEnd) snapshot.flow.resEnd = Date.now() + 10 * 60_000;
    return snapshot;
  }, [scene]);
  const skin = scene.startsWith("wallgold") && scene === "wallgold-home" ? "wg" : scene === "merchant-checkout" ? "tlapp" : "bz";
  const blockAction = (event) => { event.preventDefault(); event.stopPropagation(); };
  return (
    <div className={`bnpl-screen-item ${hero ? "bnpl-screen-item--hero" : ""}`}>
      {!hero && <span className="bnpl-screen-item__label">{LABELS[scene]}</span>}
      <div className="bnpl-screen-item__slot">
        <div className="bnpl-screen-item__scaled">
          <div className="bnpl-demo-root bnpl-screen-device" dir="rtl" role="img" aria-label={`Code-rendered ${LABELS[scene]} screen`} onClickCapture={blockAction} onKeyDownCapture={blockAction}>
            <div className="bnpl-screen-status"><span>۹:۴۱</span><span>● ▮▮▮</span></div>
            <div className={`screen ${skin}`} data-id={scene}>
              <SceneContent scene={scene} state={state} />
            </div>
            <div className="bnpl-screen-nav"><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveBnplScenes({ items, caption, featured = false }) {
  return (
    <figure className={`bnpl-scenes case-study__ui cs-figure--bleed bnpl-scenes--${items.length} ${featured ? "bnpl-scenes--featured" : ""}`}>
      <div className="bnpl-scenes__track">
        {items.map((scene) => <LiveBnplScreen key={scene} scene={scene} />)}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
