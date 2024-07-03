"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {ImageIcon} from "lucide-react";
import { usePathname } from "next/navigation";

type SidebarProps = {};
const monteserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: "text-pink-700",
      href: '/image',
    },

  ];

const Sidebar: React.FC<SidebarProps> = () => {
    const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white ">
      <div className="px-3 py-2 flex-1">
        <Link href="/image" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", monteserrat.className)}>
            Genius
          </h1>
        </Link>
      </div>
      <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
};
export default Sidebar;
