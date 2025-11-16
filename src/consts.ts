import * as Icons from '@icons'
import type { Project } from '@types'

export const SOCIALS = [
  {
    label: 'Resume',
    link: './kevin-rodriguez_curriculum-en.pdf',
    icon: Icons.ResumeIcon
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/kevinrdev/',
    icon: Icons.LinkedInIcon
  },
  {
    label: 'Github',
    link: 'https://github.com/K3vnDev',
    icon: Icons.GithubIcon
  }
]

export const SECTIONS = {
  PROJECTS: {
    label: 'My work',
    icon: Icons.CodeIcon
  },
  ABOUT: {
    label: 'About me',
    icon: Icons.AboutIcon
  }
}

export const TECHNOLOGIES = {
  JAVASCRIPT: {
    label: 'JavaScript',
    icon: Icons.JavaScriptIcon
  },
  TYPESCRIPT: {
    label: 'TypeScript',
    icon: Icons.TypeScriptIcon
  },
  REACT: {
    label: 'React',
    icon: Icons.ReactIcon
  },
  NODE: {
    label: 'Node.js',
    icon: Icons.NodeJSIcon
  },
  MONGODB: {
    label: 'MongoDB',
    icon: Icons.MongoDBIcon
  },
  LEAFLET: {
    label: 'Leaflet',
    icon: Icons.LeafletIcon
  },
  SUPABASE: {
    label: 'Supabase',
    icon: Icons.SupabaseIcon
  },
  NEXTJS: {
    label: 'Next.js',
    icon: Icons.NextJSIcon
  },
  OPENAI: {
    label: 'OpenAI',
    icon: Icons.OpenAIIcon
  }
}

const T = TECHNOLOGIES
export const PROJECTS: Project[] = [
  {
    name: 'Pixi Paint',
    desc: 'Create tiny masterpieces in a retro 8×8 pixel-art style. Paint, share, and even play minigames. All inside this handcrafted web platform.',
    starredImgs: [
      '/projects/pixi-paint/starred-1.gif',
      '/projects/pixi-paint/starred-2.webp',
      '/projects/pixi-paint/starred-3.webp'
    ],
    technologies: [T.NEXTJS, T.MONGODB],
    code: 'https://github.com/K3vnDev/pixi-paint',
    preview: 'https://pixi-paint.vercel.app'
  },
  {
    name: 'Studymate',
    desc: 'Enhance your learning with AI. Mate, your virtual assistant, will help you create, follow and complete personalized study plans.',
    starredImgs: [
      '/projects/studymate/starred-1.webp',
      '/projects/studymate/starred-2.webp',
      '/projects/studymate/starred-3.webp'
    ],
    technologies: [T.NEXTJS, T.SUPABASE, T.OPENAI],
    code: 'https://github.com/K3vnDev/studymate',
    preview: 'https://studymate-web.vercel.app/studyplan/9d1597b7-3d18-4135-b9a8-133cf38845dd'
  },
  {
    name: 'Quizzie',
    desc: 'Easy-to-use quiz maker. Create your own quizzes and share them with others. You can also have fun playing existing ones, the answer is yours!',
    starredImgs: ['/projects/quizzie/starred-1.webp', '/projects/quizzie/starred-2.webp'],
    technologies: [T.REACT, T.NODE, T.MONGODB],
    code: 'https://github.com/K3vnDev/quizzie',
    preview: 'https://quizzie-wb.netlify.app'
  },
  {
    name: 'Timeline Creator',
    desc: 'Creating timelines has never been easier. Make and view as many timelines as you want with this simple yet versatile website.',
    starredImgs: [
      '/projects/timeline-creator/starred-1.webp',
      '/projects/timeline-creator/starred-2.webp'
    ],
    technologies: [T.REACT, T.TYPESCRIPT],
    code: 'https://github.com/K3vnDev/timeline-creator',
    preview: 'https://timeline-creator.netlify.app'
  }
]

export const EVENTS = {
  OPEN_CONTACT: 'opencontactform'
}

export const NAVBAR_TOP = {
  VISIBLE: 'top-4',
  HIDDEN: '-top-20'
} as const
