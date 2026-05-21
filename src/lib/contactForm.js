/**
 * Sends the contact form to your inbox via Web3Forms.
 * https://web3forms.com — free tier, no backend required.
 */

const ENDPOINT = "https://api.web3forms.com/submit";

export function isContactFormConfigured() {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
}

/**
 * @param {{ name: string, email: string, message: string }} data
 */
export async function sendContactMessage({ name, email, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Contact form is not configured.");
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      replyto: email,
      message,
      subject: `Portfolio message from ${name}`,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Failed to send message.");
  }

  return result;
}
