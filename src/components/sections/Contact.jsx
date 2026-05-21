import Section from "../layout/Section.jsx";
import ContactForm from "../contact/ContactForm.jsx";
import {
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
} from "../../content/contact.js";

export default function Contact() {
  return (
    <Section
      id="contact"
      className="items-center justify-center bg-zinc-50 px-6 py-24"
    >
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            {CONTACT_HEADING}
          </h2>
          <p className="mt-3 text-lg font-light text-zinc-600">
            {CONTACT_DESCRIPTION}
          </p>
        </header>

        <ContactForm />
      </div>
    </Section>
  );
}
