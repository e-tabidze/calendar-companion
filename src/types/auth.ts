export type RegisterUser = {
  username: string
  password: string
}

export type Workspace = {
  identification_number: string
  company_type_id: number
  company_information?: {
    title?: string
  }
}
