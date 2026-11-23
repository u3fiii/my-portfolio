import CaseStudyLayout, { Chapter, P, PullQuote } from "../components/case-study/CaseStudyLayout.jsx";
import { GameImage, ProcessStrip, PlayGame } from "../components/case-study/GameStoryBlocks.jsx";

export default function GameWander() {
  return (
    <CaseStudyLayout
      id="wander"
      eyebrow="Game · Independent project"
      title="Wander: building a little world worth driving around"
      deck="A browser driving game where the road wraps a tiny planet and every corner invites exploration."
      role="Game design & development"
      cover={{ src: "/images/games/wander-editorial.jpg", alt: "Concept illustration of Wander's low-poly planet, curving road and small orange car", width: 1672, height: 941 }}
      meta={[["Role", "Game design & development"], ["Platform", "Browser · desktop and mobile"], ["Stack", "React, TypeScript, Three.js"]]}
    >
      <Chapter title="A drive without a destination" nav="The idea">
        <P>Wander started with a small question: could driving itself be the reward? Instead of a large open world, I built a miniature planet with a city, forest and coast connected by one road. The first thing you notice is the whole world at once; as you drive, individual places unfold around the curve.</P>
        <PullQuote>The planet is small enough to understand, but the next bend still feels worth seeing.</PullQuote>
        <PlayGame href="https://wander-woad.vercel.app/" title="Wander" note="Open the playable browser game in a new tab. Keyboard, touch and gamepad controls are supported." />
        <P>The <a href="https://github.com/u3fiii/wander" target="_blank" rel="noopener noreferrer">source code is also public ↗</a>.</P>
      </Chapter>

      <Chapter title="How the planet and road work" nav="World system">
        <P>The world is generated from a repeatable set of regions and terrain rules. The road is not a flat loop placed on top: its vertices are projected back onto the displaced sphere. That keeps the driveable surface attached to the land as the planet rises, dips and turns away from the camera.</P>
        <GameImage src="/images/games/wander-world-system.webp" alt="Editorial illustration showing Wander's terrain, road and scenery as separate layers" caption="Concept illustration of the construction logic: terrain first, a continuous route following its surface, then places and details. This is not a gameplay screenshot." />
        <ProcessStrip label="World-building pipeline" steps={[
          { title: "Define regions", detail: "City, forest and coast share one deterministic globe and road network." },
          { title: "Project the route", detail: "Road points follow the globe's surface and form a continuous driveable loop." },
          { title: "Dress the scene", detail: "Instanced scenery, traffic, lighting and seasonal palettes give each stretch character." },
        ]} />
        <P>That projection solved a visual problem as much as a technical one. A road floating just above the hills would break the toy-world illusion; a route that follows every bump too closely would be hard to read at speed. I used the terrain as the source of truth and kept the path visually continuous, so the globe works both as a recognizable object from afar and a navigable place up close.</P>
        <GameImage src="/images/games/wander-planet.png" alt="Actual Wander gameplay with the car crossing a raised bridge on the miniature planet" caption="Actual gameplay: the bridge and road have to remain readable even as the terrain curves away underneath the car." />
        <P>The map camera gives the other half of the answer. From there, the road becomes a line that connects a forest, town and coast; little landmarks help each district keep a distinct identity. I wanted players to remember a place they had passed, not just a sequence of bends.</P>
        <GameImage src="/images/games/wander-map.png" alt="Actual Wander map view showing the full low-poly globe with coastal islands and forest" caption="Actual game map view: rotating the globe reveals how the road, land and water share one small world." />
      </Chapter>

      <Chapter title="Making the car feel playful" nav="Driving feel">
        <P>The car moves on the globe by heading, speed and steering, with small physics steps so a slow frame does not suddenly change its handling. Acceleration builds progressively, steering responds to speed, and the handbrake lets the car slide through a turn. A timed boost adds a short burst once it is charged. Those rules are deliberately more playful than a driving simulator: the important feeling is entering a bend, correcting the car and finding the road again.</P>
        <GameImage src="/images/games/wander-close-pass.jpg" alt="Concept illustration of Wander's orange car drifting past traffic around a curve" caption="Editorial illustration of the driving rhythm: approach a bend, slip past traffic and recover the line. This is not a gameplay screenshot." />
        <P>The handling needed two scales to agree. From the overhead view, the car should feel like a little toy crossing a globe. From the follow camera, steering and road edges need enough precision to make a bend satisfying. I tuned acceleration, grip and the handbrake around that shift in perspective, then added traffic and near misses to give a reason to take a corner well.</P>
        <P>I kept the rules shared across devices. Keyboard, touch and gamepad input all feed the same driving state. The first-time guide reads the player's current input device and teaches steering, speed and the goal while the car is already moving.</P>
        <GameImage src="/images/games/wander-traffic.png" alt="Actual Wander gameplay with the orange player car and several traffic vehicles on the raised road" caption="Actual gameplay: other cars make a familiar stretch of road feel different on every pass." />
      </Chapter>

      <Chapter title="Teaching without stopping the drive" nav="First minutes">
        <P>The first minutes are a design problem of their own. The car is already rolling when the lesson begins, so the player can learn steering through a real bend rather than a detached instruction screen. The next prompts arrive when their actions become relevant: traffic introduces close passes and hearts, and drift, boost, camera and map appear as short tips later.</P>
        <P>The guide watches which input device is active and shows the right controls for keyboard, touch or gamepad. This keeps the same game rules across devices while changing the language of the help. It also avoids teaching every button at once, before the player has a reason to use it.</P>
        <GameImage src="/images/games/wander-drive.png" alt="Actual Wander gameplay showing the just-in-time traffic lesson over the road" caption="Actual gameplay: the traffic lesson appears over a live drive, when passing cars starts to matter." />
      </Chapter>

      <Chapter title="Giving one road more than one mood" nav="Replay loop">
        <P>A compact world is easy to learn, so replayability has to come from how the same route changes. Score milestones ease the planet through meadow, amber, blossom and frost. The mesh stays in place during a run; its materials, sky and light shift as the player earns points. The change rewards momentum without interrupting the drive.</P>
        <GameImage src="/images/games/wander-seasons.jpg" alt="Concept colour study showing Wander's planet in meadow, amber, blossom and frost palettes" caption="Editorial colour study of one planet across four moods. The game's themes change while driving; this illustration is a comparison, not four gameplay frames." />
        <P>After a run ends, the next run can rebuild the road with a seeded variation. The changes keep the route driveable and the bridge clear, but alter the rhythm of the bends. That distinction matters: colour can shift in motion, while geometry changes only between runs so the road never moves beneath the player.</P>
        <P>Traffic gives the familiar route a second layer. Close passes, drifts and boosts score differently, so a player can choose between a relaxed lap and chasing a better run on the same tiny planet.</P>
      </Chapter>

      <Chapter title="Technology, iteration and AI" nav="How I built it">
        <P>React and TypeScript handle the interface and game state; Three.js with React Three Fiber renders the spherical world, vehicles and scenery. The source separates driving rules, world generation, art direction and rendering quality, so I could change one part without remaking the others.</P>
        <P>A globe makes performance unusually visible: scenery on the far side can still cost rendering time even though the player cannot see it. The mobile profile adapts pixel density, uses lighter shadows and skips some small decoration; horizon culling keeps the hidden side out of the frame. Roads, traffic and driving rules remain part of the same game on a smaller device.</P>
        <P>I used AI coding assistance as an iteration partner: turning specific ideas into code, inspecting the result in the browser, then adjusting the parameters after actually driving. For example, the project's look editor lets me tune lighting in the live scene and save values for another coding pass. That makes feedback specific: the coast can be too bright from one camera, a turn can be too slippery on touch, or a prop can disappear at the horizon.</P>
        <P>Each pass ended in a playable build. The workflow was to describe one change, check what the code actually did, drive it with different inputs, and keep or revise it based on feel. AI helped me move through options faster; the game running in the browser remained the test.</P>
        <ProcessStrip label="AI-assisted production loop" steps={[
          { title: "Set the intent", detail: "Describe the feel, constraints and what should change in the player's experience." },
          { title: "Build a slice", detail: "Implement one mechanic or visual system, then run it in the browser." },
          { title: "Play and refine", detail: "Drive, notice failures, tune values and repeat across desktop and mobile." },
        ]} />
      </Chapter>

      <Chapter title="What this project shows" nav="Takeaway">
        <P>Wander is a playable independent game, not a commercial release. It became a useful exercise in making systems support one feeling: a road worth following. Terrain generation makes the world coherent, car tuning makes the next corner inviting, the coach lets people start quickly, and the theme and layout changes make another lap feel worthwhile.</P>
      </Chapter>
    </CaseStudyLayout>
  );
}
