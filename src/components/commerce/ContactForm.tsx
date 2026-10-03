"use client";

import { useState } from "react";
import { TextAreaField, TextField, SelectField } from "@/components/ui/Field";
import { Button, cx } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

type Errors = Partial<Record<keyof ContactValues, string>>;

type ContactValues = {
  name: string;
  email: string;
  topic: string;
  orderNumber: string;
  message: string;
};

const TOPICS = [
  { value: "styling", label: "Styling advice" },
  { value: "order", label: "An existing order" },
  { value: "returns", label: "Returns or exchange" },
  { value: "fitting", label: "Booking a fitting" },
  { value: "alterations", label: "Alterations" },
  { value: "wholesale", label: "Wholesale & stockists" },
  { value: "press", label: "Press or collaboration" },
  { value: "other", label: "Something else" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form. Validates on the client, then hands off to the mail client with
 * a prefilled message, so no backend or third-party service is required.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    topic: "",
    orderNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function update(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "We need a valid email to reply to.";
    if (!values.topic) next.topic = "Choose the closest topic so we route it correctly.";
    if (values.message.trim().length < 12) {
      next.message = "A sentence or two helps us answer properly — at least 12 characters.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstField = Object.keys(next)[0];
      document.getElementById(`field-${firstField}`)?.focus();
      return;
    }

    const reference = `ELR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const subject = `[${reference}] ${TOPICS.find((topic) => topic.value === values.topic)?.label ?? "Enquiry"} — ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Topic: ${TOPICS.find((topic) => topic.value === values.topic)?.label ?? values.topic}`,
      values.orderNumber ? `Order number: ${values.orderNumber}` : null,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:atelier@elare.pk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-champagne-500/60 bg-ivory-50 px-6 py-12 text-center sm:px-10">
        <span className="mx-auto grid h-12 w-12 place-content-center rounded-full bg-plum-900 text-champagne-300">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl">Your email client is open</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-espresso-500">
          We have written your message out for you — press send and we will reply within one
          working day. If nothing opened, write to{" "}
          <a href="mailto:atelier@elare.pk" className="link-underline text-plum-800">
            atelier@elare.pk
          </a>{" "}
          directly.
        </p>
        <Button variant="outline" size="md" onClick={() => setStatus("idle")} className="mt-8">
          Write another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <div className="grid gap-x-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          placeholder="Ayesha Rehman"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
        />
      </div>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <SelectField
          label="What is it about?"
          name="topic"
          required
          placeholder="Choose a topic"
          options={TOPICS}
          value={values.topic}
          onChange={(event) => update("topic", event.target.value)}
          error={errors.topic}
        />
        <TextField
          label="Order number"
          name="orderNumber"
          placeholder="ELR-4821"
          hint="If your message is about a delivery"
          value={values.orderNumber}
          onChange={(event) => update("orderNumber", event.target.value)}
        />
      </div>

      <TextAreaField
        label="Message"
        name="message"
        required
        rows={6}
        placeholder="Tell us your height, usual size, and where you were hoping to wear it."
        hint="The more detail you give, the more useful our reply will be."
        value={values.message}
        onChange={(event) => update("message", event.target.value)}
        error={errors.message}
      />

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-espresso-400">
          We reply within one working day, Tuesday to Saturday. Nothing you send here is shared.
        </p>
        <Button type="submit" variant="solid" size="lg" className="shrink-0">
          Send message
        </Button>
      </div>

      <p
        aria-live="polite"
        className={cx(
          "pt-3 text-xs transition-opacity duration-300",
          Object.keys(errors).length > 0 ? "text-rose-600" : "opacity-0",
        )}
      >
        {Object.keys(errors).length > 0
          ? `${Object.keys(errors).length} field${Object.keys(errors).length === 1 ? " needs" : "s need"} attention before we can send this.`
          : "Ready to send."}
      </p>
    </form>
  );
}