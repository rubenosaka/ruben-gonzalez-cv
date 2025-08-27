import React from 'react'
import { news } from '@/content/news.data'

export function NewsSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-5 border-b pb-3 text-2xl font-semibold text-foreground">
        News
      </h2>

      <div className="rounded-lg border bg-gray-50/50 p-6 shadow-sm ">
        <ul className="space-y-4">
          {news.map((item, index) => (
            <li
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="mb-1 font-mono text-xs text-gray-500">
                {'// '}{item.date} -{' '}
                <span className="font-bold text-foreground">{item.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
