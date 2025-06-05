"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import BackToTop from "@/components/back-to-top"
import Link from "next/link"
import { format } from "date-fns"

interface Post {
  id: string
  properties: {
    title: { title: Array<{ plain_text: string }> }
    date: { date: { start: string } }
    blogPost: { rich_text: Array<{ plain_text: string }> }
    attachments: { files: Array<{ file: { url: string }, name: string }> }
  }
}

export default function Journal() {
  const [activePage, setActivePage] = useState<string | null>("Journal")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Social links data
  const socialLinks = [
    { name: "instagram", url: "https://www.instagram.com/tiredxs/" },
    { name: "telegram", url: "http://t.me/tiredxs" },
    { name: "mail", url: "mailto:kifuliak66@gmail.com" },
    { name: "read.cv", url: "https://read.cv/tiredxs" },
    { name: "are.na", url: "https://www.are.na/dima-kifuliak" },
  ]

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
          {loading ? (
            <div className="text-center w-full">Loading...</div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col items-start gap-[19px] relative self-stretch w-full cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="flex items-start gap-[72px] relative self-stretch w-full">
                  <div className="relative w-fit mt-[-1px] font-medium text-black text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
                    {format(new Date(post.properties.date.date.start), "dd MM yy")}
                  </div>

                  <div className="flex flex-col w-[327px] items-start gap-[5px] relative">
                    <Link href={`/journal/${post.id}`}>
                      <div className="relative self-stretch mt-[-1px] font-medium text-black text-[12px] tracking-[0] leading-[normal]">
                        {post.properties.title.title[0].plain_text}
                      </div>
                    </Link>

                    <div
                      className="relative self-stretch font-normal text-[#939393] text-[11px] tracking-[0] leading-[normal]"
                      style={{ fontFamily: "Roboto Mono, monospace" }}
                    >
                      {post.properties.blogPost.rich_text[0].plain_text.substring(0, 200)}...
                    </div>
                  </div>
                </div>

                {post.properties.attachments.files.length > 0 && (
                  <div className="w-full h-[287px] bg-[#d9d9d9] rounded-xl overflow-hidden">
                    <img
                      src={post.properties.attachments.files[0].file.url}
                      alt={post.properties.attachments.files[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))
          )}
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

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}