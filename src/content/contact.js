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

export const FORM = {
  email: { label: "Email", placeholder: "you@example.com" },
  message: { label: "Message", placeholder: "Tell me about your project or question…" },
  submit: "Send message",
  submitting: "Sending…",
};

export const FORM_FEEDBACK = {
  success: "Thanks — your message was sent. I'll reply soon.",
  error: "Something went wrong. Please try again or email me directly.",
  notConfigured:
    "Form is not connected yet. Add your Web3Forms key to a .env file (see .env.example).",
};
