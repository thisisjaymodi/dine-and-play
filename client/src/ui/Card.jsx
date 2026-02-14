import React from "react";
import clsx from "clsx";

/**
 * DaisyUI-based card primitive.
 *
 * Uses `card bg-base-100` as the base and supports DaisyUI's
 * `card-bordered`, `card-compact`, and `card-side` variants.
 *
 * @param {object} props
 * @param {"default" | "bordered" | "compact" | "side"} [props.variant="default"]
 *  Visual style of the card. `"bordered"` → `card-bordered`,
 *  `"compact"` → `card-compact`, `"side"` → `card-side`.
 * @param {string} [props.className]
 *  Additional classes merged into the outer card container.
 * @param {string} [props.bodyClassName]
 *  Additional classes merged into the inner `card-body` element.
 * @param {React.ReactNode} props.children
 *  Content to render inside the card body.
 * @returns {JSX.Element}
 *
 * @example
 * <Card variant="bordered">
 *   <h3 className="card-title">Title</h3>
 *   <p>Content</p>
 * </Card>
 */
export default function Card({
  variant = "default",
  className,
  bodyClassName,
  children,
  ...rest
}) {
  const variantClasses = clsx({
    "card-bordered": variant === "bordered",
    "card-compact": variant === "compact",
    "card-side": variant === "side",
  });

  const cardClasses = clsx("card bg-base-100", variantClasses, className);
  const bodyClasses = clsx("card-body", bodyClassName);

  return (
    <div className={cardClasses} {...rest}>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
}

