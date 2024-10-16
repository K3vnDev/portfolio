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

const { FILES_PATH } = import.meta.env

export const SOCIALS = [
  {
    label: 'Resume',
    link: `${FILES_PATH}/kevin-rodriguez_curriculum-en.pdf`,
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
