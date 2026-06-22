import Section from "../layout/Section.jsx";
import ContactForm from "../contact/ContactForm.jsx";
import {
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
} from "../../content/contact.js";

export default function Contact() {
  return (
    <Section id="contact" className="bg-transparent">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h2 className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-semibold tracking-[-0.02em] text-zinc-900 md:text-2xl lg:text-3xl">
            {CONTACT_HEADING}
          </h2>
          <p className="mt-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700">
            {CONTACT_DESCRIPTION}
          </p>
        </header>

        <ContactForm />
      </div>
    </Section>
  );
}
