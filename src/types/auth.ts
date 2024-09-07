export type AuthUser = {
  username: string
  password: string
}

export type Workspace = {
  title: string
  Workspace_type_id: number
  workspace_information?: {
    title?: string
  }
}
