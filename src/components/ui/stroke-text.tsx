import React from "react";

export interface StrokeTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  className?: string;
}

export function StrokeText({
  text,
  strokeColor = "rgba(255, 255, 255, 0.4)",
  strokeWidth = 1.5,
  fillColor = "transparent",
  className = "",
  style,
  ...props
}: StrokeTextProps) {
  return (
    <h2
      className={`font-black uppercase tracking-wider select-none transition-all duration-300 ${className}`}
      style={{
        WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
        WebkitTextFillColor: fillColor,
        color: fillColor,
        ...style,
      }}
      {...props}
    >
      {text}
    </h2>
  );
}

export default StrokeText;
