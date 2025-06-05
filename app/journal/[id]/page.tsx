"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { format } from "date-fns"

interface PostData {
  post: {
    properties: {
      title: { title: Array<{ plain_text: string }> }
      date: { date: { start: string } }
      attachments: { files: Array<{ file: { url: string }, name: string }> }
    }
  }
  markdown: string
}

export default function JournalPost({ params }: { params: { id: string } }) {
  const [postData, setPostData] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.id}`)
        const data = await response.json()
        setPostData(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!postData) {
    return <div>Post not found</div>
  }

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
          <div className="font-medium text-black text-[11px] mb-2">
            {format(new Date(postData.post.properties.date.date.start), "dd MM yy")}
          </div>
          <h1 className="font-bold text-black text-[24px] mb-4">
            {postData.post.properties.title.title[0].plain_text}
          </h1>
        </div>

        {/* Article Content */}
        <div className="mb-12">
          <div className="font-medium text-black text-[12px] leading-[18px] whitespace-pre-line">
            <ReactMarkdown>{postData.markdown}</ReactMarkdown>
          </div>
        </div>

        {/* Article Images */}
        {postData.post.properties.attachments.files.length > 0 && (
          <div className="mb-12">
            <div className="grid gap-4 grid-cols-1">
              {postData.post.properties.attachments.files.map((file, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={file.file.url}
                    alt={file.name}
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