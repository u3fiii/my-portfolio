import { Dribbble, Github, Instagram, Linkedin } from "lucide-react";
import Button from "../ui/Button.jsx";
import LottiePlayer from "../LottiePlayer.jsx";
import TypewriterText from "../TypewriterText.jsx";
import Section from "../layout/Section.jsx";
import characterMotion from "../../assets/lottie/characterMotion.json";
import { INTRO, SOCIAL_LINKS, TYPEWRITER_ROLES } from "../../content/me.js";

const SOCIAL_ICONS = {
  instagram: Instagram,
  dribbble: Dribbble,
  github: Github,
  linkedin: Linkedin,
};

export default function Me() {
  return (
    <Section id="me" className="bg-zinc-50">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 md:grid md:h-auto md:grid-cols-2 md:items-center md:gap-0 md:pr-42">
        <div className="flex w-2/3 justify-center md:w-1/2">
          <LottiePlayer
            animationData={characterMotion}
            className="max-w-sm md:translate-x-45"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:justify-start md:text-left">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h1 className="flex flex-col items-center text-3xl tracking-tight text-zinc-800 md:items-start md:text-4xl lg:text-5xl">
              <span className="font-medium text-3xl text-zinc-700">Hi, I&apos;m {INTRO.name} a </span>
              <span className="inline-block min-w-[14ch] align-bottom">
                <TypewriterText
                  words={TYPEWRITER_ROLES}
                  className="font-bold text-zinc-900"
                />
              </span>
            </h1>
            <p className="max-w-lg text-lg font-medium leading-relaxed text-zinc-600">
              {INTRO.subtitle}
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-2 md:justify-start"
            aria-label="Social and portfolio links"
          >
            {SOCIAL_LINKS.map(({ id, label, href }, index) => (
              <Button
                key={id}
                href={href}
                variant={index === 0 ? "primary" : "secondary"}
                external
                icon={SOCIAL_ICONS[id]}
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
