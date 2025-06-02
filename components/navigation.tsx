"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationProps {
  activePage?: string | null
  setActivePage?: (page: string | null) => void
}

export default function Navigation({ activePage, setActivePage }: NavigationProps) {
  const pathname = usePathname()

  const navCategories = [
    { name: "Dmytro Kifuliak", hasLogo: true, primary: true, path: "/" },
    { name: "Personal Projects", path: "/personal-projects" },
    { name: "Commercial", path: "/commercial" },
    { name: "Journal", path: "/journal" },
    { name: "Fonts", hasIndicator: true, path: "/fonts" },
  ]

  const isActivePage = (category: any) => {
    if (category.path === "/" && pathname === "/") return true
    if (category.path !== "/" && pathname.startsWith(category.path)) return true
    return activePage === category.name
  }

  return (
    <nav className="flex items-center gap-2 mb-4 flex-wrap">
      {navCategories.map((category, index) => {
        const isFirstButton = index === 0
        const isActive = isActivePage(category)
        const hasFontIndicator = category.hasIndicator

        return (
          <Link href={category.path} key={index}>
            <Badge
              className={`inline-flex items-center gap-1 py-1 px-4 rounded-full transition-all duration-300 ease-in-out bg-black hover:bg-gray-800 cursor-pointer relative overflow-hidden`}
            >
              {category.hasLogo && (
                <img src="/logo-header.svg" alt="Dmytro Kifuliak Logo" className="w-5 h-3 flex-shrink-0" />
              )}
              <span
                className={`text-[11px] font-${category.primary ? "bold" : "medium"} whitespace-nowrap text-[#E3E3E3]`}
              >
                {category.name}
              </span>
              {hasFontIndicator && <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />}
              {isActive && !isFirstButton && !hasFontIndicator && (
                <div className="w-3 h-3 bg-[#E3E3E3] rounded-full flex items-center justify-center flex-shrink-0 animate-in fade-in-0 zoom-in-95 duration-200">
                  <X className="w-2 h-2 text-black" />
                </div>
              )}
            </Badge>
          </Link>
        )
      })}
    </nav>
  )
}
