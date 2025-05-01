
import React from "react";
import * as LucideIcons from "lucide-react";

type IconProps = {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  fallback?: string;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 24,
  strokeWidth = 2,
  className = "",
  fallback = "CircleAlert",
  onClick,
}) => {
  // @ts-ignore - dynamic access
  const LucideIcon = LucideIcons[name] || LucideIcons[fallback];

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      onClick={onClick}
    />
  );
};

export default Icon;
