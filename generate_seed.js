const fs = require('fs');

const imageIds = [
  '1600585154340-be6161a56a0c', // House
  '1512917774080-9991f1c4c750', // Modern
  '1600596542815-ffad4c1539a9', // Villa
  '1613490493576-7fde63acd811', // Stable modern interior
  '1518780664697-55e3ad937233', // Exterior
  '1480074568708-e7b720bb3f09', // Garden
  '1568605114967-8130f3a36994', // Apartment
  '1570129477492-45c003edd2be', // Living room
  '1516156008625-3a9d6067fab5', // Kitchen
  '1502672260266-1c1ef2d93688', // Bedroom
  '1512918728675-ed5a9ecdebfd'  // Pool
];

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

let imageCounter = 0;
const getImages = () => {
  const images = [];
  for (let i = 0; i < 5; i++) {
    const id = imageIds[imageCounter % imageIds.length];
    images.push(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`)
    imageCounter++;
  }
  return images;
}

const cities = ['Seattle', 'Miami', 'Chicago', 'Palo Alto', 'Beverly Hills', 'Vancouver', 'Portland', 'Bend', 'Austin'];
const types = ['House', 'Apartment', 'Villa', 'Penthouse'];

const properties = [];

for (let i = 1; i <= 35; i++) {
  const city = cities[i % cities.length];
  const type = types[i % types.length];
  const isSpecial = type === 'Penthouse' || type === 'Villa';
  const price = isSpecial ? 5000000 : 850000;
  const title = `${isSpecial ? 'Azure' : 'Elite'} ${type} ${i} in ${city}`;
  
  properties.push({
    title,
    description: `Luxury ${type} in ${city}`,
    price,
    address: `123 Luxury Way, ${city}`,
    beds: 3,
    baths: 2,
    sqft: 2500,
    images: getImages(),
    amenities: ['Pool', 'Gym'],
    geolocation: { lat: 0, lng: 0 },
    type,
    status: 'For Sale',
    is_featured: true,
    is_exclusive: true,
    is_new_arrival: true,
    slug: generateSlug(title)
  });
}

const sql = `-- Limpiar tabla
TRUNCATE public.properties CASCADE;

INSERT INTO public.properties (title, description, price, address, beds, baths, sqft, images, amenities, geolocation, type, status, is_featured, is_exclusive, is_new_arrival, slug) VALUES 
${properties.map(p => `('${p.title}', '${p.description}', ${p.price}, '${p.address}', ${p.beds}, ${p.baths}, ${p.sqft}, ARRAY[${p.images.map(img => `'${img}'`).join(',')}], ARRAY[${p.amenities.map(a => `'${a}'`).join(',')}], '${JSON.stringify(p.geolocation)}', '${p.type}', '${p.status}', ${p.is_featured}, ${p.is_exclusive}, ${p.is_new_arrival}, '${p.slug}')`).join(',\n')};`;

fs.writeFileSync('supabase/seed.sql', sql);
console.log('Seed SQL generated successfully in supabase/seed.sql');
