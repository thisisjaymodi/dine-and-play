import React, { useId } from "react";
import clsx from "clsx";

/**
 * Premium DaisyUI-based text input with consistent styling.
 * 
 * Includes focus ring effects, internal background color, and
 * standardized label typography to match Auth and Registration flows.
 */
export default function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  label,
  labelRight,
  required = false,
  disabled = false,
  size,
  startIcon,
  className,
  children,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;

  const inputClasses = clsx(
    "input input-bordered w-full h-14 rounded-2xl bg-base-200/40 border-base-300 transition-all",
    "focus:ring-4 focus:ring-primary/10 focus:border-primary font-medium text-base-content",
    size && `input-${size}`,
    {
      "input-error": Boolean(error),
      "pl-12": Boolean(startIcon),
    },
    className
  );

  return (
    <div className="form-control w-full">
      {(label || labelRight) && (
        <div className="flex justify-between items-end mb-2 px-1">
          {label && (
            <label htmlFor={inputId} className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 text-base-content">
              {label}
              {required && (
                <span className="text-error ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          {labelRight && (
            <div className="text-[10px] font-bold">
              {labelRight}
            </div>
          )}
        </div>
      )}

      <div className="relative w-full group">
        {startIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors text-base z-10">
            {startIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses}
          {...rest}
        />

        {children}
      </div>

      {error && (
        <label className="label">
          <span id={errorId} className="label-text-alt text-error font-bold">
            {error}
          </span>
        </label>
      )}
    </div>
  );
}
