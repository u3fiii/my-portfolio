import Section from "../layout/Section.jsx";
import ContactForm from "../contact/ContactForm.jsx";
import {
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
} from "../../content/contact.js";

export default function Contact() {
  return (
    <Section id="contact" className="bg-zinc-950/80 text-white backdrop-blur-sm">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {CONTACT_HEADING}
          </h2>
          <p className="mt-3 text-lg font-light text-zinc-300">
            {CONTACT_DESCRIPTION}
          </p>
        </header>

        <ContactForm theme="dark" />
      </div>
    </Section>
  );
}
