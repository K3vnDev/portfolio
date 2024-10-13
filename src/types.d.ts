type AstroElement = (_props: Record<string, any>) => any

export type Tecnology = {
  label: string
  icon: AstroElement
}

export interface Project {
  name: string
  desc: string
  images: string[]
  tecnologies: Tecnology[]
  code: string
  preview: string
}
