import { Card, CardContent } from "@/components/ui/card"
import { blogCard } from "./lib/interface"
import { client, urlFor } from "./lib/sanity"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`

  const data = await client.fetch(query)
  return data
}

export default async function Home() {
  const data: blogCard[] = await getData()

  console.log(data)
  return (
    <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
      {/* should probably use a better key than an iterator? */}
      {data.map((post, idx) => (
        <Card className="flex flex-col" key={idx}>
          <Image src={urlFor(post.titleImage).url()} alt="image" width={600} height={600} className="rounded-t-lg h-[200px] object-cover"/>
          <CardContent className="flex-grow mt-5">
            <div className="flex flex-col justify-between h-full">
              <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3 dark:text-gray-300">{post.smallDescription}</p>
              <div className="flex-grow"></div>
              <Button asChild className="w-full mt-2">
                <Link href={`/blog/${post.currentSlug}`}>Read More...</Link>
              </Button>
            </div>
            
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
