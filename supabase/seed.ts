import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ACCESSTOKEN || ''

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ACCESSTOKEN')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const CITIES = ['Seattle', 'Miami', 'Chicago', 'Palo Alto', 'Beverly Hills', 'Vancouver', 'Portland', 'Bend', 'Austin']
const TYPES = ['House', 'Apartment', 'Villa', 'Penthouse']
const AMENITIES = ['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'EV Charging', 'Private Gym', 'Wine Cellar', 'Ocean View', 'Gourmet Kitchen', 'Spa Bathroom', 'Home Theater']

// Curated list of valid luxury real estate Unsplash IDs
const VALID_IMAGE_IDS = [
  '1600585154340-be6199f7d009',
  '1600596542815-ffad4c1539a9',
  '1600607687940-4e524cb35a3a',
  '1600566753376-12c8ab7fb75b',
  '1600585154542-6331f93910b6',
  '1600047500192-f040d720f402',
  '1600573472591-ee6b68dc3322',
  '1600210492486-724fe5c67fb0',
  '1600566752355-3579af9545ad',
  '1600585154591-810c14f7d3a5',
  '1600566753191-3d63bd55884e',
  '1600607687644-c7171b42397f',
  '1600607688968-32a313d5e114',
  '1600607687946-b93d22fc3abb',
  '1600585154363-5181391ce6ff',
  '1613490493576-7fde63acd811',
  '1512917774080-9991f1c4c750',
  '1580587771525-78b9ec3bca1b',
  '1518780664697-55e3ad937233',
  '1564013467402-d5e2e17ea53a'
];

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

let imageCounter = 0;
const generateRandomImages = (count: number) => {
  const images = []
  for (let i = 0; i < count; i++) {
    const id = VALID_IMAGE_IDS[imageCounter % VALID_IMAGE_IDS.length];
    imageCounter++;
    images.push(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`)
  }
  return images
}

async function seed() {
  console.log('Cleaning existing properties...')
  const { error: deleteError } = await supabase.from('properties').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteError) {
    console.error('Error cleaning properties:', deleteError)
    return
  }

  console.log('Seeding properties with valid images...')
  
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
    
    const randomAmenities = [...AMENITIES].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 3)
    
    properties.push({
      title,
      description: `Experience the pinnacle of luxury living in this stunning ${type} located in the most sought-after neighborhood of ${city}. Featuring modern architecture and premium finishes throughout.`,
      price,
      address: `${Math.floor(Math.random() * 900) + 100} ${city === 'Seattle' ? 'Pine St' : 'Ocean Dr'}, ${city}, USA`,
      beds,
      baths,
      sqft,
      images: generateRandomImages(5),
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
    console.log('Successfully seeded 35 properties with valid Unsplash images.')
  }
}

seed()
