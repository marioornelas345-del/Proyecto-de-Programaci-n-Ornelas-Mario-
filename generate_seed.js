const fs = require('fs')

const CITIES = ['Seattle', 'Miami', 'Chicago', 'Palo Alto', 'Beverly Hills', 'Vancouver', 'Portland', 'Bend', 'Austin']
const TYPES = ['House', 'Apartment', 'Villa', 'Penthouse']
const AMENITIES = ['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'EV Charging', 'Private Gym', 'Wine Cellar', 'Ocean View', 'Gourmet Kitchen', 'Spa Bathroom', 'Home Theater']

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const generateRandomImages = (type, count) => {
  const images = []
  const keywords = {
    'House': ['house', 'living', 'kitchen', 'bedroom', 'garden'],
    'Apartment': ['apartment', 'condo', 'loft', 'city'],
    'Villa': ['villa', 'mansion', 'estate'],
    'Penthouse': ['penthouse', 'view', 'luxury']
  }
  
  const tags = keywords[type] || ['house']
  
  for (let i = 0; i < count; i++) {
    const keyword = tags[i % tags.length]
    images.push(`https://images.unsplash.com/photo-${Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&w=1600&q=80`)
  }
  return images
}

let sql = "INSERT INTO public.properties (title, description, price, address, beds, baths, sqft, images, amenities, geolocation, type, status, is_featured, is_exclusive, is_new_arrival, slug) VALUES \n"

const rows = []
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
  const images = generateRandomImages(type, 5)
  const geolocation = JSON.stringify({ lat: 37.7749 + (Math.random() - 0.5) * 0.1, lng: -122.4194 + (Math.random() - 0.5) * 0.1 })
  const slug = generateSlug(title)
  
  const escapedDescription = `Experience the pinnacle of luxury living in this stunning ${type} located in ${city}.`.replace(/'/g, "''")
  const escapedAddress = `${Math.floor(Math.random() * 900) + 100} ${city === 'Seattle' ? 'Pine St' : 'Ocean Dr'}, ${city}, USA`.replace(/'/g, "''")
  
  rows.push(`('${title}', '${escapedDescription}', ${price}, '${escapedAddress}', ${beds}, ${baths}, ${sqft}, ARRAY['${images.join("','")}'], ARRAY['${randomAmenities.join("','")}'], '${geolocation}', '${type}', '${i % 4 === 0 ? 'For Rent' : 'For Sale'}', ${i % 10 === 0}, ${i % 12 === 0}, ${i % 8 === 0}, '${slug}')`)
}

sql += rows.join(",\n") + ";"

fs.writeFileSync('supabase/seed.sql', sql)
console.log('Seed SQL generated successfully in supabase/seed.sql')
