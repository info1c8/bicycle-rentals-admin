
import { ReactNode } from "react";

interface AdminHeaderProps {
  title: string;
  rightContent?: ReactNode;
}

/**
 * Компонент заголовка административной панели
 */
const AdminHeader = ({ title, rightContent }: AdminHeaderProps) => {
  return (
    <div className="flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
};

export default AdminHeader;
