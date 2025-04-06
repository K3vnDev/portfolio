import AboutIcon from '@icons/About.astro'
import CodeIcon from '@icons/Code.astro'

import GithubIcon from '@icons/Github.astro'
import LinkedInIcon from '@icons/LinkedIn.astro'
import ResumeIcon from '@icons/Resume.astro'

import LeafletIcon from '@components/icons/Leaflet.astro'
import JavaScriptIcon from '@icons/JavaScript.astro'
import MongoDBIcon from '@icons/MongoDB.astro'
import NodeJSIcon from '@icons/NodeJS.astro'
import ReactIcon from '@icons/React.astro'
import TypeScriptIcon from '@icons/TypeScript.astro'
import type { Project } from '@/types.d'

export const SOCIALS = [
  {
    label: 'Resume',
    link: './kevin-rodriguez_curriculum-en.pdf',
    icon: ResumeIcon
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/kevinrdev/',
    icon: LinkedInIcon
  },
  {
    label: 'Github',
    link: 'https://github.com/K3vnDev',
    icon: GithubIcon
  }
]

export const SECTIONS = {
  PROJECTS: {
    label: 'Starred projects',
    icon: CodeIcon
  },
  ABOUT: {
    label: 'About me',
    icon: AboutIcon
  }
}

export const TECHNOLOGIES = {
  JAVASCRIPT: {
    label: 'JavaScript',
    icon: JavaScriptIcon
  },
  TYPESCRIPT: {
    label: 'TypeScript',
    icon: TypeScriptIcon
  },
  REACT: {
    label: 'React',
    icon: ReactIcon
  },
  NODE: {
    label: 'Node.js',
    icon: NodeJSIcon
  },
  MONGODB: {
    label: 'MongoDB',
    icon: MongoDBIcon
  },
  LEAFLET: {
    label: 'Leaflet',
    icon: LeafletIcon
  }
}

const T = TECHNOLOGIES
export const PROJECTS: Project[] = [
  {
    name: 'Quizzie',
    desc: 'Easy-to-use quiz maker. Create your own quizzes and share them with others. You can also have fun playing existing ones, the answer is yours!',
    big: true,
    tecnologies: [T.REACT, T.NODE, T.MONGODB],
    code: 'https://github.com/K3vnDev/quizzie',
    preview: 'https://quizzie-wb.netlify.app'
  },
  {
    name: 'IP Geolocation',
    desc: 'A website that tracks your IP address and displays it for you. It also includes a map and information about your estimated location.',
    big: false,
    tecnologies: [T.REACT, T.LEAFLET],
    code: 'https://github.com/K3vnDev/ip-geolocation',
    preview: 'https://ip-geolocation-kevdev.netlify.app'
  },
  {
    name: 'URL Shortener',
    desc: 'Shorten long and annoying URLs easily. Save your favorite websites on the dashboard and access their shortened links anytime.',
    big: false,
    tecnologies: [T.REACT, T.NODE, T.MONGODB],
    code: 'https://github.com/K3vnDev/u-sh',
    preview: 'https://url-shortener-ljsf.onrender.com'
  },
  {
    name: 'Timeline Creator',
    desc: 'Creating timelines has never been easier. Make and view as many timelines as you want with this simple yet versatile website.',
    big: true,
    tecnologies: [T.REACT, T.TYPESCRIPT],
    code: 'https://github.com/K3vnDev/timeline-creator',
    preview: 'https://timeline-creator.netlify.app'
  }
]

export const EVENTS = {
  OPEN_CONTACT: 'opencontactform'
}

export const VISIBLE_NAVBAR_TOP = 'top-4'
