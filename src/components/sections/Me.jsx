import Button from "../ui/Button.jsx";
import LottiePlayer from "../LottiePlayer.jsx";
import TypewriterText from "../TypewriterText.jsx";
import Section from "../layout/Section.jsx";
import characterMotion from "../../assets/lottie/characterMotion.json";
import { INTRO, SOCIAL_LINKS, TYPEWRITER_ROLES } from "../../content/me.js";

export default function Me() {
  return (
    <Section id="me" className="justify-center bg-zinc-50 px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex h-full w-full items-center justify-center md:justify-end">
          <LottiePlayer animationData={characterMotion} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl tracking-tight text-zinc-800 md:text-4xl lg:text-5xl">
              <span className="font-light">Hi, I&apos;m {INTRO.name} a </span>
              <span className="inline-block min-w-[14ch] align-bottom">
                <TypewriterText
                  words={TYPEWRITER_ROLES}
                  className="font-bold text-zinc-900"
                />
              </span>
            </h1>
            <p className="max-w-lg text-lg font-light leading-relaxed text-zinc-600">
              {INTRO.subtitle}
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-3"
            aria-label="Social and portfolio links"
          >
            {SOCIAL_LINKS.map(({ id, label, href }, index) => (
              <Button
                key={id}
                href={href}
                variant={index === 0 ? "primary" : "secondary"}
                external
              >
                {label}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </Section>
  );
}
