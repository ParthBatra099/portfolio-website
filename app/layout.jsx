import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Parth Batra — AI Engineer | Software Developer | Competitive Programmer',
  description: 'Portfolio of Parth Batra — B.Tech CSE @ JIIT Noida. Building intelligent systems through AI, Computer Vision, Generative AI, Backend Development, and Algorithmic Problem Solving.',
  keywords: ['Parth Batra', 'AI Engineer', 'Software Developer', 'Competitive Programmer', 'JIIT', 'Portfolio', 'Computer Vision', 'Generative AI', 'NLP', 'Chess Engine'],
  authors: [{ name: 'Parth Batra' }],
  openGraph: {
    title: 'Parth Batra — AI Engineer Portfolio',
    description: 'AI Engineer | Software Developer | Competitive Programmer',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#05060f] text-slate-100 antialiased selection:bg-purple-500/40 selection:text-white">
        {children}
        <Toaster theme="dark" position="top-right" />
      </body>
    </html>
  )
}
