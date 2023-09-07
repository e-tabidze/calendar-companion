export type UserInfo = {
  UserID: number
  Email: string
  UserType: number
  FirstName: string
  LastName: string
  gender_id: number
  birth_year: number
  birth_date: string
  phone: string
  information: {
    profile_pic: string
    gender: number
    birth_date: string
    identification_number: string
    driver_license_expiration: string
    verified_at: string
    created_at: string
    updated_at: string
    deleted_at: string
  }
}
