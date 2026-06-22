import Button from "../ui/Button.jsx";
import LottiePlayer from "../LottiePlayer.jsx";
import TypewriterText from "../TypewriterText.jsx";
import Section from "../layout/Section.jsx";
import { SOCIAL_ICONS } from "../ui/icons.js";
import characterMotion from "../../assets/lottie/characterMotion.json";
import { INTRO, SOCIAL_LINKS, TYPEWRITER_ROLES } from "../../content/me.js";

export default function Me() {
  return (
    <Section id="me" className="bg-transparent">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 md:grid md:h-auto md:grid-cols-2 md:items-center md:gap-0 md:pr-42">
        <div className="flex w-2/3 justify-center md:w-1/2">
          <LottiePlayer
            animationData={characterMotion}
            className="max-w-sm md:translate-x-45"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:justify-start md:text-left">
          <div className="flex flex-col items-center gap-1 md:items-start md:gap-1">
            <h1 className="flex flex-col items-center gap-1.5 text-3xl tracking-tight text-zinc-800 md:items-start md:text-4xl lg:text-5xl">
              <span className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-semibold tracking-[-0.02em] text-zinc-800 md:text-2xl md:text-zinc-800 lg:text-3xl">
                Hi, I&apos;m {INTRO.name} a{" "}
              </span>
              <span className="flex w-full justify-center md:block md:w-max">
                <TypewriterText
                  roles={TYPEWRITER_ROLES}
                  className="typewriter-line--center-mobile text-zinc-900"
                />
              </span>
            </h1>
            <p className="max-w-lg font-['DM_Sans',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700">
              {INTRO.subtitle}
            </p>
          </div>

          <nav
            className="flex flex-nowrap items-center justify-center gap-2 md:flex-wrap md:justify-start"
            aria-label="Social and portfolio links"
          >
            {SOCIAL_LINKS.map(({ id, label, href }, index) => (
              <Button
                key={id}
                href={href}
                variant={index === 0 ? "primary" : "secondary"}
                external
                icon={SOCIAL_ICONS[id]}
                iconOnlyMobile
                ariaLabel={label}
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
