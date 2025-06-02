"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

// Mock function to get article data
function getArticleData(slug: string) {
  const articles = {
    "evolution-ukrainian-design": {
      date: "15 12 24",
      title: "THE EVOLUTION OF UKRAINIAN DESIGN",
      content: `Ukrainian design has undergone a remarkable transformation over the past decade. What began as a movement rooted in traditional folk motifs has evolved into a sophisticated design language that speaks to both local identity and global audiences.

The shift began around 2014, when a new generation of Ukrainian designers started questioning the established visual norms. They began exploring how traditional Ukrainian elements could be reinterpreted through contemporary design principles, creating work that was both authentically Ukrainian and universally appealing.

This evolution has been particularly evident in the realm of digital design and branding. Ukrainian designers have developed a unique approach that combines the geometric patterns of traditional embroidery with modern minimalism, creating visual systems that are both culturally specific and internationally relevant.

The impact of this design renaissance extends beyond aesthetics. It has become a form of cultural diplomacy, helping to reshape international perceptions of Ukraine and its creative capabilities. Through design, Ukrainian creatives have been able to tell their own stories and challenge stereotypes.

Today, Ukrainian design is recognized globally for its innovation, authenticity, and emotional resonance. It serves as a powerful example of how design can be both deeply rooted in local culture and universally meaningful.`,
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    "typography-digital-age": {
      date: "03 12 24",
      title: "TYPOGRAPHY IN THE DIGITAL AGE",
      content: `Typography has always been at the heart of design, but the digital age has fundamentally changed how we approach type. The constraints and possibilities of digital platforms have forced designers to rethink traditional typographic principles.

Screen typography presents unique challenges. Unlike print, where the designer has complete control over the final output, digital typography must adapt to countless variables: different screen sizes, resolutions, operating systems, and user preferences.

This has led to the development of new typographic strategies. Variable fonts, for instance, allow for unprecedented flexibility, enabling designers to create type that can adapt to different contexts while maintaining its essential character.

The rise of web fonts has also democratized typography, making high-quality typefaces accessible to designers worldwide. This has led to a more diverse typographic landscape, where designers can choose from thousands of fonts rather than being limited to system defaults.

However, with this freedom comes responsibility. The abundance of choice can be overwhelming, and it's more important than ever for designers to understand the principles that make typography effective.

The future of typography lies in finding the balance between technological possibility and human readability, between innovation and accessibility.`,
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=300&width=400"],
    },
  }

  return (
    articles[slug] || {
      date: "01 01 25",
      title: "ARTICLE TITLE",
      content: "Article content goes here.",
      images: ["/placeholder.svg?height=400&width=600"],
    }
  )
}

export default function JournalArticle({ params }: { params: { slug: string } }) {
  const article = getArticleData(params.slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="w-[calc(100%-60px)] max-w-[800px] mx-[30px] py-[30px]">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/journal">
            <Badge className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer">
              <span className="text-[10px] font-medium">← Back to Journal</span>
            </Badge>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="font-medium text-black text-[11px] mb-2">{article.date}</div>
          <h1 className="font-bold text-black text-[24px] mb-4">{article.title}</h1>
        </div>

        {/* Article Content */}
        <div className="mb-12">
          <div className="font-medium text-black text-[12px] leading-[18px] whitespace-pre-line">{article.content}</div>
        </div>

        {/* Article Images */}
        {article.images && article.images.length > 0 && (
          <div className="mb-12">
            <div
              className={`grid gap-4 ${
                article.images.length === 1
                  ? "grid-cols-1"
                  : article.images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
              }`}
            >
              {article.images.map((image, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${article.title} - Image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <Link href="/journal">
            <Button
              variant="outline"
              className="gap-[5px] pl-2 pr-2.5 pt-[5px] pb-1.5 bg-black text-[#e2e2e2] rounded-[20px] h-auto hover:bg-gray-800 transition-colors"
            >
              <span className="font-medium text-[10px]">← Back to Journal</span>
            </Button>
          </Link>

          <div className="text-center">
            <div className="font-medium text-[#202020] text-[11px]">© 2025</div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-[#202020] text-[11px]">SOCIAL:</span>
            <div className="flex items-center gap-3">
              {["instagram", "telegram", "mail", "read.cv", "are.na"].map((link, index) => (
                <span key={index} className="font-medium text-[#202020] text-[11px] hover:underline cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
