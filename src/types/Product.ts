export type Product = {}

export type Service = {
  company_id: number
  description: string
  id: 1
  title: string
  type_id: number
  user_id: number
}

export type NewService = {
  company_id: string | number,
  title: string
  description: string
  type_id: number | string
}
