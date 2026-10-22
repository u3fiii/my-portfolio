import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock } from "@phosphor-icons/react";
import Section from "../layout/Section.jsx";
import ContactForm from "../contact/ContactForm.jsx";
import { ICON_WEIGHT, SOCIAL_ICONS } from "../ui/icons.js";
import {
  CONTACT_AVAILABILITY,
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
  CONTACT_RESPONSE_TIME,
  CONTACT_SOCIALS_LABEL,
} from "../../content/contact.js";
import { SOCIAL_LINKS } from "../../content/me.js";

const REVEAL_EASE = [0.4, 0, 0.2, 1];

function reveal(hasEntered, step) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: hasEntered ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.45, delay: step * 0.08, ease: REVEAL_EASE },
  };
}

export default function Contact() {
  const sectionRef = useRef(null);
  const hasEntered = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <Section
      id="contact"
      className="min-h-[100dvh] justify-center bg-transparent py-24"
      contentMaxWidth="max-w-lg lg:max-w-5xl"
      tallOnMobile={false}
    >
      <div
        ref={sectionRef}
        className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16"
      >
        <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            {...reveal(hasEntered, 0)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white py-1 pl-2.5 pr-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-700"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {CONTACT_AVAILABILITY}
          </motion.p>

          <motion.h2
            {...reveal(hasEntered, 1)}
            className="mt-5 font-['Source_Serif_4',Georgia,serif] text-[1.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-zinc-900 md:text-3xl lg:text-[2.625rem]"
          >
            {CONTACT_HEADING.beforeHighlight}
            <span
              className={`marker-highlight contact-marker${hasEntered ? " is-active" : ""}`}
              style={{
                "--marker-delay": "350ms",
                "--marker-duration": "550ms",
              }}
            >
              {CONTACT_HEADING.highlight}
            </span>
            {CONTACT_HEADING.afterHighlight}
          </motion.h2>

          <motion.p
            {...reveal(hasEntered, 2)}
            className="mt-4 max-w-sm font-['Quicksand',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700"
          >
            {CONTACT_DESCRIPTION}
          </motion.p>

          <motion.p
            {...reveal(hasEntered, 3)}
            className="mt-3 inline-flex items-center gap-1.5 font-['DM_Sans',ui-sans-serif,sans-serif] text-sm text-zinc-500"
          >
            <Clock className="h-4 w-4" weight={ICON_WEIGHT} aria-hidden />
            {CONTACT_RESPONSE_TIME}
          </motion.p>

          <motion.nav
            {...reveal(hasEntered, 4)}
            className="mt-8 flex flex-col items-center gap-3 self-stretch border-t border-dashed border-zinc-300 pt-6 lg:items-start"
            aria-label="Social links"
          >
            <span className="font-['DM_Sans',ui-sans-serif,sans-serif] text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
              {CONTACT_SOCIALS_LABEL}
            </span>
            <ul className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ id, label, href }) => {
                const Icon = SOCIAL_ICONS[id];
                return (
                  <li key={id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="pill-hover-ring button-ready-bounce inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                    >
                      <Icon className="h-[1.125rem] w-[1.125rem]" weight={ICON_WEIGHT} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, delay: 0.2, ease: REVEAL_EASE }}
          className="w-full"
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
}
