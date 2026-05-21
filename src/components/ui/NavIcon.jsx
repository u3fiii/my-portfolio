import { LayoutGrid, Mail, User } from "lucide-react";

const icons = {
  me: User,
  projects: LayoutGrid,
  contact: Mail,
};

export default function NavIcon({ name, className = "h-4 w-4" }) {
  const Icon = icons[name];
  if (!Icon) return null;

  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
