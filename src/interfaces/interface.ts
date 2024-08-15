interface Icons {
  id: number,
  title: string,
  icon: string
}

interface Slides {
  id: number,
  src: string
}

interface Projects {
  id: number,
  title: string,
  image: string,
  description: string,
  expanded: boolean
}

interface Accordions {
  id: number,
  title: string,
  content: string,
  open: boolean
}

interface ProjectsCards {
  id: number,
  fileimage: string,
  subfileimage: Array<string>,
  title: string,
  subtitle: string,
  text: string
}

export type { Icons, Slides, Projects, Accordions, ProjectsCards }
