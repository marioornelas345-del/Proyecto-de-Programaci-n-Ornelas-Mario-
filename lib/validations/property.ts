import { z } from 'zod'

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().positive('Price must be a positive number'),
  address: z.string().min(10, 'Full address is required'),
  beds: z.number().int().nonnegative().optional(),
  baths: z.number().nonnegative().optional(),
  sqft: z.number().int().positive().optional(),
  type: z.enum(['Villa', 'Penthouse', 'Mansion', 'Estate', 'Apartment', 'House']),
  status: z.enum(['For Sale', 'For Rent', 'Sold', 'Off Market']),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
  amenities: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  is_exclusive: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Invalid slug format')
})

export type PropertyFormValues = z.infer<typeof propertySchema>
