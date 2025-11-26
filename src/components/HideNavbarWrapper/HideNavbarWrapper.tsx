"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
 

export default function HideNavbarWrapper() {
  const pathname = usePathname();

  // hide navbar on: /dashboard, /dashboard/settings, /dashboard/anything
  const hideNavbar = pathname.startsWith("/dashboard") || pathname.startsWith("/auth/login") ||  pathname.startsWith("/auth/register");

  if (hideNavbar) return null;

  return <Navbar />;
}
