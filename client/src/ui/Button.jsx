import React from "react";
import { Link as RouterLink } from "react-router";
import clsx from "clsx";

/**
 * DaisyUI-based button primitive.
 *
 * Maps props directly to DaisyUI `btn` classes, e.g.
 * `variant="primary"` → `btn btn-primary`, `size="lg"` → `btn-lg`,
 * and `outline` → `btn-outline`.
 *
 * Renders as:
 * - React Router v7 `Link` when `to` is provided
 * - `<a>` when `href` is provided
 * - `<button>` otherwise
 *
 * @param {object} props
 * @param {"primary" | "secondary" | "accent" | "ghost" | "link" | "error"} [props.variant="primary"]
 *  Visual style of the button, mapped to `btn-{variant}`.
 * @param {"xs" | "sm" | "md" | "lg"} [props.size="md"]
 *  Size of the button, mapped to `btn-xs`, `btn-sm`, default, or `btn-lg`.
 * @param {boolean} [props.outline]
 *  When true, adds the `btn-outline` class on top of the variant.
 * @param {boolean} [props.wide]
 *  When true, adds the `btn-wide` class for a wider button.
 * @param {boolean} [props.loading]
 *  When true, shows a loading spinner and disables the button.
 * @param {boolean} [props.disabled]
 *  When true, disables interaction and dims the button.
 * @param {string} [props.className]
 *  Extra classes merged into the final className.
 * @param {React.ReactNode} props.children
 *  Button label and/or icon content.
 * @param {string} [props.to]
 *  When provided, renders a React Router `Link` with this `to` value.
 * @param {string} [props.href]
 *  When provided (and `to` is not), renders an `<a>` element with this `href`.
 * @param {"button" | "submit" | "reset"} [props.type="button"]
 *  Native button type when rendering a `<button>`.
 * @returns {JSX.Element}
 *
 * @example
 * <Button variant="primary" size="lg" to="/signup">
 *   Sign Up
 * </Button>
 */
export default function Button({
  variant = "primary",
  size = "md",
  outline = false,
  wide = false,
  loading = false,
  disabled = false,
  className,
  children,
  to,
  href,
  type = "button",
  ...rest
}) {
  const isDisabled = disabled || loading;

  const variantClass = (() => {
    switch (variant) {
      case "secondary":
        return "btn-secondary";
      case "accent":
        return "btn-accent";
      case "ghost":
        return "btn-ghost";
      case "link":
        return "btn-link";
      case "error":
        return "btn-error";
      case "primary":
      default:
        return "btn-primary";
    }
  })();

  const sizeClass = (() => {
    switch (size) {
      case "xs":
        return "btn-xs";
      case "sm":
        return "btn-sm";
      case "lg":
        return "btn-lg";
      case "md":
      default:
        return undefined;
    }
  })();

  const classes = clsx(
    "btn",
    variantClass,
    sizeClass,
    {
      "btn-outline": outline,
      "btn-wide": wide,
      "btn-disabled": isDisabled,
    },
    className
  );

  const content = (
    <>
      {loading && (
        <span className="loading loading-spinner" aria-hidden="true" />
      )}
      {children}
    </>
  );

  if (to) {
    // Render as a React Router link with button styling.
    return (
      <RouterLink
        to={to}
        className={classes}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {content}
      </RouterLink>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}

