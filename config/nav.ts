import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
];

export const additionalLinks: AdditionalLinks[] = [];
