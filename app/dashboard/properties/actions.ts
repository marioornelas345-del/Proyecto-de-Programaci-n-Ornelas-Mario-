'use server'

import { supabase } from '@/lib/supabase'
import { propertySchema, PropertyFormValues } from '@/lib/validations/property'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProperty(data: PropertyFormValues) {
  // Validate data on the server side
  const validatedFields = propertySchema.safeParse(data)
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your data.' }
  }

  const { error } = await supabase
    .from('properties')
    .insert([validatedFields.data])

  if (error) {
    console.error('Error creating property:', error)
    return { error: 'Database error: Failed to create property.' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/search')
  revalidatePath('/')
  
  return { success: true }
}

export async function updateProperty(id: string, data: PropertyFormValues) {
  // Validate data on the server side
  const validatedFields = propertySchema.safeParse(data)
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your data.' }
  }

  const { error } = await supabase
    .from('properties')
    .update(validatedFields.data)
    .eq('id', id)

  if (error) {
    console.error('Error updating property:', error)
    return { error: 'Database error: Failed to update property.' }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/property/${validatedFields.data.slug}`)
  revalidatePath('/search')
  revalidatePath('/')

  return { success: true }
}
