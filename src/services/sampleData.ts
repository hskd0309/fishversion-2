// Sample data seeder for India fish catches
import { databaseService } from './database';

export const sampleIndiaFishCatches = [
  // Mumbai Coastal Area
  {
    species: 'Rohu (Labeo rohita)',
    confidence: 92.5,
    health_score: 88.3,
    count: 1,
    estimated_weight: 2.3,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.0176, // Mumbai Coast
    longitude: 72.8562,
    image_data: '/fish/rohu.jpg',
    is_synced: false
  },
  // Chennai Coast (Catla removed from sample)
  // Kolkata - Hooghly River
  {
    species: 'Hilsa (Tenualosa ilisha)',
    confidence: 78.9,
    health_score: 82.4,
    count: 2,
    estimated_weight: 1.5,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 22.5726, // Kolkata - Hooghly River
    longitude: 88.3639,
    image_data: '/fish/hilsa.jpg',
    is_synced: false
  },
  // Goa Coast
  {
    species: 'Pomfret (Pampus argenteus)',
    confidence: 94.1,
    health_score: 89.6,
    count: 1,
    estimated_weight: 1.2,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 15.2993, // Goa Coast
    longitude: 74.1240,
    image_data: '/fish/pomfret.jpg',
    is_synced: false
  },
  // Kochi Coast
  {
    species: 'Kingfish (Scomberomorus commerson)',
    confidence: 87.3,
    health_score: 93.1,
    count: 1,
    estimated_weight: 4.2,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 9.9312, // Kochi Coast
    longitude: 76.2673,
  image_data: '/fish/kingfish.jpg',
    is_synced: false
  },
  // More catches across India's water bodies
  {
    species: 'Tuna (Thunnus albacares)',
    confidence: 91.2,
    health_score: 95.8,
    count: 1,
    estimated_weight: 12.5,
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 11.1271, // Puducherry Coast
    longitude: 79.8083,
  image_data: '/fish/tuna.jpg',
    is_synced: false
  },
  {
    species: 'Sardine (Sardinella longiceps)',
    confidence: 82.4,
    health_score: 87.2,
    count: 5,
    estimated_weight: 0.8,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 17.6868, // Visakhapatnam Coast
    longitude: 83.2185,
  image_data: '/fish/sardine.jpg',
    is_synced: false
  },
  {
    species: 'Mackerel (Rastrelliger kanagurta)',
    confidence: 88.7,
    health_score: 90.4,
    count: 3,
    estimated_weight: 1.1,
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.2183, // Thane Creek, Mumbai
    longitude: 72.9781,
  image_data: '/fish/mackerel.jpg',
    is_synced: false
  },
  {
    species: 'Snapper (Lutjanus argentimaculatus)',
    confidence: 76.3,
    health_score: 85.1,
    count: 1,
    estimated_weight: 2.8,
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 8.5241, // Kanyakumari Coast
    longitude: 77.9519,
  image_data: '/fish/snapper.jpg',
    is_synced: false
  },
  {
    species: 'Barramundi (Lates calcarifer)',
    confidence: 90.5,
    health_score: 92.7,
    count: 1,
    estimated_weight: 5.2,
    timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 22.2587, // Kolkata Port
    longitude: 88.3269,
  image_data: '/fish/barramundi.jpg',
    is_synced: false
  },
  // Godavari River
  {
    species: 'Carp (Cyprinus carpio)',
    confidence: 84.1,
    health_score: 88.9,
    count: 2,
    estimated_weight: 2.1,
    timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 16.2160, // Godavari River
    longitude: 81.8040,
  image_data: '/fish/carp.jpg',
    is_synced: false
  },
  // Mangalore Coast
  {
    species: 'Grouper (Epinephelus malabaricus)',
    confidence: 89.2,
    health_score: 91.3,
    count: 1,
    estimated_weight: 6.7,
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 12.9141, // Mangalore Coast
    longitude: 74.8560,
  image_data: '/fish/grouper.jpg',
    is_synced: false
  },
  // Dal Lake, Kashmir
  {
    species: 'Trout (Oncorhynchus mykiss)',
    confidence: 93.8,
    health_score: 96.2,
    count: 1,
    estimated_weight: 1.8,
    timestamp: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 34.1688, // Dal Lake, Kashmir
    longitude: 74.8619,
  image_data: '/fish/trout.jpg',
    is_synced: false
  },
  // Narmada River
  {
    species: 'Mahseer (Tor putitora)',
    confidence: 81.4,
    health_score: 87.6,
    count: 1,
    estimated_weight: 8.3,
    timestamp: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 22.7196, // Narmada River
    longitude: 75.8577,
  image_data: '/fish/mahseer.jpg',
    is_synced: false
  },
  // Sundarbans
  {
    species: 'Tilapia (Oreochromis niloticus)',
    confidence: 86.7,
    health_score: 89.1,
    count: 3,
    estimated_weight: 1.4,
    timestamp: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 21.9497, // Sundarbans
    longitude: 88.9468,
  image_data: '/fish/tilapia.jpg',
    is_synced: false
  },
  // Bhubaneswar - Chilika Lake
  {
    species: 'Prawn (Penaeus monodon)',
    confidence: 79.3,
    health_score: 84.2,
    count: 8,
    estimated_weight: 0.3,
    timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.9067, // Chilika Lake
    longitude: 85.3206,
  image_data: '/fish/prawn.jpg',
    is_synced: false
  },
  // Karwar Coast
  {
    species: 'Sole Fish (Cynoglossus lingua)',
    confidence: 88.9,
    health_score: 90.7,
    count: 2,
    estimated_weight: 0.9,
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 14.8142, // Karwar Coast
    longitude: 74.1297,
  image_data: '/fish/sole.jpg',
    is_synced: false
  },
  // Alappuzha Backwaters
  {
    species: 'Pearl Spot (Etroplus suratensis)',
    confidence: 92.1,
    health_score: 94.5,
    count: 1,
    estimated_weight: 0.7,
    timestamp: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 9.4981, // Alappuzha Backwaters
    longitude: 76.3388,
  image_data: '/fish/pearlspot.jpg',
    is_synced: false
  },
  // Tuticorin Coast
  {
    species: 'Anchovy (Stolephorus commersonnii)',
    confidence: 75.8,
    health_score: 82.3,
    count: 12,
    estimated_weight: 0.2,
    timestamp: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 8.8047, // Tuticorin Coast
    longitude: 78.1548,
  image_data: '/fish/anchovy.jpg',
    is_synced: false
  },
  // Yamuna River, Delhi
  {
    species: 'Walking Catfish (Clarias batrachus)',
    confidence: 83.6,
    health_score: 78.9,
    count: 1,
    estimated_weight: 1.6,
    timestamp: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 28.6692, // Yamuna River, Delhi
    longitude: 77.4538,
  image_data: '/fish/catfish.jpg',
    is_synced: false
  },
  // More coastal and water body locations...
  {
    species: 'Bombay Duck (Harpadon nehereus)',
    confidence: 87.2,
    health_score: 86.4,
    count: 4,
    estimated_weight: 0.6,
    timestamp: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.9975, // Vasai Creek, Mumbai
    longitude: 72.8081,
  image_data: '/fish/bombayduck.jpg',
    is_synced: false
  },
  {
    species: 'Indian Salmon (Eleutheronema tetradactylum)',
    confidence: 90.7,
    health_score: 93.2,
    count: 1,
    estimated_weight: 3.4,
    timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 21.7679, // Paradip Port, Odisha
    longitude: 86.6293,
  image_data: '/fish/indiansalmon.jpg',
    is_synced: false
  },
  // Continued expansion - 30 more catches
  {
    species: 'Ghol Fish (Protonibea diacanthus)',
    confidence: 94.6,
    health_score: 97.1,
    count: 1,
    estimated_weight: 15.2,
    timestamp: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 20.9517, // Daman Coast
    longitude: 72.8397,
  image_data: '/fish/ghol.jpg',
    is_synced: false
  },
  {
    species: 'Ribbon Fish (Trichiurus lepturus)',
    confidence: 85.3,
    health_score: 88.7,
    count: 2,
    estimated_weight: 1.3,
    timestamp: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 16.5062, // Kakinada Coast
    longitude: 82.2396,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYzRiNWZkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJpYmJvbjwvdGV4dD48L3N2Zz4=',
    is_synced: false
  },
  {
    species: 'Croaker (Johnius belangerii)',
    confidence: 89.1,
    health_score: 91.8,
    count: 4,
    estimated_weight: 0.5,
    timestamp: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 18.9388, // Ratnagiri Coast
    longitude: 72.7794,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmRkNGVkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNyb2FrZXI8L3RleHQ+PC9zdmc+',
    is_synced: false
  },
  {
    species: 'Silver Carp (Hypophthalmichthys molitrix)',
    confidence: 83.7,
    health_score: 86.2,
    count: 1,
    estimated_weight: 3.1,
    timestamp: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 25.5941, // Ganga River, Patna
    longitude: 85.1376,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbHZlciBDYXJwPC90ZXh0Pjwvc3ZnPg==',
    is_synced: false
  },
  {
    species: 'Black Pomfret (Parastromateus niger)',
    confidence: 91.8,
    health_score: 94.3,
    count: 1,
    estimated_weight: 1.7,
    timestamp: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 10.7905, // Calicut Coast
    longitude: 75.7781,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsYWNrIFBvbWZyZXQ8L3RleHQ+PC9zdmc+',
    is_synced: false
  },
  {
    species: 'Eel (Anguilla bicolor)',
    confidence: 78.2,
    health_score: 81.5,
    count: 1,
    estimated_weight: 0.9,
    timestamp: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 26.9124, // Brahmaputra River
    longitude: 94.5665,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNmI3Mjg5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVlbDwvdGV4dD48L3N2Zz4=',
    is_synced: false
  },
  {
    species: 'Threadfin Bream (Nemipterus japonicus)',
    confidence: 87.9,
    health_score: 90.1,
    count: 3,
    estimated_weight: 0.8,
    timestamp: new Date(Date.now() - 54 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 15.8281, // Karwar Deep Sea
    longitude: 74.1240,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRocmVhZGZpbjwvdGV4dD48L3N2Zz4=',
    is_synced: false
  },
  {
    species: 'Shark (Carcharhinus limbatus)',
    confidence: 96.4,
    health_score: 98.7,
    count: 1,
    estimated_weight: 25.8,
    timestamp: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 8.0883, // Cape Comorin Deep Sea
    longitude: 77.5385,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM3Mzg0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNoYXJrPC90ZXh0Pjwvc3ZnPg==',
    is_synced: false
  },
  {
    species: 'Mullet (Mugil cephalus)',
    confidence: 84.6,
    health_score: 87.3,
    count: 6,
    estimated_weight: 0.4,
    timestamp: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 23.0225, // Kutch Coast, Gujarat
    longitude: 70.2020,
    image_data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNzQ5YzUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk11bGxldDwvdGV4dD48L3N2Zz4=',
    is_synced: false
  }
];

export async function seedSampleData() {
  try {
    await databaseService.initialize();
    
    // Check if data already exists
    const existingCatches = await databaseService.getAllCatches();
    if (existingCatches.length > 0) {
      console.log('Sample data already exists');
      return;
    }

    // Add sample catches
    for (const catchData of sampleIndiaFishCatches) {
      await databaseService.addCatch(catchData);
    }

    console.log('Sample India fish catches seeded successfully');
  } catch (error) {
    console.warn('Could not seed sample data:', error);
  }
}