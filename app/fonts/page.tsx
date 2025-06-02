import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Navigation from "@/components/navigation"

export default function Fonts() {
  const fonts = [
    {
      name: "Lezo",
      description: "A geometric sans-serif typeface with unique character forms inspired by Ukrainian modernism.",
      styles: "Regular, Bold, Italic",
      image: "/placeholder.svg?height=300&width=600",
      slug: "lezo",
    },
    {
      name: "Kyiv Type",
      description: "A contemporary serif typeface designed specifically for editorial use with excellent readability.",
      styles: "Light, Regular, Medium, Bold, Black",
      image: "/placeholder.svg?height=300&width=600",
      slug: "kyiv-type",
      comingSoon: true,
    },
    {
      name: "Dnipro Sans",
      description: "A versatile sans-serif family with a wide range of weights for digital and print applications.",
      styles: "Thin, Light, Regular, Medium, Bold, Black",
      image: "/placeholder.svg?height=300&width=600",
      slug: "dnipro-sans",
      comingSoon: true,
    },
  ]

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="w-[calc(100%-60px)] mx-[30px] py-[30px]">
        {/* Top Navigation */}
        <div className="mb-4">
          <Navigation />
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-bold">Fonts</h1>
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <p className="text-[12px] font-medium text-black leading-[16px] max-w-[600px]">
            Custom typefaces designed for various projects and purposes. Each font is crafted with attention to detail
            and specific use cases in mind.
          </p>
        </div>

        {/* Fonts Grid */}
        <div className="mb-16 w-full">
          {fonts.map((font, index) => (
            <div key={index} className="mb-12 w-full">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[16px] font-bold">{font.name}</h2>
                {font.comingSoon && (
                  <Badge className="bg-black text-white text-[10px] rounded-full px-2 py-0.5">COMING SOON</Badge>
                )}
              </div>
              <Separator className="h-[0.5px] w-full bg-black mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 w-full">
                <div>
                  <div className="bg-gray-100 h-[300px] mb-2 rounded-lg overflow-hidden">
                    <img
                      src={font.image || "/placeholder.svg"}
                      alt={font.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[12px] text-gray-600 mb-4">{font.description}</p>
                  <p className="text-[12px] font-medium">
                    <span className="font-bold">Available styles:</span> {font.styles}
                  </p>

                  {!font.comingSoon && (
                    <Link href={`/fonts/${font.slug}`}>
                      <Badge className="inline-flex items-center gap-1 py-1 px-4 mt-4 rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer">
                        <span className="text-[11px] font-medium">View Details</span>
                      </Badge>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mb-8">
          <Link href="/">
            <Badge className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer">
              <span className="text-[11px] font-medium">Back to Home</span>
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  )
}
