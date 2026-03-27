import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ACCESSTOKEN || ''

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ACCESSTOKEN')
  process.exit(1)
}

// Note: If using ACCESS_TOKEN, it might not work for direct client auth if it's a CLI token.
// Assuming we have SERVICE_ROLE_KEY in .env.local as SUPABASE_SERVICE_ROLE_KEY
// Based on previous Get-Content, I saw SUPABASE_ACCESSTOKEN.
// I'll try to use SUPABASE_SERVICE_ROLE_KEY if I can find it, otherwise try SUPABASE_ACCESSTOKEN as a fallback if it works.

const supabase = createClient(supabaseUrl, supabaseKey)

const CITIES = ['Seattle', 'Miami', 'Chicago', 'Palo Alto', 'Beverly Hills', 'Vancouver', 'Portland', 'Bend', 'Austin']
const TYPES = ['House', 'Apartment', 'Villa', 'Penthouse']
const AMENITIES = ['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'EV Charging', 'Private Gym', 'Wine Cellar', 'Ocean View', 'Gourmet Kitchen', 'Spa Bathroom', 'Home Theater']

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const generateRandomImages = (type: string, count: number) => {
  const images = []
  const keywords = {
    'House': ['modern+house', 'living+room', 'kitchen+modern', 'bedroom+luxury', 'garden'],
    'Apartment': ['apartment+interior', 'city+view', 'modern+kitchen', 'bedroom+minimal', 'balcony'],
    'Villa': ['luxury+villa', 'infinity+pool', 'outdoor+lounge', 'master+suite', 'spa'],
    'Penthouse': ['penthouse+view', 'skyline+living', 'roof+terrace', 'modern+design', 'luxury+interior']
  }
  
  const tags = keywords[type as keyof typeof keywords] || ['real+estate']
  
  for (let i = 0; i < count; i++) {
    const keyword = tags[i % tags.length]
    images.push(`https://source.unsplash.com/featured/1600x900/?${keyword}&sig=${Math.floor(Math.random() * 1000)}`)
  }
  return images
}

async function seed() {
  console.log('Seeding properties...')
  
  const properties = []
  
  for (let i = 0; i < 35; i++) {
    const city = CITIES[i % CITIES.length]
    const type = TYPES[i % TYPES.length]
    const id = i + 1
    const title = `${type === 'Penthouse' ? 'Azure' : 'Elite'} ${type} ${id} in ${city}`
    const price = type === 'Villa' || type === 'Penthouse' 
      ? Math.floor(Math.random() * 10000000) + 2000000 
      : Math.floor(Math.random() * 1500000) + 400000
    
    const beds = type === 'Penthouse' ? 3 : type === 'Villa' ? 5 : Math.floor(Math.random() * 3) + 2
    const baths = Math.floor(Math.random() * 3) + 2
    const sqft = type === 'Villa' ? Math.floor(Math.random() * 3000) + 3000 : Math.floor(Math.random() * 1500) + 800
    
    const randomAmenities = AMENITIES.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 3)
    
    properties.push({
      title,
      description: `Experience the pinnacle of luxury living in this stunning ${type} located in the most sought-after neighborhood of ${city}. Featuring modern architecture and premium finishes throughout.`,
      price,
      address: `${Math.floor(Math.random() * 900) + 100} ${city === 'Seattle' ? 'Pine St' : 'Ocean Dr'}, ${city}, USA`,
      beds,
      baths,
      sqft,
      images: generateRandomImages(type, 5),
      amenities: randomAmenities,
      geolocation: { lat: 37.7749 + (Math.random() - 0.5) * 0.1, lng: -122.4194 + (Math.random() - 0.5) * 0.1 },
      type,
      status: i % 4 === 0 ? 'For Rent' : 'For Sale',
      is_featured: i % 10 === 0,
      is_exclusive: i % 12 === 0,
      is_new_arrival: i % 8 === 0,
      slug: generateSlug(title)
    })
  }

  const { data, error } = await supabase.from('properties').insert(properties)
  
  if (error) {
    console.error('Error seeding properties:', error)
  } else {
    console.log('Successfully seeded 35 properties.')
  }
}

seed()
