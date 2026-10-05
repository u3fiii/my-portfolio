import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import LottiePlayer from "../LottiePlayer.jsx";
import TypewriterText from "../TypewriterText.jsx";
import Section from "../layout/Section.jsx";
import instagramAnimation from "../../assets/lottie/Instagram_.json";
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
    <Section id="me" className="overflow-visible bg-transparent">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 min-[550px]:max-[767px]:gap-6 md:max-lg:grid md:max-lg:h-auto md:max-lg:mx-auto md:max-lg:w-full md:max-lg:max-w-[720px] md:max-lg:grid-cols-[auto_minmax(0,1fr)] md:max-lg:items-center md:max-lg:gap-x-5 md:max-lg:gap-y-4 lg:grid lg:h-auto lg:w-full lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-0 lg:pr-42">
        <motion.div
          className="flex w-2/3 justify-center min-[550px]:max-[767px]:w-[52%] min-[550px]:max-[767px]:max-w-[190px] md:max-lg:w-auto md:max-lg:shrink-0 md:max-lg:justify-self-center lg:w-1/2"
          {...revealProps(lottieStep)}
        >
          <LottiePlayer
            animationData={characterMotion}
            className="max-w-sm min-[550px]:max-[800px]:w-[180px] min-[550px]:max-[800px]:max-w-[180px] md:max-lg:min-[801px]:w-[220px] md:max-lg:min-[801px]:max-w-[220px] md:max-lg:translate-x-0 lg:translate-x-45"
          />
        </motion.div>

        <div className="flex w-full min-w-0 flex-col items-center justify-center gap-6 text-center md:max-lg:items-start md:max-lg:justify-start md:max-lg:text-left lg:items-start lg:justify-start lg:text-left">
          <div className="flex flex-col items-center gap-1 md:max-lg:items-start lg:items-start md:max-lg:gap-1">
            <h1 className="flex flex-col items-center gap-1.5 text-3xl tracking-tight text-zinc-800 md:max-lg:items-start md:max-lg:text-4xl lg:items-start lg:text-5xl">
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
              className="max-w-lg font-['DM_Sans',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700 md:max-lg:max-w-none md:max-lg:text-[0.9375rem] md:max-lg:leading-snug"
              {...revealProps(descriptionStep)}
            >
              {INTRO.subtitle}
            </motion.p>
          </div>

          <nav
            className="-m-1 flex w-full min-w-0 flex-nowrap items-center justify-center gap-2 overflow-visible p-1 md:max-lg:justify-start md:max-lg:gap-1.5 lg:justify-start lg:gap-1.5 xl:gap-2"
            aria-label="Social and portfolio links"
          >
            {SOCIAL_LINKS.map(({ id, label, href }, index) => (
              <motion.div
                key={id}
                className="inline-flex overflow-visible"
                {...revealProps(buttonsStartStep + index)}
              >
                <Button
                  href={href}
                  variant={id === "instagram" ? "instagram" : "secondary"}
                  external
                  icon={SOCIAL_ICONS[id]}
                  lottie={id === "instagram" ? instagramAnimation : undefined}
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
