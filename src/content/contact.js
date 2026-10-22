/**
 * Contact section copy and form labels.
 * Form delivery is configured via VITE_WEB3FORMS_ACCESS_KEY — see .env.example
 */

export const CONTACT_HEADING = {
  beforeHighlight: "Want to ",
  highlight: "talk about",
  afterHighlight: " your project?",
};
export const CONTACT_DESCRIPTION =
  "Send me a few lines about it and I’ll get back to you soon.";

export const CONTACT_AVAILABILITY = "Available for new projects";
export const CONTACT_RESPONSE_TIME = "Usually replies within 48 hours";
export const CONTACT_SOCIALS_LABEL = "Or find me on";

export const FORM = {
  title: "New message",
  to: { label: "To", value: "Ali Yousefi" },
  email: { label: "From", placeholder: "you@example.com" },
  message: { label: "Message", placeholder: "Tell me about your project or question…" },
  shortcut: "to send",
  submit: "Send message",
  submitting: "Sending…",
};

export const FORM_FEEDBACK = {
  successTitle: "Message sent",
  success: "Thanks for reaching out — I'll reply soon.",
  sendAnother: "Write another",
  error: "Something went wrong. Please try again or email me directly.",
  notConfigured:
    "Form is not connected yet. Add your Web3Forms key to a .env file (see .env.example).",
};
