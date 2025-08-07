import { memo } from "react";
import { Icon as IconifyIcon, type IconProps as IconifyIconProps } from "@iconify/react";
import * as LucideIcons from "lucide-react";

interface IconProps extends Omit<IconifyIconProps, 'icon'> {
  icon: string;
  size?: number | string;
  className?: string;
}

function Icon({ icon, size = 16, className, ...props }: IconProps) {
  // 检查是否是 Lucide 图标
  if (icon.startsWith('lucide:')) {
    const iconName = icon.replace('lucide:', '');
    // 转换为 PascalCase
    const pascalIconName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const LucideIcon = (LucideIcons as any)[pascalIconName];
    
    if (LucideIcon) {
      return (
        <LucideIcon
          size={size}
          className={className}
          {...props}
        />
      );
    }
  }
  
  // 回退到 Iconify
  return (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

export default memo(Icon);
