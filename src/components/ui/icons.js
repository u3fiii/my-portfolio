/**
 * Phosphor icons — regular outline in nav; fill when active.
 * @see https://phosphoricons.com
 */
import {
  ArrowLeft,
  Article,
  BookOpen,
  DownloadSimple,
  DribbbleLogo,
  Folder,
  GithubLogo,
  GridFour,
  InstagramLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  SquaresFour,
  User,
} from "@phosphor-icons/react";

/** Default weight for buttons and accents outside the nav */
export const ICON_WEIGHT = "bold";

export const NAV_ICON_WEIGHT = {
  default: "regular",
  active: "fill",
};

export const NAV_ICONS = {
  me: User,
  projects: GridFour,
  contact: PaperPlaneTilt,
};

export const FILTER_ICONS = {
  all: SquaresFour,
  project: Folder,
  article: Article,
  "case-study": BookOpen,
};

export const SOCIAL_ICONS = {
  instagram: InstagramLogo,
  dribbble: DribbbleLogo,
  github: GithubLogo,
  linkedin: LinkedinLogo,
};

export { ArrowLeft, DownloadSimple };
