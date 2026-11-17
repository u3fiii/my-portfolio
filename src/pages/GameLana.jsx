import CaseStudyLayout, { Chapter, P, PullQuote } from "../components/case-study/CaseStudyLayout.jsx";
import { GameImage, ProcessStrip, PlayGame } from "../components/case-study/GameStoryBlocks.jsx";

export default function GameLana() {
  return (
    <CaseStudyLayout
      id="lana"
      eyebrow="Game · Independent prototype"
      title="Mote: making a small journey feel alive"
      deck="A silhouette platformer where one small figure travels through red forest, cobalt water, amber light and violet night."
      role="Game design & development"
      cover={{ src: "/images/games/lana-editorial.jpg", alt: "Concept illustration based on the current Mote game, with a small silhouette crossing from a red forest toward a cobalt lake", width: 1672, height: 941 }}
      meta={[["Role", "Game design & development"], ["Platform", "Godot · Web prototype"], ["Focus", "Movement and atmosphere"]]}
    >
      <Chapter title="A little light in the forest" nav="The idea">
        <P>The project folder is called Lana; the current game is named Mote. Its protagonist is a small black silhouette with two bright eyes. I wanted her to feel tiny against a landscape that changes around her, but never hard to find or control.</P>
        <PullQuote>Let movement and colour tell the story before adding words.</PullQuote>
        <PlayGame href="https://hollowlight-xi.vercel.app/" title="Mote" note="Open the playable Godot web prototype in a new tab. Desktop controls use the arrow keys or A/D, Space to jump and E to interact." />
      </Chapter>

      <Chapter title="One level, several moods" nav="Visual system">
        <P>The world is drawn in grayscale layers: dark foreground, play area, wooded edge, hills, mountains and fog. Each layer scrolls by a different amount, making depth visible when the player moves. A final shader maps brightness to three values and shifts the scene from blood red at the opening to cobalt over the lake, then amber and violet further along the path.</P>
        <GameImage src="/images/games/lana-current-forest.png" alt="Current Mote gameplay showing the red opening forest and the small silhouette character" caption="Current playable build: the red opening scene uses almost only black silhouettes and one saturated light colour." crop />
        <ProcessStrip label="How the atmosphere is built" steps={[
          { title: "Draw in values", detail: "Keep the character and traversable ground readable as dark silhouettes." },
          { title: "Layer the depth", detail: "Parallax, haze, wind and light separate near space from distant space." },
          { title: "Change the palette", detail: "One shader recolours the scene as the player crosses stage boundaries." },
        ]} />
        <GameImage src="/images/games/lana-lake-editorial.jpg" alt="Concept illustration of Mote's cobalt lake with the small protagonist standing on a fallen log" caption="Editorial illustration of the cobalt lake, based on the current playable build. The red frame above is an actual screenshot." />
        <P>The colour shift is also a wayfinding tool. It marks progress through a single continuous journey without a conventional level select, while the two bright eyes stay a reliable point of focus in each hue.</P>
      </Chapter>

      <Chapter title="Making movement feel forgiving" nav="Mechanics">
        <P>The protagonist is a Godot CharacterBody2D with a code-animated cutout rig. Movement has acceleration and a softer stop; holding jump gives more height while releasing it early cuts the arc short. The game also accepts a jump for roughly 0.1 seconds after leaving an edge and remembers a press for roughly 0.12 seconds before landing. Those small allowances preserve the player's intention when timing is almost right.</P>
        <P>Her legs cycle with distance travelled to avoid foot sliding; a landing squash, head turn and spring-like skirt and pigtails keep the simple silhouette expressive. The level then gives the movement something tactile to do: push a heavy log into the pond, ride it, catch a rope and pump the swing across a gap.</P>
        <GameImage src="/images/games/lana-puzzle-concept.png" alt="Concept illustration of Mote's log crossing and rope swing, moving from cobalt to amber" caption="Concept illustration based on the current build: the lake sequence leads from pushing the log to crossing the water, before a rope swing in the amber stage." />
        <ProcessStrip label="A small chain of physical interactions" steps={[
          { title: "Push", detail: "The log responds slowly, then coasts into the water with weight." },
          { title: "Balance", detail: "The log becomes a moving platform across the pond." },
          { title: "Swing", detail: "A point-chain rope carries momentum; the player pumps and jumps off." },
        ]} />
        <P>The rope is a different kind of interaction. Instead of a fixed animation, its points respond to gravity and constraints; the player can add momentum and choose when to let go. The same movement controls now have a new meaning because the environment changes what they act on.</P>
      </Chapter>

      <Chapter title="The build process and AI" nav="How I built it">
        <P>Godot 4 and GDScript drive the level and character. Custom shaders handle the final palette, grain, vignette and moving vegetation. The prototype uses code-drawn shapes while the atmosphere and play feel are being tested; painted assets and a finished character rig remain future work.</P>
        <P>I worked with AI coding assistance in small, testable passes. I specified the visual or mechanical problem, reviewed the resulting implementation, then ran the game and inspected actual frames. The repository includes screenshot-driven checks for different positions and movement states. That made the conversation with AI concrete: a rope that fails to catch, a jump that feels late or a palette that buries the character can be seen and corrected.</P>
        <P>I kept the feedback visual and mechanical: could I see the girl in fog, did a near-miss jump feel fair, did the log seem heavy before it floated, and did the rope communicate when it could be caught? The concept images explain the interaction and colour arc; the red opening frame is from the current playable web build.</P>
      </Chapter>

      <Chapter title="Where it stands" nav="Takeaway">
        <P>Mote is a playable prototype, not a finished release. Its value in my portfolio is the process: finding a visual language, building a responsive movement system and iterating on both with the actual game running.</P>
      </Chapter>
    </CaseStudyLayout>
  );
}
