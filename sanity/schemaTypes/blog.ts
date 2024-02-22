export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of blog post',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog post',
      options: {
        source: 'title',
      }
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Post image'
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        }
      ]
    }
  ]
}