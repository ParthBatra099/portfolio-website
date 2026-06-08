'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  Download,
  ArrowRight,
  ExternalLink,
  Code2,
  Brain,
  Eye,
  Sparkles,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Trophy,
  Rocket,
  GraduationCap,
  Bot,
  Gamepad2,
  ChevronRight,
  Send,
  Menu,
  X,
  Star,
  Zap,
  Layers,
  Filter,
  Calendar,
  BookOpen,
  Award,
  Users,
  CheckCircle2
} from "lucide-react";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Manual SVG components for the problematic icons
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.8 1.66-.13.61-.8 2-1.2 2-1 0-2-1-2-2 0-2.2 2-4 4-4"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Github = GithubIcon;
const Linkedin = LinkedinIcon;

/* ---------------- Data ---------------- */
const PROFILE = {
  name: 'Parth Batra',
  title: 'AI Engineer | Software Developer | Competitive Programmer',
  location: 'Faridabad, India',
  tagline: 'Building intelligent systems through Artificial Intelligence, Computer Vision, Generative AI, Backend Development, and Algorithmic Problem Solving.',
  email: 'parthbatra524@gmail.com',
  phone: '+91-8527903308',
  github: 'https://github.com/ParthBatra099',
  linkedin: 'https://linkedin.com/in/parth-batra',
  cgpa: '7.7',
  college: 'Jaypee Institute of Information Technology (JIIT), Noida',
}

const ACHIEVEMENTS = [
  { icon: Code2, title: '200+ DSA Problems', desc: 'Solved across LeetCode and major coding platforms.', color: 'from-blue-500 to-cyan-500' },
  { icon: Brain, title: 'AI Applications', desc: 'Built multiple AI apps spanning NLP, CV and Generative AI.', color: 'from-purple-500 to-pink-500' },
  { icon: Bot, title: 'Conversational AI', desc: 'Built AI systems using Gemini API and locally hosted LLMs.', color: 'from-indigo-500 to-purple-500' },
  { icon: Gamepad2, title: 'Chess Engine from Scratch', desc: 'Bitboard-based engine with Minimax + Alpha-Beta pruning.', color: 'from-emerald-500 to-teal-500' },
  { icon: Trophy, title: 'Hackathon Finalist', desc: 'Finalist-level hackathon experience.', color: 'from-amber-500 to-orange-500' },
  { icon: Rocket, title: 'Active Learner', desc: 'AI, Backend Development and Competitive Programming.', color: 'from-rose-500 to-pink-500' },
]

const SKILLS = {
  Languages: { icon: Terminal, items: [{n:'C++',v:92},{n:'Python',v:90}] },
  'Core CS': { icon: Cpu, items: [{n:'DSA',v:90},{n:'OOP',v:88},{n:'OS',v:82},{n:'DBMS',v:85},{n:'Computer Networks',v:80}] },
  'AI & ML': { icon: Brain, items: [{n:'Generative AI',v:88},{n:'NLP',v:84},{n:'LLMs',v:86},{n:'Prompt Engineering',v:90},{n:'OpenCV',v:85},{n:'Computer Vision',v:84}] },
  Tools: { icon: GitBranch, items: [{n:'Git',v:88},{n:'Linux',v:85},{n:'Ollama',v:82},{n:'Gemini API',v:88},{n:'NumPy',v:86},{n:'Pandas',v:84}] },
}

const PROJECTS = [
  {
    title: 'NeuroVision Face Recognition System',
    category: 'Computer Vision',
    icon: Eye,
    description: 'AI-powered real-time face recognition system using computer vision. Includes face detection, encoding, identity matching, lighting correction, facial alignment and webcam-based recognition.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Deep Learning'],
    features: ['Real-time Recognition', 'Face Encoding', 'Identity Matching', 'Live Webcam Detection', 'Preprocessing Pipeline'],
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    accent: 'cyan',
  },
  {
    title: 'Saarthi AI Chatbot',
    category: 'Generative AI',
    icon: Sparkles,
    description: 'Conversational AI assistant using Gemini API. Designed multi-turn conversations, contextual memory, semantic understanding and educational AI assistance.',
    tech: ['Python', 'Gemini API', 'NLP', 'Generative AI'],
    features: ['Multi-turn Chat', 'Context Awareness', 'Prompt Engineering', 'Educational Assistant'],
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-600',
    accent: 'purple',
  },
  {
    title: 'JIIT College Chatbot',
    category: 'LLM Application',
    icon: Bot,
    description: 'AI chatbot for student academic and campus assistance using Ollama and locally hosted LLMs. Answers campus, course and document-related questions.',
    tech: ['Python', 'Ollama', 'NLP', 'LLMs'],
    features: ['Campus Assistance', 'Context-Aware Responses', 'Document Q&A', 'Local LLM Deployment'],
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    accent: 'emerald',
  },
  {
    title: 'Chess Engine in C++',
    category: 'Game AI',
    icon: Gamepad2,
    description: 'Complete bitboard-based chess engine from scratch with Minimax + Alpha-Beta pruning, evaluation functions, and full rule support.',
    tech: ['C++', 'Bitboards', 'Minimax', 'Alpha-Beta Pruning'],
    features: ['Move Generation', 'Evaluation Function', 'Piece-Square Tables', 'Castling', 'Promotion', 'En Passant', 'AI Move Selection'],
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    accent: 'amber',
    chess: true,
  },
]

const CATEGORIES = ['All', 'Computer Vision', 'Generative AI', 'LLM Application', 'Game AI']

const DSA_TOPICS = [
  'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees',
  'Binary Search Trees', 'Graphs', 'Dynamic Programming', 'Greedy Algorithms',
  'Bit Manipulation', 'Sliding Window', 'Two Pointers', 'Backtracking',
]

const TIMELINE = [
  { year: '2023', title: 'Started B.Tech CSE @ JIIT Noida', desc: 'Began Computer Science journey at Jaypee Institute of Information Technology.', icon: GraduationCap },
  { year: '2025', title: 'NeuroVision Face Recognition System', desc: 'Built a real-time face recognition pipeline using OpenCV.', icon: Eye },
  { year: '2025', title: 'Chess Engine using Bitboards', desc: 'Engineered a complete C++ chess engine from scratch.', icon: Gamepad2 },
  { year: '2026', title: 'Saarthi AI Chatbot', desc: 'Conversational AI assistant powered by Gemini API.', icon: Sparkles },
  { year: '2026', title: 'JIIT College Chatbot', desc: 'Local LLM-powered student helper using Ollama.', icon: Bot },
]

const NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'dsa', label: 'DSA' },
  { id: 'timeline', label: 'Timeline' },
]

/* ---------------- Particles Canvas ---------------- */
function ParticlesBg() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const N = Math.min(90, Math.floor((w*h)/20000))
    const particles = Array.from({length: N}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: Math.random()*2 + 0.6,
      c: Math.random() > 0.5 ? '#60a5fa' : '#a855f7',
    }))
    let raf
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    const loop = () => {
      ctx.clearRect(0,0,w,h)
      for (let i=0;i<particles.length;i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x<0||p.x>w) p.vx*=-1
        if (p.y<0||p.y>h) p.vy*=-1
        ctx.beginPath()
        ctx.fillStyle = p.c
        ctx.globalAlpha = 0.7
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fill()
        for (let j=i+1;j<particles.length;j++) {
          const q = particles[j]
          const dx = p.x-q.x, dy = p.y-q.y
          const d2 = dx*dx+dy*dy
          if (d2 < 130*130) {
            ctx.globalAlpha = (1 - d2/(130*130)) * 0.25
            ctx.strokeStyle = '#8b5cf6'
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

/* ---------------- Loader ---------------- */
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setTimeout(onDone, 400); return 100 }
        return p + 4 + Math.random()*8
      })
    }, 60)
    return () => clearInterval(t)
  }, [onDone])
  return (
    <motion.div initial={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-[#05060f] flex items-center justify-center">
      <div className="text-center">
        <motion.div animate={{rotate:360}} transition={{repeat:Infinity, duration:2, ease:'linear'}} className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow">
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold gradient-text mb-3">Parth Batra</h2>
        <p className="text-slate-400 text-sm mb-6 font-mono">Initializing portfolio...</p>
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: `${Math.min(progress,100)}%`}} />
        </div>
        <p className="mt-3 text-xs font-mono text-slate-500">{Math.min(Math.floor(progress),100)}%</p>
      </div>
    </motion.div>
  )
}

/* ---------------- Animated Counter ---------------- */
function Counter({ to=200, suffix='+', duration=1500 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start; const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts-start)/duration, 1)
      setVal(Math.floor(p*to))
      if (p<1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ---------------- Navbar ---------------- */
function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.nav initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'glass py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow group-hover:scale-110 transition">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="font-bold text-lg hidden sm:block">Parth<span className="gradient-text">.dev</span></span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className={`px-3 py-2 text-sm rounded-md transition relative ${active===n.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
              {n.label}
              {active===n.id && <motion.div layoutId="underline" className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500" />}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 text-slate-300" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden">
            <div className="flex flex-col p-2">
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={()=>setOpen(false)} className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-md">{n.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ---------------- Sections ---------------- */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <ParticlesBg />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Available for internships & freelance</span>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3, duration:0.8}}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="block text-white">Hi, I'm</span>
            <span className="gradient-text block">{PROFILE.name}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium mb-3">
            {PROFILE.title}
          </motion.p>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
            className="flex items-center justify-center gap-2 text-slate-400 mb-6 text-sm">
            <MapPin className="w-4 h-4" /> {PROFILE.location}
          </motion.div>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.7}}
            className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
            {PROFILE.tagline}
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.8}}
            className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href="#projects">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 border-0 text-base">
                View Projects <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="/resume.pdf" download>
              <Button size="lg" variant="outline" className="border-purple-500/40 hover:border-purple-500 bg-white/5 hover:bg-white/10 text-base">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </Button>
            </a>
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}} className="flex items-center justify-center gap-4">
            {[
              {Icon:Github, href: PROFILE.github, label:'GitHub'},
              {Icon:Linkedin, href: PROFILE.linkedin, label:'LinkedIn'},
              {Icon:Mail, href:`mailto:${PROFILE.email}`, label:'Email'},
            ].map(({Icon,href,label}) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 hover:border-purple-500/40 transition">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-mono flex flex-col items-center gap-2">
        <span>scroll</span>
        <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity, duration:1.5}} className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent" />
      </motion.div>
    </section>
  )
}

function SectionHeader({ overline, title, desc }) {
  return (
    <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
      <div className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">{overline}</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{title}</h2>
      {desc && <p className="text-slate-400 max-w-2xl mx-auto">{desc}</p>}
    </motion.div>
  )
}

function About() {
  const interests = ['Artificial Intelligence','Computer Vision','Generative AI','Backend Systems','Data Structures & Algorithms','Game AI']
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader overline="About" title="About Me" desc="Bridging AI research and practical software engineering." />
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="md:col-span-2">
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 blur-2xl opacity-50" />
              <div className="relative w-full h-full rounded-3xl glass p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold mb-4 glow">PB</div>
                  <p className="text-slate-300 font-medium">Parth Batra</p>
                  <p className="text-slate-500 text-sm">B.Tech CSE • JIIT Noida</p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/20">
                    <Star className="w-3 h-3"/> CGPA {PROFILE.cgpa}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="md:col-span-3 space-y-5">
            <p className="text-lg text-slate-300 leading-relaxed">
              I am a <span className="text-white font-semibold">B.Tech Computer Science Engineering</span> student at <span className="gradient-text font-semibold">Jaypee Institute of Information Technology (JIIT), Noida</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I enjoy building real-world intelligent systems that combine AI research with practical software engineering — from computer vision pipelines to conversational LLM applications and bitboard-driven game AI.
            </p>
            <div>
              <p className="text-sm uppercase tracking-wider text-slate-500 font-mono mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map(i => (
                  <Badge key={i} variant="outline" className="border-purple-500/30 bg-purple-500/5 text-slate-200 hover:bg-purple-500/10">
                    {i}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">7.7</div>
                <div className="text-xs text-slate-500">CGPA</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text"><Counter to={200}/></div>
                <div className="text-xs text-slate-500">DSA Solved</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text"><Counter to={4} suffix="+"/></div>
                <div className="text-xs text-slate-500">AI Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader overline="Achievements" title="Highlights & Wins" desc="A snapshot of what I've built, broken, and learned." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.div key={a.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.06}}>
                <Card className="glass border-purple-500/10 hover:border-purple-500/40 transition-all p-6 h-full group hover:-translate-y-1 hover:glow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                  <p className="text-slate-400 text-sm">{a.desc}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader overline="Skills" title="Technical Skills" desc="Tools and technologies I work with daily." />
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([cat, val], i) => {
            const Icon = val.icon
            return (
              <motion.div key={cat} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <Card className="glass border-purple-500/10 p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-purple-500/20">
                      <Icon className="w-5 h-5 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-semibold">{cat}</h3>
                  </div>
                  <div className="space-y-4">
                    {val.items.map(s => (
                      <div key={s.n}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-slate-300">{s.n}</span>
                          <span className="text-xs font-mono text-slate-500">{s.v}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800/60 overflow-hidden">
                          <motion.div initial={{width:0}} whileInView={{width:`${s.v}%`}} viewport={{once:true}} transition={{duration:1.2, ease:'easeOut'}}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shimmer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ChessAnim() {
  return (
    <div className="grid grid-cols-4 gap-0 w-24 h-24 rounded overflow-hidden border border-amber-500/30">
      {Array.from({length:16}).map((_,i) => {
        const r = Math.floor(i/4), c = i%4
        const dark = (r+c)%2===1
        return (
          <motion.div key={i} animate={{opacity:[0.7,1,0.7]}} transition={{delay:i*0.05, repeat:Infinity, duration:3}} className={dark ? 'chess-square-dark' : 'chess-square-light'} />
        )
      })}
    </div>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(() => filter==='All' ? PROJECTS : PROJECTS.filter(p => p.category===filter), [filter])
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader overline="Portfolio" title="Featured Projects" desc="Selected work across AI, CV, LLMs and game engines." />
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Filter className="w-4 h-4 text-slate-500" />
          {CATEGORIES.map(c => (
            <button key={c} onClick={()=>setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${filter===c ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
              {c}
            </button>
          ))}
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div key={p.title} layout initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{delay:i*0.08}}>
                  <Card className="glass border-purple-500/10 hover:border-purple-500/40 transition-all overflow-hidden group h-full hover:-translate-y-1">
                    <div className={`relative h-44 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <Badge className="bg-black/40 text-white border-white/10 backdrop-blur">{p.category}</Badge>
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      {p.chess && (
                        <div className="absolute bottom-4 right-4 opacity-90 group-hover:scale-110 transition">
                          <ChessAnim />
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white drop-shadow">{p.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech.map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono">{t}</span>
                        ))}
                      </div>
                      <div className="space-y-1.5 mb-4">
                        {p.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full border-purple-500/30 hover:border-purple-500 bg-transparent">
                            <Github className="w-4 h-4 mr-2" /> Code
                          </Button>
                        </a>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
                          <ExternalLink className="w-4 h-4 mr-2" /> Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function DSA() {
  return (
    <section id="dsa" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <SectionHeader overline="Competitive Programming" title="DSA & Problem Solving" desc="Algorithmic thinking sharpened across hundreds of problems." />
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {label:'Problems Solved', value:200, suffix:'+', Icon:Code2},
            {label:'Topics Covered', value:14, suffix:'+', Icon:Layers},
            {label:'Platforms', value:3, suffix:'+', Icon:Zap},
          ].map(({label,value,suffix,Icon}) => (
            <motion.div key={label} initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}>
              <Card className="glass border-purple-500/20 p-8 text-center">
                <Icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="text-5xl sm:text-6xl font-extrabold gradient-text mb-2">
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="text-slate-400 uppercase text-xs font-mono tracking-wider">{label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <h3 className="text-center text-slate-400 text-sm font-mono uppercase tracking-wider mb-5">Topics Covered</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {DSA_TOPICS.map((t,i) => (
              <motion.span key={t} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.03}}
                className="px-4 py-2 rounded-full glass text-sm border-purple-500/20 hover:border-purple-500/50 hover:text-purple-300 transition cursor-default">
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader overline="Journey" title="My Timeline" desc="Milestones from learning to building." />
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />
          {TIMELINE.map((t, i) => {
            const Icon = t.icon
            const left = i%2===0
            return (
              <motion.div key={i} initial={{opacity:0, x: left ? -30 : 30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                className={`relative mb-10 md:w-1/2 ${left ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'} pl-14 md:pl-0`}>
                <div className={`absolute top-2 ${left ? 'left-0 md:-right-3 md:left-auto' : 'left-0 md:-left-3'} w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <Card className="glass border-purple-500/10 p-5 hover:border-purple-500/40 transition">
                  <div className="flex items-center gap-2 mb-1 text-xs font-mono text-purple-300">
                    <Calendar className="w-3 h-3" /> {t.year}
                  </div>
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <p className="text-slate-400 text-sm">{t.desc}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-purple-500/10 py-10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold">Parth<span className="gradient-text">.dev</span></span>
            </div>
            <p className="text-slate-400 text-sm">AI Engineer · Software Developer · Competitive Programmer building in India.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-500 font-mono">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {NAV.map(n => <a key={n.id} href={`#${n.id}`} className="text-slate-400 hover:text-purple-300">{n.label}</a>)}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-500 font-mono">Connect</h4>
            <div className="flex gap-3">
              {[
                {Icon:Github, href: PROFILE.github},
                {Icon:Linkedin, href: PROFILE.linkedin},
                {Icon:Mail, href:`mailto:${PROFILE.email}`},
              ].map(({Icon,href}, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-purple-500/40 transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Parth Batra. All rights reserved.</p>
          <p className="text-xs text-slate-500 font-mono">Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- Main App ---------------- */
function App() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('hero')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const ids = NAV.map(n => n.id)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={()=>setLoading(false)} />}</AnimatePresence>
      <motion.div style={{scaleX}} className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60] origin-left" />
      <Navbar active={active} />
      <main className="relative">
        <Hero />
        <About />
        <Achievements />
        <Skills />
        <Projects />
        <DSA />
        <Timeline />
      </main>
      <Footer />
    </>
  )
}

export default App