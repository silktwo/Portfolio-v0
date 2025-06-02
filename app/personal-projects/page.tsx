"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import InfoSection from "@/components/info-section"
import BackToTop from "@/components/back-to-top"

// Project Card Component
function ProjectCard({ project, className = "" }: { project: any; className?: string }) {
  const router = useRouter()

  return (
    <div
      className={`flex flex-col gap-2 ${className} cursor-pointer group`}
      onClick={() => router.push(`/work/${project.slug}`)}
    >
      <p className="font-medium text-black text-[12px] leading-[8px] uppercase">{project.title}</p>
      <div className="relative bg-gray-100 overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] rounded-lg">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover rounded-lg"
          style={{ height: project.height || "300px" }}
        />
        {project.comingSoon && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-black text-[#e2e2e2] rounded-[10px] px-4 py-1 font-medium text-[10px]">
              COMING SOON
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}

// Three Column Works Section Component
function ThreeColumnWorksSection({ activeFilters }: { activeFilters: string[] }) {
  const projects = [
    {
      title: "EXPERIMENTAL TYPOGRAPHY SERIES",
      image: "/placeholder.svg?height=150&width=200",
      height: "300px",
      categories: ["TYPOGRAPHY", "EXPERIMENTAL"],
      slug: "experimental-typography-series",
    },
    {
      title: "GENERATIVE ART COLLECTION",
      image: "/placeholder.svg?height=125&width=200",
      height: "300px",
      categories: ["GENERATIVE", "ART"],
      slug: "generative-art-collection",
    },
    {
      title: "URBAN PHOTOGRAPHY PROJECT",
      image: "/placeholder.svg?height=175&width=200",
      height: "300px",
      categories: ["PHOTOGRAPHY"],
      slug: "urban-photography-project",
    },
    {
      title: "INTERACTIVE INSTALLATIONS",
      image: "/placeholder.svg?height=140&width=200",
      height: "300px",
      categories: ["INTERACTIVE", "INSTALLATION"],
      slug: "interactive-installations",
    },
    {
      title: "MOTION GRAPHICS EXPERIMENTS",
      image: "/placeholder.svg?height=160&width=200",
      height: "300px",
      categories: ["MOTION", "EXPERIMENTAL"],
      slug: "motion-graphics-experiments",
    },
    {
      title: "DIGITAL COLLAGE SERIES",
      image: "/placeholder.svg?height=150&width=200",
      height: "300px",
      categories: ["COLLAGE", "DIGITAL"],
      slug: "digital-collage-series",
    },
    {
      title: "SOUND VISUALIZATION PROJECT",
      image: "/placeholder.svg?height=140&width=200",
      height: "300px",
      categories: ["VISUALIZATION", "SOUND"],
      slug: "sound-visualization-project",
    },
    {
      title: "ABSTRACT COMPOSITIONS",
      image: "/placeholder.svg?height=175&width=200",
      height: "300px",
      categories: ["ABSTRACT", "COMPOSITION"],
      slug: "abstract-compositions",
    },
    {
      title: "CULTURAL IDENTITY EXPLORATION",
      image: "/placeholder.svg?height=150&width=200",
      height: "300px",
      categories: ["CULTURAL", "IDENTITY"],
      slug: "cultural-identity-exploration",
    },
  ]

  // Filter projects based on active filters
  const filteredProjects =
    activeFilters.length === 0
      ? projects
      : projects.filter((project) => project.categories.some((category) => activeFilters.includes(category)))

  const displayedProjects = filteredProjects.slice(0, 12)

  return (
    <section className="w-full mt-8 mb-16">
      {/* Mobile: Single column */}
      <div className="grid grid-cols-1 gap-[8px] md:hidden w-full">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* Tablet: Two columns */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-[10px] gap-y-[8px]">
        <div className="flex flex-col gap-[8px]">
          {displayedProjects
            .filter((_, index) => index % 2 === 0)
            .map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
        <div className="flex flex-col gap-[8px]">
          {displayedProjects
            .filter((_, index) => index % 2 === 1)
            .map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </div>

      {/* Desktop: Three columns */}
      <div className="hidden lg:grid grid-cols-3 gap-x-[10px] gap-y-[8px]">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[8px]">
            {displayedProjects
              .filter((_, index) => index % 3 === colIndex)
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        ))}
      </div>
    </section>
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

export default function PersonalProjects() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activePage, setActivePage] = useState<string | null>("Personal Projects")

  const filterCategories = ["TYPOGRAPHY", "EXPERIMENTAL", "PHOTOGRAPHY", "GENERATIVE", "MOTION", "INTERACTIVE"]

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="w-[calc(100%-40px)] sm:w-[calc(100%-60px)] mx-[20px] sm:mx-[30px] py-[30px] min-h-screen">
        {/* Top Navigation */}
        <div className="mb-4">
          <Navigation activePage={activePage} setActivePage={setActivePage} />
        </div>

        {/* Info Section */}
        <InfoSection />

        {/* Filter Categories */}
        <div className="flex items-center gap-2 mb-8 flex-wrap w-full">
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

        {/* Three Column Works Section */}
        <ThreeColumnWorksSection activeFilters={activeFilters} />

        {/* Footer Section */}
        <FooterSection />

        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </div>
  )
}
