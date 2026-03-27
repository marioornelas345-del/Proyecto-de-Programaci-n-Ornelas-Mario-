const CITIES = ['Seattle']
const TYPES = ['House']
const AMENITIES = ['A']
const generateRandomImages = (t, c) => ['img1']
const generateSlug = (t) => t.toLowerCase()

let sql = "INSERT INTO public.properties (title, description, price, address, beds, baths, sqft, images, amenities, geolocation, type, status, is_featured, is_exclusive, is_new_arrival, slug) VALUES "
const rows = []
const title = 'T'
const price = 1
const beds = 1
const baths = 1
const sqft = 1
const randomAmenities = AMENITIES
const images = generateRandomImages('House', 1)
const geolocation = JSON.stringify({lat:1, lng:1})
const slug = 'S'
rows.push(`('${title}', 'D', ${price}, 'A', ${beds}, ${baths}, ${sqft}, '{${images.join(',')}}', '{${randomAmenities.join(',')}}', '${geolocation}', 'House', 'S', false, false, false, '${slug}')`)
sql += rows.join(", ") + ";"
console.log(sql)
