import { useState } from "react";
import FormField, { formInputClassName } from "../ui/FormField.jsx";
import {
  FORM,
  FORM_FEEDBACK,
} from "../../content/contact.js";
import {
  isContactFormConfigured,
  sendContactMessage,
} from "../../lib/contactForm.js";

const initialValues = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const configured = isContactFormConfigured();

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!configured || !validate()) return;

    setStatus("submitting");

    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setValues(initialValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!configured) {
    return (
      <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-left text-sm font-light text-amber-900">
        {FORM_FEEDBACK.notConfigured}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField id="contact-name" label={FORM.name.label} error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          placeholder={FORM.name.placeholder}
          className={formInputClassName()}
          disabled={status === "submitting"}
        />
      </FormField>

      <FormField id="contact-email" label={FORM.email.label} error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          placeholder={FORM.email.placeholder}
          className={formInputClassName()}
          disabled={status === "submitting"}
        />
      </FormField>

      <FormField
        id="contact-message"
        label={FORM.message.label}
        error={errors.message}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder={FORM.message.placeholder}
          className={`${formInputClassName()} resize-y min-h-[140px]`}
          disabled={status === "submitting"}
        />
      </FormField>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-light text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? FORM.submitting : FORM.submit}
      </button>

      {status === "success" && (
        <p
          className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-light text-green-800"
          role="status"
        >
          {FORM_FEEDBACK.success}
        </p>
      )}

      {status === "error" && (
        <p
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-light text-red-800"
          role="alert"
        >
          {FORM_FEEDBACK.error}
        </p>
      )}
    </form>
  );
}
