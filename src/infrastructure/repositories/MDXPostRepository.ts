import { Post } from '@/domain/entities/Post'
import { PostRepository } from '@/application/interfaces/PostRepository'
import { Tag } from '@/domain/value-objects/Tag'

// Datos estáticos de los posts
const postsData = [
  {
    metadata: {
      title: 'Hola Mundo - Mi Primer Post',
      slug: 'hello-world',
      date: '2024-01-15',
      description: 'Un post de ejemplo para probar Contentlayer y MDX',
      tags: ['nextjs', 'mdx', 'contentlayer'],
      published: true,
    },
    content: `
# Hola Mundo

Este es mi primer post usando **Contentlayer** y **MDX**.

## Características

- ✅ Soporte completo para Markdown
- ✅ Componentes React en MDX
- ✅ Sintaxis resaltada de código
- ✅ Tipado completo con TypeScript

## Ejemplo de código

\`\`\`typescript
function saludar(nombre: string) {
  return \`¡Hola \${nombre}!\`
}

console.log(saludar('Mundo'))
\`\`\`

## Lista de tecnologías

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Contentlayer

¡Espero que te guste este setup!
`,
  },
]

export class MDXPostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    return postsData.map((post) => this.mapToPost(post))
  }

  async findPublished(): Promise<Post[]> {
    return postsData
      .filter((post) => post.metadata.published)
      .map((post) => this.mapToPost(post))
  }

  async findById(id: string): Promise<Post | null> {
    const post = postsData.find((p) => p.metadata.slug === id)
    return post ? this.mapToPost(post) : null
  }

  async findByUrl(url: string): Promise<Post | null> {
    const post = postsData.find((p) => `/posts/${p.metadata.slug}` === url)
    return post ? this.mapToPost(post) : null
  }

  async findByTag(tag: Tag): Promise<Post[]> {
    return postsData
      .filter((post) => post.metadata.tags?.includes(tag.value))
      .map((post) => this.mapToPost(post))
  }

  async findByTags(tags: Tag[]): Promise<Post[]> {
    const tagValues = tags.map((tag) => tag.value)
    return postsData
      .filter((post) =>
        post.metadata.tags?.some((tag) => tagValues.includes(tag))
      )
      .map((post) => this.mapToPost(post))
  }

  async search(query: string): Promise<Post[]> {
    const lowercaseQuery = query.toLowerCase()
    return postsData
      .filter(
        (post) =>
          post.metadata.title.toLowerCase().includes(lowercaseQuery) ||
          post.metadata.description.toLowerCase().includes(lowercaseQuery) ||
          post.metadata.tags?.some((tag) =>
            tag.toLowerCase().includes(lowercaseQuery)
          )
      )
      .map((post) => this.mapToPost(post))
  }

  private mapToPost(postData: any): Post {
    const metadata = {
      title: postData.metadata.title,
      date: new Date(postData.metadata.date),
      description: postData.metadata.description,
      tags: postData.metadata.tags || [],
      published: postData.metadata.published,
    }

    return Post.create(
      postData.metadata.slug || 'default-slug',
      metadata,
      postData.content,
      `/posts/${postData.metadata.slug || 'default-slug'}`
    )
  }
}
