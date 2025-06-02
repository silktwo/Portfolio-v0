"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import InfoSection from "@/components/info-section"
import BackToTop from "@/components/back-to-top"

// Project Card Component
function ProjectCard({ project }: { project: any }) {
  const router = useRouter()

  return (
    <Card
      className="border-0 shadow-none cursor-pointer hover:opacity-80 transition-all duration-200 group"
      onClick={() => router.push(`/work/${project.slug}`)}
    >
      <CardContent className="p-0 space-y-1.5">
        <h3 className="font-medium text-[12px] text-black tracking-normal leading-normal">{project.title}</h3>
        <div className="w-full h-[200px] sm:h-[255px] overflow-hidden bg-gray-100 transition-transform duration-200 group-hover:scale-[1.02] rounded-lg">
          <img
            src={project.image || "/placeholder.svg?height=255&width=400"}
            alt={project.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Footer Section Component
function FooterSection() {
  const socialLinks = [
    { name: "instagram", url: "https://www.instagram.com/tiredxs/" },
    { name: "telegram", url: "http://t.me/tiredxs" },
    { name: "mail", url: "mailto:kifuliak66@gmail.com" },
    { name: "read.cv", url: "https://read.cv/tiredxs" },
    { name: "are.na", url: "https://www.are.na/dima-kifuliak" },
  ]

  return (
    <footer className="w-full py-4 mt-8">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src="/logo-footer.svg" alt="Dmytro Kifuliak Logo" className="w-[59px] h-[30px]" />
            <span className="text-[12px] font-medium text-black">Dmytro Kifuliak. © 2025</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-black">SOCIAL:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-black hover:underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Commercial() {
  const [activePage, setActivePage] = useState<string | null>("Commercial")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filterCategories = ["SITE DESIGN", "CAMPAIGN", "IDENTITY", "APP DESIGN"]

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  // Portfolio project data
  const portfolioItems = [
    {
      id: 1,
      title: "BOMB SHELTER MAP OF VENICE, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "bomb-shelter-map-venice",
      categories: ["SITE DESIGN"],
    },
    {
      id: 2,
      title: "GENOCIDE SPEECH MONITOR, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "genocide-speech-monitor",
      categories: ["SITE DESIGN"],
    },
    {
      id: 3,
      title: "NOT FOR SALE, UKRAINE AT EXPO 2025 IN OSAKA, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "ukraine-expo-2025-osaka",
      categories: ["SITE DESIGN"],
    },
    {
      id: 4,
      title: "BLOOD FOR BLOOD, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "blood-for-blood-site",
      categories: ["SITE DESIGN"],
    },
    {
      id: 5,
      title: "BLOOD FOR BLOOD, CAMPAIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "blood-for-blood-campaign",
      categories: ["CAMPAIGN"],
    },
    {
      id: 6,
      title: "SENSE BANK, SVITLO KAZOK, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "sense-bank-svitlo-kazok",
      categories: ["SITE DESIGN"],
    },
    {
      id: 7,
      title: "GO KARPATY, KEFIR SPOON PRO MAX, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "go-karpaty-kefir-spoon",
      categories: ["SITE DESIGN"],
    },
    {
      id: 8,
      title: "BICKERSTAFF AGENCY, SITE DESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "bickerstaff-agency-site",
      categories: ["SITE DESIGN"],
    },
    {
      id: 9,
      title: "BRAND UKRAINE, IDENTITY SYSTEM",
      image: "/placeholder.svg?height=255&width=400",
      slug: "brand-ukraine-identity",
      categories: ["IDENTITY"],
    },
    {
      id: 10,
      title: "UKLON, APP REDESIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "uklon-app-redesign",
      categories: ["APP DESIGN"],
    },
    {
      id: 11,
      title: "MINISTRY OF DIGITAL TRANSFORMATION, CAMPAIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "ministry-digital-campaign",
      categories: ["CAMPAIGN"],
    },
    {
      id: 12,
      title: "UKRAINIAN INSTITUTE, CAMPAIGN",
      image: "/placeholder.svg?height=255&width=400",
      slug: "ukrainian-institute-campaign",
      categories: ["CAMPAIGN"],
    },
  ]

  // Filter projects based on active filters
  const filteredProjects =
    activeFilters.length === 0
      ? portfolioItems
      : portfolioItems.filter((project) => project.categories.some((category) => activeFilters.includes(category)))

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="w-[calc(100%-40px)] sm:w-[calc(100%-60px)] mx-[20px] sm:mx-[30px] py-[30px]">
        {/* Top Navigation */}
        <div className="mb-4">
          <Navigation activePage={activePage} setActivePage={setActivePage} />
        </div>

        {/* Info Section */}
        <InfoSection />

        {/* Filter Categories */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {activeFilters.length > 0 && (
            <Badge
              onClick={clearFilters}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full transition-colors cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "rgba(149, 149, 149, 0.40)",
                color: "rgba(148, 148, 148, 1)",
              }}
            >
              <span className="text-[11px] font-bold">CLEAR ALL</span>
              <div className="w-3 h-3 bg-[#949494] rounded-full flex items-center justify-center flex-shrink-0">
                <X className="w-2 h-2 text-white" />
              </div>
            </Badge>
          )}
          {filterCategories.map((filter, index) => {
            const isActive = activeFilters.includes(filter)
            return (
              <Badge
                key={index}
                onClick={() => toggleFilter(filter)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: isActive ? "rgba(149, 149, 149, 0.40)" : "rgba(149, 149, 149, 0.2)",
                  color: "rgba(148, 148, 148, 1)",
                }}
              >
                <span className="text-[11px] font-bold">{filter}</span>
                {isActive && (
                  <div className="w-3 h-3 bg-[#949494] rounded-full flex items-center justify-center flex-shrink-0 animate-in fade-in-0 zoom-in-95 duration-200">
                    <X className="w-2 h-2 text-white" />
                  </div>
                )}
              </Badge>
            )
          })}
        </div>

        {/* Main Content Section */}
        <section className="w-full mt-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[10px] gap-y-[8px]">
            {filteredProjects.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <FooterSection />

        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </div>
  )
}
