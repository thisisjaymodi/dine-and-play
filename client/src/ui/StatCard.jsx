import React from "react";
import clsx from "clsx";

/**
 * Simple statistic display for prominent metrics.
 *
 * Uses a large, bold value with a smaller, muted uppercase label beneath.
 * Can be used standalone or inside a DaisyUI `stats` container.
 *
 * @param {object} props
 * @param {string} props.value
 *  Primary stat value, shown large and bold.
 * @param {string} props.label
 *  Descriptive label shown in a smaller, muted style.
 * @param {string} [props.className]
 *  Additional classes merged into the root stat container.
 * @returns {JSX.Element}
 *
 * @example
 * <StatCard value="120+" label="Partner Venues" />
 */
export default function StatCard({ value, label, className }) {
  return (
    <div className={clsx("text-center", className)}>
      <p className="text-2xl font-black text-base-content">{value}</p>
      <p className="text-xs text-base-content/50 uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

