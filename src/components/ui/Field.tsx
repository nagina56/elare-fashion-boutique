"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cx } from "./Button";
import { AlertIcon } from "./icons";

const controlBase =
  "w-full rounded-none border bg-ivory-50 px-4 text-[0.9375rem] text-espresso-800 " +
  "transition-colors duration-300 placeholder:text-espresso-300 " +
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-plum-600";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cx("flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow mb-2 text-plum-800">
        {label}
        {required ? (
          <span className="ml-1 text-rose-500" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 normal-case tracking-normal text-espresso-300">optional</span>
        )}
      </label>

      {children}

      <div aria-live="polite" className="min-h-[1.15rem] pt-1.5">
        {error ? (
          <p id={`${id}-error`} className="flex items-start gap-1.5 text-xs text-rose-600">
            <AlertIcon className="mt-px h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="text-xs text-espresso-400">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  containerClassName?: string;
};

export function TextField({
  label,
  error,
  hint,
  className,
  containerClassName,
  required,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const id = rest.name ? `field-${rest.name}` : autoId;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={containerClassName}
    >
      <input
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(
          controlBase,
          "h-12",
          error ? "border-rose-500 bg-rose-50/50" : "border-ivory-400 hover:border-plum-300",
          className,
        )}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  containerClassName?: string;
};

export function TextAreaField({
  label,
  error,
  hint,
  className,
  containerClassName,
  required,
  rows = 5,
  ...rest
}: TextAreaFieldProps) {
  const autoId = useId();
  const id = rest.name ? `field-${rest.name}` : autoId;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={containerClassName}
    >
      <textarea
        {...rest}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(
          controlBase,
          "resize-y py-3 leading-relaxed",
          error ? "border-rose-500 bg-rose-50/50" : "border-ivory-400 hover:border-plum-300",
          className,
        )}
      />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> & {
  label: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
};

export function SelectField({
  label,
  error,
  hint,
  options,
  className,
  containerClassName,
  required,
  placeholder,
  ...rest
}: SelectFieldProps) {
  const autoId = useId();
  const id = rest.name ? `field-${rest.name}` : autoId;

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={containerClassName}
    >
      <select
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(
          controlBase,
          "select-elare h-12 cursor-pointer appearance-none",
          error ? "border-rose-500 bg-rose-50/50" : "border-ivory-400 hover:border-plum-300",
          className,
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
