
import * as Icons from "lucide-react";

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  fallback?: string;
}

const Icon = ({
  name,
  color,
  size = 24,
  strokeWidth = 2,
  className = "",
  fallback = "CircleAlert",
  ...props
}: IconProps) => {
  // @ts-ignore - dynamic import
  const LucideIcon = Icons[name] || Icons[fallback];

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
};

export default Icon;
