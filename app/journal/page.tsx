"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/navigation"
import BackToTop from "@/components/back-to-top"

// Enhanced Image Popup Component with Slider
function ImagePopup({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: {
  images: { src: string; alt: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}) {
  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center">←</div>
          </button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center">→</div>
          </button>
        )}

        {/* Image */}
        <img
          src={currentImage.src || "/placeholder.svg"}
          alt={currentImage.alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Journal() {
  const [activePage, setActivePage] = useState<string | null>("Journal")
  const [popupImages, setPopupImages] = useState<{ src: string; alt: string }[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Journal entries data with different image layouts
  const journalEntries = [
    {
      date: "15 12 24",
      title: "THE EVOLUTION OF UKRAINIAN DESIGN",
      description:
        "Exploring how Ukrainian design has evolved over the past decade and its growing influence on the global stage. From traditional motifs to contemporary interpretations.",
      imageLayout: "single",
      images: ["/placeholder.svg?height=287&width=437"],
    },
    {
      date: "03 12 24",
      title: "TYPOGRAPHY IN THE DIGITAL AGE",
      description:
        "Thoughts on how typography has adapted to digital platforms and what it means for designers today. The intersection of tradition and innovation.",
      imageLayout: "double",
      images: ["/placeholder.svg?height=140&width=213", "/placeholder.svg?height=140&width=213"],
    },
    {
      date: "21 11 24",
      title: "DESIGN SYSTEMS: BEYOND THE BASICS",
      description:
        "A deep dive into creating flexible design systems that can evolve with your brand. Lessons learned from working with government institutions.",
      imageLayout: "triple",
      images: [
        "/placeholder.svg?height=140&width=140",
        "/placeholder.svg?height=140&width=140",
        "/placeholder.svg?height=140&width=140",
      ],
    },
    {
      date: "12 11 24",
      title: "THE ROLE OF AI IN MODERN DESIGN",
      description:
        "Examining how artificial intelligence is changing the design landscape and what it means for designers. Opportunities and challenges ahead.",
      imageLayout: "single",
      images: ["/placeholder.svg?height=287&width=437"],
    },
    {
      date: "28 10 24",
      title: "BRANDING FOR SOCIAL IMPACT",
      description:
        "How design can drive social change and create meaningful connections. Case studies from recent projects with Ukrainian institutions.",
      imageLayout: "double",
      images: ["/placeholder.svg?height=140&width=213", "/placeholder.svg?height=140&width=213"],
    },
    {
      date: "15 10 24",
      title: "CREATIVE CODING EXPERIMENTS",
      description:
        "Exploring the intersection of code and design through generative art and interactive experiences. Tools, techniques, and inspiration.",
      imageLayout: "triple",
      images: [
        "/placeholder.svg?height=140&width=140",
        "/placeholder.svg?height=140&width=140",
        "/placeholder.svg?height=140&width=140",
      ],
    },
  ]

  // Social links data
  const socialLinks = [
    { name: "instagram", url: "https://www.instagram.com/tiredxs/" },
    { name: "telegram", url: "http://t.me/tiredxs" },
    { name: "mail", url: "mailto:kifuliak66@gmail.com" },
    { name: "read.cv", url: "https://read.cv/tiredxs" },
    { name: "are.na", url: "https://www.are.na/dima-kifuliak" },
  ]

  const openPopup = (entryImages: string[], entryTitle: string, clickedIndex = 0) => {
    const images = entryImages.map((img, idx) => ({
      src: img,
      alt: `${entryTitle} - Image ${idx + 1}`,
    }))
    setPopupImages(images)
    setCurrentImageIndex(clickedIndex)
  }

  const closePopup = () => {
    setPopupImages([])
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % popupImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + popupImages.length) % popupImages.length)
  }

  const renderImageLayout = (entry) => {
    if (entry.imageLayout === "single") {
      return (
        <Card className="relative self-stretch w-full h-[287px] bg-[#d9d9d9] rounded-xl border-none overflow-hidden">
          <CardContent className="p-0 h-full">
            <img
              src={entry.images[0] || "/placeholder.svg"}
              alt={entry.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPopup(entry.images, entry.title, 0)}
            />
          </CardContent>
        </Card>
      )
    } else if (entry.imageLayout === "double") {
      return (
        <div className="flex items-start gap-[10px] relative self-stretch w-full">
          {entry.images.slice(0, 2).map((image, imgIndex) => (
            <Card
              key={imgIndex}
              className="relative w-[213px] h-[140px] bg-[#d9d9d9] rounded-xl border-none overflow-hidden"
            >
              <CardContent className="p-0 h-full">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${entry.title} - Image ${imgIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openPopup(entry.images, entry.title, imgIndex)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )
    } else if (entry.imageLayout === "triple") {
      return (
        <div className="flex items-start gap-[7px] relative self-stretch w-full">
          {entry.images.slice(0, 3).map((image, imgIndex) => (
            <Card
              key={imgIndex}
              className="relative w-[140px] h-[140px] bg-[#d9d9d9] rounded-xl border-none overflow-hidden"
            >
              <CardContent className="p-0 h-full">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${entry.title} - Image ${imgIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openPopup(entry.images, entry.title, imgIndex)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  }

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="w-[calc(100%-40px)] sm:w-[calc(100%-60px)] mx-[20px] sm:mx-[30px] py-[30px]">
        {/* Top Navigation */}
        <div className="mb-4">
          <Navigation activePage={activePage} setActivePage={setActivePage} />
        </div>

        {/* Online Status with Blinking Animation */}
        <Badge
          variant="outline"
          className="inline-flex items-center justify-center gap-[5px] pl-1.5 pr-2.5 py-0.5 mb-8 rounded-full border border-solid border-gray-200"
        >
          <div className="relative w-1 h-1 bg-[#1fef00] rounded-sm animate-pulse" />
          <span className="relative w-fit mt-[-1px] font-medium text-[#0e0e0e] text-[11px] tracking-[0] leading-[normal]">
            Online
          </span>
        </Badge>

        {/* Journal Entries */}
        <div className="flex flex-col w-full max-w-[437px] items-start gap-[29px] mb-16">
          {journalEntries.map((entry, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-[19px] relative self-stretch w-full cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-start gap-[72px] relative self-stretch w-full">
                <div className="relative w-fit mt-[-1px] font-medium text-black text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
                  {entry.date}
                </div>

                <div className="flex flex-col w-[327px] items-start gap-[5px] relative">
                  <div className="relative self-stretch mt-[-1px] font-medium text-black text-[12px] tracking-[0] leading-[normal]">
                    {entry.title}
                  </div>

                  <div
                    className="relative self-stretch font-normal text-[#939393] text-[11px] tracking-[0] leading-[normal]"
                    style={{ fontFamily: "Roboto Mono, monospace" }}
                  >
                    {entry.description}
                  </div>
                </div>
              </div>

              {renderImageLayout(entry)}
            </div>
          ))}
        </div>

        {/* Footer */}
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
                  <Button
                    key={index}
                    variant="link"
                    className="relative w-fit mt-[-1px] font-medium text-[#202020] text-[12px] tracking-[0] leading-[normal] whitespace-nowrap p-0 h-auto hover:underline"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Enhanced Image Popup */}
      <ImagePopup
        images={popupImages}
        currentIndex={currentImageIndex}
        isOpen={popupImages.length > 0}
        onClose={closePopup}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
