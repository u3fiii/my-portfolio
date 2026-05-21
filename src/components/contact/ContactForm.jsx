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

export default function ContactForm({ theme = "light" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const configured = isContactFormConfigured();
  const isDark = theme === "dark";
  const inputClass = formInputClassName(theme);

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

  const notConfiguredClass = isDark
    ? "rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm font-light text-amber-200"
    : "rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-light text-amber-900";

  const submitClass = isDark
    ? "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-light text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    : "inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-light text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

  const successClass = isDark
    ? "rounded-2xl border border-green-500/40 bg-green-500/10 px-5 py-4 text-sm font-light text-green-300"
    : "rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-light text-green-800";

  const errorClass = isDark
    ? "rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm font-light text-red-300"
    : "rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-light text-red-800";

  if (!configured) {
    return (
      <p className={notConfiguredClass}>{FORM_FEEDBACK.notConfigured}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="contact-name"
        label={FORM.name.label}
        error={errors.name}
        theme={theme}
      >
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          placeholder={FORM.name.placeholder}
          className={inputClass}
          disabled={status === "submitting"}
        />
      </FormField>

      <FormField
        id="contact-email"
        label={FORM.email.label}
        error={errors.email}
        theme={theme}
      >
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          placeholder={FORM.email.placeholder}
          className={inputClass}
          disabled={status === "submitting"}
        />
      </FormField>

      <FormField
        id="contact-message"
        label={FORM.message.label}
        error={errors.message}
        theme={theme}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          placeholder={FORM.message.placeholder}
          className={`${inputClass} resize-y min-h-[120px]`}
          disabled={status === "submitting"}
        />
      </FormField>

      <button type="submit" disabled={status === "submitting"} className={submitClass}>
        {status === "submitting" ? FORM.submitting : FORM.submit}
      </button>

      {status === "success" && (
        <p className={successClass} role="status">
          {FORM_FEEDBACK.success}
        </p>
      )}

      {status === "error" && (
        <p className={errorClass} role="alert">
          {FORM_FEEDBACK.error}
        </p>
      )}
    </form>
  );
}
