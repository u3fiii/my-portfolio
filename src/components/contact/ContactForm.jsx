import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import LottieIcon, { prefersReducedMotion } from "../ui/LottieIcon.jsx";
import ThickCaret from "../ui/ThickCaret.jsx";
import sendAnimation from "../../assets/lottie/Send message.json";
import { SITE } from "../../content/site.js";
import { FORM, FORM_FEEDBACK } from "../../content/contact.js";
import {
  isContactFormConfigured,
  sendContactMessage,
} from "../../lib/contactForm.js";
import {
  englishCharForKey,
  insertText,
  pastedToEnglish,
  toEnglish,
} from "../../utils/englishInput.js";

const initialValues = { email: "", message: "" };

const FONT_UI = "font-['DM_Sans',ui-sans-serif,sans-serif]";
const rowLabelClass = `${FONT_UI} w-12 shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400`;
const fieldErrorClass = `${FONT_UI} text-xs text-red-600 dark:text-red-400`;
const swap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
};

/** Mail-composer card: To / From rows, a body, and a send bar. */
export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const sendLottieRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const playSendIcon = () => {
    if (!prefersReducedMotion()) sendLottieRef.current?.goToAndPlay(0, true);
  };

  const configured = isContactFormConfigured();
  const isSubmitting = status === "submitting";

  // Caret to restore after a value was rewritten to English (React would
  // otherwise jump it to the end).
  const pendingCaretRef = useRef(null);
  useLayoutEffect(() => {
    const pending = pendingCaretRef.current;
    if (!pending) return;
    pendingCaretRef.current = null;
    pending.field.setSelectionRange(pending.position, pending.position);
  });

  function handleChange(event) {
    const field = event.target;
    const { name, value } = field;
    const english = toEnglish(value);
    if (english !== value && field.selectionStart != null) {
      pendingCaretRef.current = {
        field,
        position: toEnglish(value.slice(0, field.selectionStart)).length,
      };
    }
    setValues((prev) => ({ ...prev, [name]: english }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === "error") setStatus("idle");
  }

  /** Typing on a Persian (or any non-English) layout still types English. */
  function handleEnglishKeyDown(event) {
    const char = englishCharForKey(event);
    if (char === null) return;
    event.preventDefault();
    insertText(event.currentTarget, char);
  }

  function handleEnglishPaste(event) {
    event.preventDefault();
    insertText(event.currentTarget, pastedToEnglish(event.clipboardData.getData("text")));
  }

  function handleMessageKeyDown(event) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      event.currentTarget.form.requestSubmit();
      return;
    }
    handleEnglishKeyDown(event);
  }

  function validate() {
    const next = {};
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
    if (!configured || isSubmitting || !validate()) return;

    setStatus("submitting");

    try {
      await sendContactMessage({
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
      <p className={`${FONT_UI} rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200`}>
        {FORM_FEEDBACK.notConfigured}
      </p>
    );
  }

  return (
    <div
      data-dot-shock="off"
      className="composer-ready overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgb(0_0_0/4%),0_12px_32px_-12px_rgb(0_0_0/12%)] focus-within:border-zinc-900 focus-within:shadow-[0_0_0_4px_var(--color-zinc-900)]"
    >
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-2.5">
        <span className={`${FONT_UI} text-sm font-semibold text-zinc-900`}>
          {FORM.title}
        </span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            {...swap}
            className="flex min-h-[18rem] flex-col items-center justify-center gap-3 px-6 py-10 text-center"
            role="status"
          >
            <CheckCircle className="h-11 w-11 text-emerald-500" weight="fill" aria-hidden />
            <p className="font-['Source_Serif_4',Georgia,serif] text-xl font-bold tracking-[-0.01em] text-zinc-900">
              {FORM_FEEDBACK.successTitle}
            </p>
            <p className={`${FONT_UI} max-w-xs text-sm text-zinc-500`}>
              {FORM_FEEDBACK.success}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className={`${FONT_UI} pill-hover-ring mt-2 cursor-pointer rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2`}
            >
              {FORM_FEEDBACK.sendAnother}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" {...swap} onSubmit={handleSubmit} noValidate>
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
              <span className={rowLabelClass}>{FORM.to.label}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 py-0.5 pl-0.5 pr-2.5">
                <img
                  src={SITE.logo}
                  alt=""
                  className="h-5 w-5 object-contain dark:invert"
                />
                <span className={`${FONT_UI} text-sm font-medium text-zinc-900`}>
                  {FORM.to.value}
                </span>
              </span>
            </div>

            <div className="border-b border-zinc-100 px-4 py-3">
              <div className="flex items-center gap-3">
                <label htmlFor="contact-email" className={rowLabelClass}>
                  {FORM.email.label}
                </label>
                <div className="relative min-w-0 flex-1">
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    // Text, not "email": email inputs hide the caret position,
                    // which ThickCaret needs. Validation happens in validate().
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={values.email}
                    onChange={handleChange}
                    onKeyDown={handleEnglishKeyDown}
                    onPaste={handleEnglishPaste}
                    lang="en"
                    dir="ltr"
                    placeholder={FORM.email.placeholder}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`${FONT_UI} w-full bg-transparent text-base text-zinc-900 placeholder:text-sm placeholder:text-zinc-400 focus:outline-none`}
                    disabled={isSubmitting}
                  />
                  <ThickCaret fieldRef={emailRef} />
                </div>
              </div>
              {errors.email && (
                <p id="contact-email-error" className={`${fieldErrorClass} mt-1 pl-15`}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="px-4 pt-3">
              <label htmlFor="contact-message" className="sr-only">
                {FORM.message.label}
              </label>
              <div className="relative">
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={handleChange}
                  onKeyDown={handleMessageKeyDown}
                  onPaste={handleEnglishPaste}
                  lang="en"
                  dir="ltr"
                  placeholder={FORM.message.placeholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${FONT_UI} block min-h-[9rem] w-full resize-none bg-transparent text-base leading-relaxed text-zinc-900 placeholder:text-sm placeholder:text-zinc-400 focus:outline-none`}
                  disabled={isSubmitting}
                />
                <ThickCaret fieldRef={messageRef} />
              </div>
              {errors.message && (
                <p id="contact-message-error" className={fieldErrorClass}>
                  {errors.message}
                </p>
              )}
            </div>

            {status === "error" && (
              <p
                className={`${FONT_UI} mx-4 mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300`}
                role="alert"
              >
                {FORM_FEEDBACK.error}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-3">
              <span className={`${FONT_UI} hidden items-center gap-1.5 text-xs text-zinc-400 sm:inline-flex`}>
                <kbd className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-[inherit] text-[11px] font-semibold text-zinc-500">
                  ⌘ ↵
                </kbd>
                {FORM.shortcut}
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={playSendIcon}
                onFocus={playSendIcon}
                onClick={playSendIcon}
                className={`${FONT_UI} button-ready-bounce cta-pulse inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
              >
                {isSubmitting ? FORM.submitting : FORM.submit}
                <LottieIcon
                  animationData={sendAnimation}
                  lottieRef={sendLottieRef}
                  className="h-[1.125rem] w-[1.125rem]"
                />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
