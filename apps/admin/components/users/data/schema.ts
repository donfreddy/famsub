import {z} from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('suspended'),
  z.literal('deactivated'),
  z.literal('banned'),
  z.literal('deleted'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('super_admin'),
  z.literal('admin'),
  z.literal('user'),
])

const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  profilePicture: z.string().url(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
// export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)

export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  provider: string
  provider_id: string | null
  contact_number: string
  gender: 'Male' | 'Female' | 'Other'
  role: 'super_admin' | 'admin' | 'user' // Extend with other roles if needed
  email_verified: boolean
  avatar: string
  country: string
  score: number
  pin_code: string | null
  birthdate: string // Can be `Date` if parsing as a Date object
  status: 'active' | 'inactive' | 'suspended' | 'deactivated' | 'banned' | 'deleted'
  banned_reason: string | null
  created_at: string // Can be `Date` if parsing as a Date object
}
