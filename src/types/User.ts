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

export type UpdateUserInfo = {
  gender: number,
  "id": 1,
  "user_id": 4111619,
  "type_id": 1,
  "profile_pic": "https://static.my.ge/users/profile/4111619.jpg?v=1",
  "birth_date": "1998-11-17",
  "identification_number": 11111111111,
  "driver_license_expiration": "2024-05-05",
  "verified_at": "2023-08-15 17:16:00",
  "created_at": null,
  "updated_at": "2023-09-03T16:02:54.000000Z",
  "deleted_at": null
}