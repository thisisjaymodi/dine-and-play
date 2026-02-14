import React from "react";
import clsx from "clsx";

/**
 * DaisyUI-based badge primitive.
 *
 * Wraps the `badge` class and supports standard DaisyUI
 * color and size variants.
 *
 * @param {object} props
 * @param {"primary" | "secondary" | "accent" | "ghost"} [props.variant="primary"]
 *  Visual style of the badge, mapped to `badge-{variant}`.
 * @param {"xs" | "sm" | "md" | "lg"} [props.size="md"]
 *  Size of the badge, mapped to `badge-{size}`.
 * @param {string} [props.className]
 *  Additional classes merged into the badge element.
 * @param {React.ReactNode} props.children
 *  Badge text or content.
 * @returns {JSX.Element}
 *
 * @example
 * <Badge variant="primary">New</Badge>
 */
export default function Badge({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}) {
  const variantClass = (() => {
    switch (variant) {
      case "secondary":
        return "badge-secondary";
      case "accent":
        return "badge-accent";
      case "ghost":
        return "badge-ghost";
      case "primary":
      default:
        return "badge-primary";
    }
  })();

  const sizeClass = (() => {
    switch (size) {
      case "xs":
        return "badge-xs";
      case "sm":
        return "badge-sm";
      case "lg":
        return "badge-lg";
      case "md":
      default:
        return undefined;
    }
  })();

  const classes = clsx("badge", variantClass, sizeClass, className);

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

