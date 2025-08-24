import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const CV = defineDocumentType(() => ({
  name: 'CV',
  filePathPattern: `cv.md`,
  contentType: 'md',
  fields: {
    name: {
      type: 'string',
      description: 'Full name',
      required: true,
    },
    title: {
      type: 'string',
      description: 'Professional title',
      required: true,
    },
    email: {
      type: 'string',
      description: 'Email address',
      required: true,
    },
    location: {
      type: 'string',
      description: 'Location',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'Professional summary',
      required: true,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Project title',
      required: true,
    },
    slug: {
      type: 'string',
      description: 'Project slug',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Role in the project',
      required: true,
    },
    period: {
      type: 'string',
      description: 'Project period',
      required: true,
    },
    stack: {
      type: 'list',
      of: { type: 'string' },
      description: 'Technologies used',
      required: false,
    },
    links: {
      type: 'list',
      of: {
        type: 'nested',
        of: [
          { name: 'label', type: 'string' },
          { name: 'url', type: 'string' },
        ],
      },
      description: 'Project links',
      required: false,
    },
    summary: {
      type: 'string',
      description: 'Project summary',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => `/projects/${project.slug}`,
    },
  },
}))

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Page title',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (page) => page._raw.flattenedPath.replace('pages/', ''),
    },
    url: {
      type: 'string',
      resolve: (page) => `/${page._raw.flattenedPath.replace('pages/', '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [CV, Project, Page],
})
