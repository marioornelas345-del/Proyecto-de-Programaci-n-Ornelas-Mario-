'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema, PropertyFormValues } from '@/lib/validations/property'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { createProperty, updateProperty } from '@/app/dashboard/properties/actions'

interface PropertyFormProps {
  mode: 'create' | 'edit'
  initialData?: any
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ mode, initialData }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      price: 0,
      address: '',
      type: 'Villa',
      status: 'For Sale',
      images: [''],
      amenities: [],
      is_featured: false,
      is_exclusive: false,
      is_new_arrival: false,
      slug: ''
    }
  })

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images' as any
  })

  const title = watch('title')

  // Auto-generate slug from title
  useEffect(() => {
    if (mode === 'create' && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', generatedSlug, { shouldValidate: true })
    }
  }, [title, mode, setValue])

  const onSubmit = async (data: PropertyFormValues) => {
    setIsLoading(true)
    try {
      let result
      if (mode === 'create') {
        result = await createProperty(data)
      } else {
        result = await updateProperty(initialData.id, data)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`Property ${mode === 'create' ? 'created' : 'updated'} successfully!`)
        router.push('/dashboard')
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-24">
      {/* Section 1: Basic Information */}
      <section className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10 space-y-6">
        <h3 className="text-xl font-bold text-nordic-dark border-b border-nordic-muted/10 pb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Property Title</label>
            <input 
              {...register('title')}
              placeholder="e.g. Oceanfront Mediterranean Villa"
              className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all"
            />
            {errors.title && <p className="text-xs text-red-500 ml-1">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Slug (URL Name)</label>
            <input 
              {...register('slug')}
              className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 bg-bg-light/50 focus:border-mosque outline-none transition-all"
            />
            {errors.slug && <p className="text-xs text-red-500 ml-1">{errors.slug.message}</p>}
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Description</label>
            <textarea 
              {...register('description')}
              rows={5}
              placeholder="Describe the property's unique features, history, and appeal..."
              className="w-full p-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all resize-none"
            />
            {errors.description && <p className="text-xs text-red-500 ml-1">{errors.description.message}</p>}
          </div>
        </div>
      </section>

      {/* Section 2: Pricing & Location */}
      <section className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10 space-y-6">
        <h3 className="text-xl font-bold text-nordic-dark border-b border-nordic-muted/10 pb-4">Pricing & Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Price ($)</label>
            <input 
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all"
            />
            {errors.price && <p className="text-xs text-red-500 ml-1">{errors.price.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Full Address</label>
            <input 
              {...register('address')}
              placeholder="e.g. 123 Luxury Way, Beverly Hills, CA"
              className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all"
            />
            {errors.address && <p className="text-xs text-red-500 ml-1">{errors.address.message}</p>}
          </div>
        </div>
      </section>

      {/* Section 4: Property Details */}
      <section className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10 space-y-8">
        <h3 className="text-xl font-bold text-nordic-dark border-b border-nordic-muted/10 pb-4">Technical Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Beds</label>
            <input type="number" {...register('beds', { valueAsNumber: true })} className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Baths</label>
            <input type="number" step="0.5" {...register('baths', { valueAsNumber: true })} className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">SqFt</label>
            <input type="number" {...register('sqft', { valueAsNumber: true })} className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-nordic-dark uppercase tracking-wider ml-1">Type</label>
            <select {...register('type')} className="w-full h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all bg-white">
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Mansion">Mansion</option>
              <option value="Estate">Estate</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-nordic-muted/10">
          <Controller
            control={control}
            name="amenities"
            render={({ field }) => (
              <AmenitiesSelector 
                selected={field.value} 
                onChange={field.onChange} 
              />
            )}
          />
        </div>
      </section>

      {/* Section 4: Images */}
      <section className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10 space-y-6">
        <div className="flex justify-between items-center border-b border-nordic-muted/10 pb-4">
          <h3 className="text-xl font-bold text-nordic-dark">Gallery (Image URLs)</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendImage('')}>
            Add Image URL
          </Button>
        </div>
        <div className="space-y-4">
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-4">
              <input 
                {...register(`images.${index}` as any)}
                placeholder="https://images.unsplash.com/..."
                className="flex-grow h-12 px-4 rounded-xl border border-nordic-muted/20 focus:border-mosque outline-none transition-all"
              />
              <Button type="button" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => removeImage(index)}>
                <span className="material-icons">delete</span>
              </Button>
            </div>
          ))}
          {errors.images && <p className="text-xs text-red-500 ml-1">{errors.images.message}</p>}
        </div>
      </section>

      {/* Section 5: Publication Status */}
      <section className="bg-white p-8 rounded-2xl shadow-soft border border-nordic-muted/10 space-y-6">
        <h3 className="text-xl font-bold text-nordic-dark border-b border-nordic-muted/10 pb-4">Publication Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" {...register('is_featured')} className="w-6 h-6 rounded-lg border-nordic-muted/20 text-mosque focus:ring-mosque" />
            <span className="font-bold text-nordic-dark group-hover:text-mosque transition-colors">Featured Listing</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" {...register('is_exclusive')} className="w-6 h-6 rounded-lg border-nordic-muted/20 text-mosque focus:ring-mosque" />
            <span className="font-bold text-nordic-dark group-hover:text-mosque transition-colors">Exclusive Rights</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" {...register('is_new_arrival')} className="w-6 h-6 rounded-lg border-nordic-muted/20 text-mosque focus:ring-mosque" />
            <span className="font-bold text-nordic-dark group-hover:text-mosque transition-colors">New Arrival</span>
          </label>
        </div>
        <div className="pt-4 border-t border-nordic-muted/10">
          <label className="block text-sm font-bold text-nordic-dark uppercase tracking-wider mb-4 ml-1">Status</label>
          <div className="flex flex-wrap gap-4">
            {['For Sale', 'For Rent', 'Sold', 'Off Market'].map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value={status} {...register('status')} className="text-mosque focus:ring-mosque" />
                <span className="text-sm font-semibold text-nordic-muted">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <div className="flex gap-4 pt-10 sticky bottom-8 z-50">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="flex-grow h-16 bg-mosque text-white font-bold text-lg rounded-2xl shadow-xl shadow-mosque/30 hover:bg-opacity-95 transition-all"
        >
          {isLoading ? 'Saving Property...' : `${mode === 'create' ? 'List' : 'Update'} Elite Property`}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="px-8 h-16 rounded-2xl border-nordic-muted/20 hover:bg-white text-nordic-dark font-bold"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
