import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock } from "@phosphor-icons/react";
import Section from "../layout/Section.jsx";
import ContactForm from "../contact/ContactForm.jsx";
import SocialIconLink from "../ui/SocialIconLink.jsx";
import { ICON_WEIGHT } from "../ui/icons.js";
import {
  CONTACT_AVAILABILITY,
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
  CONTACT_RESPONSE_TIME,
  CONTACT_SOCIALS_LABEL,
} from "../../content/contact.js";
import { SOCIAL_LINKS } from "../../content/me.js";
import useSectionParallax, {
  useDepth,
  useDepthTranslate,
} from "../../hooks/useSectionParallax.js";

const REVEAL_EASE = [0.22, 1, 0.36, 1];

function reveal(hasEntered, step) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: hasEntered ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay: step * 0.08, ease: REVEAL_EASE },
  };
}

export default function Contact() {
  const sectionElRef = useRef(null);
  const contentRef = useRef(null);
  const hasEntered = useInView(contentRef, { once: true, amount: 0.4 });
  // Each line of copy sits a little nearer than the one above, so the column
  // fans open mid-glide; the message card is the nearest plane.
  const parallax = useSectionParallax(sectionElRef);
  const depth = {
    badge: useDepthTranslate(parallax, 28),
    heading: useDepthTranslate(parallax, 40),
    description: useDepthTranslate(parallax, 54),
    replyTime: useDepthTranslate(parallax, 64),
    socials: useDepthTranslate(parallax, 76),
  };
  const cardY = useDepth(parallax, 120);

  return (
    <Section
      id="contact"
      sectionRef={sectionElRef}
      className="min-h-[100dvh] justify-center bg-transparent py-24"
      contentMaxWidth="max-w-lg lg:max-w-[62rem]"
      tallOnMobile={false}
    >
      <div
        ref={contentRef}
        className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16"
      >
        <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            {...reveal(hasEntered, 0)}
            style={{ translate: depth.badge }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white py-1 pl-2.5 pr-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-700"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-zinc-900 opacity-40 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-zinc-900" />
            </span>
            {CONTACT_AVAILABILITY}
          </motion.p>

          <motion.h2
            {...reveal(hasEntered, 1)}
            style={{ translate: depth.heading }}
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
            style={{ translate: depth.description }}
            className="mt-4 max-w-sm font-['Quicksand',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700"
          >
            {CONTACT_DESCRIPTION}
          </motion.p>

          <motion.p
            {...reveal(hasEntered, 3)}
            style={{ translate: depth.replyTime }}
            className="mt-3 inline-flex items-center gap-1.5 font-['DM_Sans',ui-sans-serif,sans-serif] text-sm text-zinc-500"
          >
            <Clock className="h-4 w-4" weight={ICON_WEIGHT} aria-hidden />
            {CONTACT_RESPONSE_TIME}
          </motion.p>

          <motion.nav
            {...reveal(hasEntered, 4)}
            style={{ translate: depth.socials }}
            className="mt-8 flex flex-col items-center gap-3 lg:items-start"
            aria-label="Social links"
          >
            <span className="font-['DM_Sans',ui-sans-serif,sans-serif] text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
              {CONTACT_SOCIALS_LABEL}
            </span>
            <ul className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ id, label, href }, index) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={
                    hasEntered ? { opacity: 1, y: 0, scale: 1 } : undefined
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.42 + index * 0.06,
                    ease: REVEAL_EASE,
                  }}
                >
                  <SocialIconLink id={id} label={label} href={href} />
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </header>

        <motion.div style={{ y: cardY }} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={hasEntered ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.16, ease: REVEAL_EASE }}
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
