/**
 * Contact section copy and form labels.
 * Form delivery is configured via VITE_WEB3FORMS_ACCESS_KEY — see .env.example
 */

export const CONTACT_HEADING = "Contact";
export const CONTACT_DESCRIPTION =
  "Have a project in mind or want to say hello? Send a message and I'll get back to you by email.";

export const FORM = {
  name: { label: "Name", placeholder: "Your name" },
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
