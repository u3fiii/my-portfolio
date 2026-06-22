import { NAV_ICON_WEIGHT, NAV_ICONS } from "./icons.js";

export default function NavIcon({ name, active = false, className = "h-4 w-4" }) {
  const Icon = NAV_ICONS[name];
  if (!Icon) return null;

  return (
    <Icon
      className={className}
      weight={active ? NAV_ICON_WEIGHT.active : NAV_ICON_WEIGHT.default}
      aria-hidden
    />
  );
}
