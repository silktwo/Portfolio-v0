"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { getNextProject, getPreviousProject, getProjectBySlug } from "@/lib/project-navigation"

// Mock function to get project data
function getProjectData(slug: string) {
  const projects = {
    "maitreya-logo-design": {
      title: "MAITREYA",
      description:
        "I was involved in creating the visual identity for this wellness brand, which focuses on holistic health products. The project included logo design, brand guidelines, and packaging design for their premium product line. The identity system uses natural forms combined with geometric precision to communicate the brand's focus on natural ingredients and holistic wellness while maintaining a contemporary aesthetic.",
      team: [
        { role: "Designer", name: "Dmytro Kifuliak", isPrimary: true },
        { role: "Creative director", name: "Illia Anufriienko" },
        { role: "Senior copywriter", name: "Sergey Artemenko" },
        { role: "Account director", name: "Yana Brusentseva" },
        { role: "Project manager", name: "Anna Tsiurko" },
      ],
      coverImage: "/placeholder.svg?height=800&width=1440",
      galleryImages: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=800&width=600",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=800&width=600",
      ],
    },
    "derzhstat-identity": {
      title: "DERZHSTAT",
      description:
        "I was involved in creating a modern visual identity for the State Statistics Service of Ukraine (Derzhstat) that transforms the perception of statistical data and government services. The design language uses dynamic patterns generated from actual statistical data, creating a visual system that is both informative and visually compelling while maintaining authority and trustworthiness.",
      team: [
        { role: "Designer", name: "Dmytro Kifuliak", isPrimary: true },
        { role: "Creative director", name: "Illia Anufriienko" },
        { role: "Senior strategist", name: "Sergey Lizunov" },
        { role: "Strategist", name: "Masha Kochurenko" },
        { role: "Project manager", name: "Anna Tsiurko" },
      ],
      coverImage: "/placeholder.svg?height=800&width=1440",
      galleryImages: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=800&width=600",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  }

  return (
    projects[slug] || {
      title: "PROJECT",
      description: "Project description goes here.",
      team: [{ role: "Designer", name: "Dmytro Kifuliak", isPrimary: true }],
      coverImage: "/placeholder.svg?height=800&width=1440",
      galleryImages: ["/placeholder.svg?height=600&width=800"],
    }
  )
}

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const project = getProjectData(params.slug)
  const [activeSection, setActiveSection] = useState("project")

  // Get navigation projects
  const nextProject = getNextProject(params.slug)
  const previousProject = getPreviousProject(params.slug)
  const currentProject = getProjectBySlug(params.slug)

  // Social links
  const socialLinks = [
    { name: "instagram", url: "https://www.instagram.com/tiredxs/" },
    { name: "telegram", url: "http://t.me/tiredxs" },
    { name: "mail", url: "mailto:kifuliak66@gmail.com" },
    { name: "read.cv", url: "https://read.cv/tiredxs" },
    { name: "are.na", url: "https://www.are.na/dima-kifuliak" },
  ]

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["project", "info", "gallery", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Check if we're near the bottom of the page
      const isNearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100

      if (isNearBottom) {
        setActiveSection("contact")
        return
      }

      // Otherwise, find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add useEffect to ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Header with consistent layout - positioned absolutely to overlay cover */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <div className="w-[calc(100%-40px)] sm:w-[calc(100%-60px)] mx-[20px] sm:mx-[30px] py-[30px]">
          <div className="mb-4">
            {/* Mobile Layout: Left-aligned header with navigation on right */}
            <div className="flex md:hidden items-start justify-between">
              <div className="flex flex-col gap-2">
                <Navigation />
              </div>
            </div>

            {/* Desktop Layout: Normal navigation */}
            <div className="hidden md:block">
              <Navigation />
            </div>
          </div>
        </div>
      </div>

      {/* Centered Navigation Block - Fixed */}
      <div className="fixed top-[30px] left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black rounded-xl p-1">
          {/* Mobile: Vertical stack */}
          <div className="flex flex-col md:flex-col gap-1">
            <button
              onClick={() => scrollToSection("project")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                activeSection === "project"
                  ? "bg-[#eaeaea] text-[#202020]"
                  : "bg-transparent text-[#eaeaea] hover:bg-gray-800"
              }`}
            >
              {project.title}
            </button>
            <button
              onClick={() => scrollToSection("info")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                activeSection === "info"
                  ? "bg-[#eaeaea] text-[#202020]"
                  : "bg-transparent text-[#eaeaea] hover:bg-gray-800"
              }`}
            >
              PROJECT INFO
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                activeSection === "gallery"
                  ? "bg-[#eaeaea] text-[#202020]"
                  : "bg-transparent text-[#eaeaea] hover:bg-gray-800"
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                activeSection === "contact"
                  ? "bg-[#eaeaea] text-[#202020]"
                  : "bg-transparent text-[#eaeaea] hover:bg-gray-800"
              }`}
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image - Full Screen */}
      <section id="project" className="w-full h-screen relative">
        <img
          src={project.coverImage || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </section>

      {/* Project Information Section */}
      <section id="info" className="py-16">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[30px]">
          {/* Project Information Header */}
          <div className="text-center mb-8">
            <h2 className="font-bold text-black text-[11px] tracking-[0] leading-[normal] mb-4">PROJECT INFORMATION</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12 max-w-[800px] mx-auto">
            {/* Description - Left Side */}
            <div className="flex-1">
              <h3 className="font-medium text-black text-[11px] mb-4 tracking-[0] leading-[normal]">DESCRIPTION:</h3>
              <p className="font-medium text-black text-[12px] tracking-[0] leading-[normal]">{project.description}</p>
            </div>

            {/* Team Credits - Right Side with Roboto Mono */}
            <div className="w-full lg:w-[300px]">
              <h3 className="font-medium text-black text-[11px] mb-4 tracking-[0] leading-[normal]">TEAM:</h3>
              <div className="space-y-2">
                {project.team.map((member, index) => (
                  <div
                    key={index}
                    className={`font-mono text-[11px] tracking-[0] leading-[normal] ${
                      member.isPrimary ? "text-black" : "text-[#939393]"
                    }`}
                    style={{ fontFamily: "Roboto Mono, monospace" }}
                  >
                    {member.role}: {member.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[30px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.galleryImages.map((image, index) => (
              <div
                key={index}
                className={`bg-gray-100 overflow-hidden rounded-lg ${
                  index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[4/3]" : "aspect-square"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[30px]">
          {/* More Info */}
          <div className="text-center mb-8">
            <h2 className="font-bold text-black text-[11px] tracking-[0] leading-[normal] mb-4">MORE INFO</h2>
            <div className="inline-flex gap-2.5 items-center flex-wrap justify-center">
              {["BEHANCE", "INSTAGRAM", "DRIBBBLE", "LINKEDIN"].map((social, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="inline-flex gap-[5px] pt-[5px] pb-1.5 px-3 bg-[#94949433] backdrop-blur-[5.05px] items-center justify-center rounded-[20px]"
                >
                  <span className="relative w-fit mt-[-1.00px] font-bold text-[#939393] text-[11px] tracking-[0] leading-[normal]">
                    {social}
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Navigation and Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Previous Project */}
            {previousProject ? (
              <Link href={`/work/${previousProject.slug}`}>
                <Button
                  variant="outline"
                  className="gap-[5px] pl-2 pr-2.5 pt-[5px] pb-1.5 bg-black text-[#e2e2e2] rounded-[20px] h-auto hover:bg-gray-800 transition-colors"
                >
                  <span className="font-medium text-[11px]">←</span>
                  <span className="font-medium text-[11px] hidden sm:inline">Previous project</span>
                  <span className="font-medium text-[11px] sm:hidden">Previous</span>
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {/* Logo Only */}
            <div className="text-center">
              <div className="flex justify-center">
                <img src="/logo-case-footer.svg" alt="Logo Case Footer" className="w-[200px] h-[103px]" />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                <span className="font-medium text-[#202020] text-[12px]">SOCIAL:</span>
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#202020] text-[12px] tracking-[0] leading-[normal] hover:underline cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Project */}
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`}>
                <Button
                  variant="outline"
                  className="gap-[5px] pl-2.5 pr-2 pt-[5px] pb-1.5 bg-black text-[#e2e2e2] rounded-[20px] h-auto hover:bg-gray-800 transition-colors"
                >
                  <span className="font-medium text-[11px] hidden sm:inline">Next project</span>
                  <span className="font-medium text-[11px] sm:hidden">Next</span>
                  <span className="font-medium text-[11px]">→</span>
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
