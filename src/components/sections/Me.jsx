import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import LottiePlayer from "../LottiePlayer.jsx";
import TypewriterText from "../TypewriterText.jsx";
import Section from "../layout/Section.jsx";
import { SOCIAL_ICONS } from "../ui/icons.js";
import characterMotion from "../../assets/lottie/characterMotion.json";
import { INTRO, SOCIAL_LINKS, TYPEWRITER_ROLES } from "../../content/me.js";

const BASE_DELAY_S = 1;
const STAGGER_S = 0.1;
const REVEAL_TRANSITION = { duration: 0.45, ease: [0.4, 0, 0.2, 1] };

function revealProps(step) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      ...REVEAL_TRANSITION,
      delay: BASE_DELAY_S + step * STAGGER_S,
    },
  };
}

function stepDelayMs(step) {
  return (BASE_DELAY_S + step * STAGGER_S) * 1000;
}

export default function Me() {
  const greetingStep = 0;
  const typewriterStep = 1;
  const lottieStep = 2;
  const descriptionStep = 3;
  const buttonsStartStep = 4;

  return (
    <Section id="me" className="bg-transparent">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 md:grid md:h-auto md:grid-cols-2 md:items-center md:gap-0 md:pr-42">
        <motion.div
          className="flex w-2/3 justify-center md:w-1/2"
          {...revealProps(lottieStep)}
        >
          <LottiePlayer
            animationData={characterMotion}
            className="max-w-sm md:translate-x-45"
          />
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:justify-start md:text-left">
          <div className="flex flex-col items-center gap-1 md:items-start md:gap-1">
            <h1 className="flex flex-col items-center gap-1.5 text-3xl tracking-tight text-zinc-800 md:items-start md:text-4xl lg:text-5xl">
              <motion.span
                className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-semibold tracking-[-0.02em] text-zinc-800 md:text-2xl md:text-zinc-800 lg:text-3xl"
                {...revealProps(greetingStep)}
              >
                Hi, I&apos;m {INTRO.name} a{" "}
              </motion.span>
              <motion.span
                className="flex w-full justify-center md:block md:w-max"
                {...revealProps(typewriterStep)}
              >
                <TypewriterText
                  roles={TYPEWRITER_ROLES}
                  className="typewriter-line--center-mobile text-zinc-900"
                  startDelay={stepDelayMs(typewriterStep)}
                />
              </motion.span>
            </h1>
            <motion.p
              className="max-w-lg font-['DM_Sans',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700"
              {...revealProps(descriptionStep)}
            >
              {INTRO.subtitle}
            </motion.p>
          </div>

          <nav
            className="flex flex-nowrap items-center justify-center gap-2 md:flex-wrap md:justify-start"
            aria-label="Social and portfolio links"
          >
            {SOCIAL_LINKS.map(({ id, label, href }, index) => (
              <motion.div
                key={id}
                className="inline-flex"
                {...revealProps(buttonsStartStep + index)}
              >
                <Button
                  href={href}
                  variant={index === 0 ? "primary" : "secondary"}
                  external
                  icon={SOCIAL_ICONS[id]}
                  iconOnlyMobile
                  ariaLabel={label}
                >
                  {label}
                </Button>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </Section>
  );
}
