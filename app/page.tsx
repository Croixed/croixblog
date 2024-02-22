import { blogCard } from "./lib/interface"
import { client } from "./lib/sanity"

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
    <div className="">
      <h1>Hello!</h1>
    </div>
  )
}
