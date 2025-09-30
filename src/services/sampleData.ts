// Sample data seeder for India fish catches
import { databaseService } from './database';

export const sampleIndiaFishCatches = [
  // 31 Indian Coastal/Beach Locations Only
  {
    species: 'Pomfret',
    confidence: 94.1,
    health_score: 89.6,
    count: 1,
    estimated_weight: 1.2,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 15.4909, // Palolem Beach, Goa
    longitude: 74.0232,
    image_data: '/fish_images/angelfish_tropical_marine_001.jpg',
    is_synced: false
  },
  {
    species: 'Kingfish',
    confidence: 87.3,
    health_score: 93.1,
    count: 1,
    estimated_weight: 4.2,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 9.9674, // Fort Kochi Beach, Kerala
    longitude: 76.2428,
    image_data: '/fish_images/bass_largemouth_freshwater_002.jpg',
    is_synced: false
  },
  {
    species: 'Tuna',
    confidence: 91.2,
    health_score: 95.8,
    count: 1,
    estimated_weight: 12.5,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 11.9340, // Pondicherry Beach
    longitude: 79.8306,
    image_data: '/fish_images/bluegill_sunfish_freshwater_003.jpg',
    is_synced: false
  },
  {
    species: 'Sardine',
    confidence: 82.4,
    health_score: 87.2,
    count: 5,
    estimated_weight: 0.8,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 17.6833, // RK Beach, Visakhapatnam
    longitude: 83.2186,
    image_data: '/fish_images/carp_common_freshwater_004.jpg',
    is_synced: false
  },
  {
    species: 'Mackerel',
    confidence: 88.7,
    health_score: 90.4,
    count: 3,
    estimated_weight: 1.1,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 18.9388, // Ganpatipule Beach, Maharashtra
    longitude: 72.7794,
    image_data: '/fish_images/clownfish_anemone_marine_005.jpg',
    is_synced: false
  },
  {
    species: 'Snapper',
    confidence: 76.3,
    health_score: 85.1,
    count: 1,
    estimated_weight: 2.8,
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 8.0883, // Kanyakumari Beach
    longitude: 77.5385,
    image_data: '/fish_images/dolphinfish_mahi_marine_006.jpg',
    is_synced: false
  },
  {
    species: 'Grouper',
    confidence: 89.2,
    health_score: 91.3,
    count: 1,
    estimated_weight: 6.7,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 12.8698, // Panambur Beach, Mangalore
    longitude: 74.8270,
    image_data: '/fish_images/flounder_flatfish_marine_007.jpg',
    is_synced: false
  },
  {
    species: 'Prawn',
    confidence: 79.3,
    health_score: 84.2,
    count: 8,
    estimated_weight: 0.3,
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.7216, // Puri Beach, Odisha
    longitude: 85.8312,
    image_data: '/fish_images/goldfish_ornamental_freshwater_008.jpg',
    is_synced: false
  },
  {
    species: 'Sole Fish',
    confidence: 88.9,
    health_score: 90.7,
    count: 2,
    estimated_weight: 0.9,
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 14.8142, // Karwar Beach, Karnataka
    longitude: 74.1297,
    image_data: '/fish_images/halibut_pacific_marine_009.jpg',
    is_synced: false
  },
  {
    species: 'Anchovy',
    confidence: 75.8,
    health_score: 82.3,
    count: 12,
    estimated_weight: 0.2,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 8.7642, // Tuticorin Beach, Tamil Nadu
    longitude: 78.1348,
    image_data: '/fish_images/jack_crevalle_marine_010.jpg',
    is_synced: false
  },
  {
    species: 'Bombay Duck',
    confidence: 87.2,
    health_score: 86.4,
    count: 4,
    estimated_weight: 0.6,
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.2183, // Juhu Beach, Mumbai
    longitude: 72.8263,
    image_data: '/fish_images/koi_ornamental_freshwater_011.jpg',
    is_synced: false
  },
  {
    species: 'Indian Salmon',
    confidence: 90.7,
    health_score: 93.2,
    count: 1,
    estimated_weight: 3.4,
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 20.2614, // Diu Beach, Daman and Diu
    longitude: 70.9929,
    image_data: '/fish_images/ling_cod_marine_012.jpg',
    is_synced: false
  },
  {
    species: 'Ghol Fish',
    confidence: 94.6,
    health_score: 97.1,
    count: 1,
    estimated_weight: 15.2,
    timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 20.7143, // Daman Beach
    longitude: 72.8328,
    image_data: '/fish_images/manta_ray_marine_013.jpg',
    is_synced: false
  },
  {
    species: 'Ribbon Fish',
    confidence: 85.3,
    health_score: 88.7,
    count: 2,
    estimated_weight: 1.3,
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 16.9891, // Kakinada Beach, Andhra Pradesh
    longitude: 82.2475,
    image_data: '/fish_images/northern_pike_freshwater_014.jpg',
    is_synced: false
  },
  {
    species: 'Croaker',
    confidence: 89.1,
    health_score: 91.8,
    count: 4,
    estimated_weight: 0.5,
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 16.9902, // Ratnagiri Beach, Maharashtra
    longitude: 73.3120,
    image_data: '/fish_images/oscar_cichlid_freshwater_015.jpg',
    is_synced: false
  },
  {
    species: 'Black Pomfret',
    confidence: 91.8,
    health_score: 94.3,
    count: 1,
    estimated_weight: 1.7,
    timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 11.2588, // Kozhikode Beach, Kerala
    longitude: 75.7804,
    image_data: '/fish_images/parrotfish_tropical_marine_016.jpg',
    is_synced: false
  },
  {
    species: 'Threadfin Bream',
    confidence: 87.9,
    health_score: 90.1,
    count: 3,
    estimated_weight: 0.8,
    timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 12.0426, // Malpe Beach, Karnataka
    longitude: 74.7047,
    image_data: '/fish_images/queen_angelfish_marine_017.jpg',
    is_synced: false
  },
  {
    species: 'Mullet',
    confidence: 84.6,
    health_score: 87.3,
    count: 6,
    estimated_weight: 0.4,
    timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 22.4707, // Mandvi Beach, Gujarat
    longitude: 69.3551,
    image_data: '/fish_images/rainbow_trout_freshwater_018.jpg',
    is_synced: false
  },
  {
    species: 'Seer Fish',
    confidence: 93.4,
    health_score: 96.2,
    count: 1,
    estimated_weight: 5.8,
    timestamp: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 13.0067, // Marina Beach, Chennai
    longitude: 80.2829,
    image_data: '/fish_images/sailfish_billfish_marine_019.jpg',
    is_synced: false
  },
  {
    species: 'Barracuda',
    confidence: 88.3,
    health_score: 92.1,
    count: 1,
    estimated_weight: 3.7,
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 15.5507, // Baga Beach, Goa
    longitude: 73.7519,
    image_data: '/fish_images/tarpon_silver_marine_020.jpg',
    is_synced: false
  },
  {
    species: 'Catfish',
    confidence: 82.1,
    health_score: 85.9,
    count: 2,
    estimated_weight: 2.3,
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.1107, // Alibaug Beach, Maharashtra
    longitude: 72.8717,
    image_data: '/fish_images/unicorn_tang_marine_021.jpg',
    is_synced: false
  },
  {
    species: 'Hilsa',
    confidence: 78.9,
    health_score: 82.4,
    count: 2,
    estimated_weight: 1.5,
    timestamp: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 21.6417, // Digha Beach, West Bengal
    longitude: 87.5117,
    image_data: '/fish_images/viperfish_deep_sea_022.jpg',
    is_synced: false
  },
  {
    species: 'Pearl Spot',
    confidence: 92.1,
    health_score: 94.5,
    count: 1,
    estimated_weight: 0.7,
    timestamp: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 9.7500, // Varkala Beach, Kerala
    longitude: 76.7167,
    image_data: '/fish_images/wahoo_pelagic_marine_023.jpg',
    is_synced: false
  },
  {
    species: 'Lobster',
    confidence: 95.7,
    health_score: 97.8,
    count: 1,
    estimated_weight: 1.8,
    timestamp: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 8.4004, // Kovalam Beach, Kerala
    longitude: 76.9789,
    image_data: '/fish_images/yellowtail_amberjack_marine_024.jpg',
    is_synced: false
  },
  {
    species: 'Squid',
    confidence: 86.5,
    health_score: 89.7,
    count: 5,
    estimated_weight: 0.6,
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 11.6234, // Mahabalipuram Beach, Tamil Nadu
    longitude: 80.1926,
    image_data: '/fish_images/zebra_fish_tropical_025.jpg',
    is_synced: false
  },
  {
    species: 'Crab',
    confidence: 90.2,
    health_score: 93.4,
    count: 4,
    estimated_weight: 0.5,
    timestamp: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 15.2993, // Calangute Beach, Goa
    longitude: 73.7554,
    image_data: '/fish_images/albacore_tuna_marine_026.jpg',
    is_synced: false
  },
  {
    species: 'Red Snapper',
    confidence: 92.8,
    health_score: 95.1,
    count: 1,
    estimated_weight: 3.2,
    timestamp: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 10.9254, // Bekal Beach, Kerala
    longitude: 75.0303,
    image_data: '/fish_images/bonefish_shallow_marine_027.jpg',
    is_synced: false
  },
  {
    species: 'Octopus',
    confidence: 88.4,
    health_score: 91.2,
    count: 1,
    estimated_weight: 2.1,
    timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 15.4167, // Anjuna Beach, Goa
    longitude: 73.7400,
    image_data: '/fish_images/cobia_marine_pelagic_028.jpg',
    is_synced: false
  },
  {
    species: 'Sea Bass',
    confidence: 91.3,
    health_score: 94.6,
    count: 1,
    estimated_weight: 4.5,
    timestamp: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 21.5222, // Shankarpur Beach, West Bengal
    longitude: 87.5311,
    image_data: '/fish_images/dorado_golden_marine_029.jpg',
    is_synced: false
  },
  {
    species: 'Mahi Mahi',
    confidence: 94.2,
    health_score: 96.8,
    count: 1,
    estimated_weight: 8.3,
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 19.9975, // Marve Beach, Mumbai
    longitude: 72.7906,
    image_data: '/fish_images/emperor_fish_marine_030.jpg',
    is_synced: false
  },
  {
    species: 'Stingray',
    confidence: 89.6,
    health_score: 92.3,
    count: 1,
    estimated_weight: 12.7,
    timestamp: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 12.3996, // Karaikal Beach, Puducherry
    longitude: 79.8380,
    image_data: '/fish_images/filefish_tropical_marine_031.jpg',
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