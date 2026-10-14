import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "../layout/Section.jsx";
import ContactForm from "../contact/ContactForm.jsx";
import {
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
} from "../../content/contact.js";

export default function Contact() {
  const headerRef = useRef(null);
  const hasEntered = useInView(headerRef, { once: true, amount: 0.65 });

  return (
    <Section id="contact" className="bg-transparent">
      <div className="w-full max-w-lg">
        <header ref={headerRef} className="mb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-bold tracking-[-0.02em] text-zinc-900 md:text-2xl lg:text-3xl"
          >
            {CONTACT_HEADING.beforeHighlight}
            <span
              className={`marker-highlight contact-marker${hasEntered ? " is-active" : ""}`}
              style={{
                "--marker-delay": "200ms",
                "--marker-duration": "550ms",
              }}
            >
              {CONTACT_HEADING.highlight}
            </span>
            {CONTACT_HEADING.afterHighlight}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.45,
              delay: 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="mt-3 font-['Quicksand',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700"
          >
            {CONTACT_DESCRIPTION}
          </motion.p>
        </header>

        <ContactForm />
      </div>
    </Section>
  );
}
