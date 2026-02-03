export interface Venue {
    id: string;
    name: string;
    area: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    capacityMin: number;
    capacityMax: number;
    supportedOccasions: string[];
    rating: number;
    reviewCount: number;
    ambienceImages: string[];
    popularityScore: number; // 1-100
    pricePerPlate?: number;
    description: string;
    amenities: string[];
    highlights: string[];
}

export const mockVenues: Venue[] = [
    {
        id: "v1",
        name: "Golden Oak Banquet",
        area: "Vasant Vihar",
        coordinates: { lat: 28.56, lng: 77.16 },
        capacityMin: 100,
        capacityMax: 500,
        supportedOccasions: ["Wedding", "Engagement", "Corporate Event"],
        rating: 4.8,
        reviewCount: 156,
        ambienceImages: [
            "/venues/1758710432_204x158.webp",
            "/venues/1715234187_204x158.webp",
            "/venues/1710827586_204x158.webp",
            "/venues/1511267891_204x158.webp"
        ],
        popularityScore: 95,
        pricePerPlate: 1200,
        description: "A premier banquet hall located in the heart of Vasant Vihar, offering luxury and comfort for your most precious moments. Golden Oak features state-of-the-art lighting and a versatile floor plan.",
        amenities: ["Air Conditioned", "Valet Parking", "In-house Catering", "Bridal Room", "Audio/Visual Setup", "WiFi"],
        highlights: ["Award-winning interior design", "Centrally located with easy access", "Customizable multi-cuisine menu"]
    },
    {
        id: "v2",
        name: "The Grand Regal",
        area: "South Delhi",
        coordinates: { lat: 28.52, lng: 77.21 },
        capacityMin: 50,
        capacityMax: 200,
        supportedOccasions: ["Birthday", "Anniversary", "Cocktail Party"],
        rating: 4.5,
        reviewCount: 89,
        ambienceImages: [
            "/venues/v2.png",
            "/venues/1721632224_204x158.webp",
            "/venues/1735816297_204x158.webp"
        ],
        popularityScore: 82,
        pricePerPlate: 1500,
        description: "Experience royal elegance at The Grand Regal. Perfect for intimate gatherings and upscale parties, our venue provides a sophisticated atmosphere with personalized service.",
        amenities: ["Valet Parking", "Full Bar Service", "Gourmet Catering", "Live Music Stage", "Climate Control"],
        highlights: ["Sophisticated cocktail atmosphere", "Personalized event coordinator", "Premium South Delhi location"]
    },
    {
        id: "v3",
        name: "Emerald Gardens",
        area: "Gurugram",
        coordinates: { lat: 28.45, lng: 77.02 },
        capacityMin: 200,
        capacityMax: 1000,
        supportedOccasions: ["Wedding", "Concert", "Exhibition"],
        rating: 4.7,
        reviewCount: 210,
        ambienceImages: [
            "/venues/v3.png",
            "/venues/1525354039_204x158.webp",
            "/venues/1571737515_204x158.webp",
            "/venues/1693809559_204x158.webp"
        ],
        popularityScore: 98,
        pricePerPlate: 1800,
        description: "A sprawling outdoor venue in Gurugram, Emerald Gardens is ideal for grand weddings and large-scale exhibitions. Our lush green lawns provide a beautiful natural backdrop for any event.",
        amenities: ["Huge Parking Space", "Outdoor Lawn", "Luxury Tent House", "Power Backup", "Guest Suites"],
        highlights: ["10,000 sq.ft of lush green area", "Eco-friendly venue practices", "Expert decoration team"]
    },
    {
        id: "v4",
        name: "Skyloft Banquet",
        area: "Noida",
        coordinates: { lat: 28.62, lng: 77.37 },
        capacityMin: 30,
        capacityMax: 150,
        supportedOccasions: ["Birthday", "Kitty Party", "Meeting"],
        rating: 4.2,
        reviewCount: 45,
        ambienceImages: [
            "/venues/v4.png",
            "/venues/1738741823_204x158.webp"
        ],
        popularityScore: 65,
        pricePerPlate: 800,
        description: "Skyloft offers a modern, rooftop-style banquet experience with stunning views of the city skyline. It's the perfect spot for trendy birthdays and professional corporate meetings.",
        amenities: ["Rooftop View", "Modern Interiors", "Projection Screen", "In-house DJ", "Budget Friendly"],
        highlights: ["Panoramic city views", "Chic modern decor", "Highly competitive pricing"]
    },
    {
        id: "v5",
        name: "Royal Palms",
        area: "Chhatarpur",
        coordinates: { lat: 28.50, lng: 77.18 },
        capacityMin: 500,
        capacityMax: 2000,
        supportedOccasions: ["Wedding", "Grand Celebration"],
        rating: 4.9,
        reviewCount: 320,
        ambienceImages: [
            "/venues/v5.png",
            "/venues/1758710432_204x158.webp"
        ],
        popularityScore: 99,
        pricePerPlate: 2500,
        description: "The epitome of grandeur, Royal Palms in Chhatarpur is the chosen destination for the most elite weddings. Featuring massive halls and luxury amenities that cater to your every whim.",
        amenities: ["Helipad Access", "Luxury Suites", "Infinite Poolside", "Smart Lighting", "Dedicated Security"],
        highlights: ["Most prestigious venue in the region", "Used for high-profile celebrity events", "World-class catering services"]
    },
    {
        id: "v6",
        name: "The Heritage Club",
        area: "South Delhi",
        coordinates: { lat: 28.53, lng: 77.20 },
        capacityMin: 20,
        capacityMax: 80,
        supportedOccasions: ["Meeting", "Corporate Event", "Dinner"],
        rating: 4.6,
        reviewCount: 72,
        ambienceImages: [
            "/venues/v6.png"
        ],
        popularityScore: 78,
        pricePerPlate: 1100,
        description: "A boutique club venue offering a blend of traditional heritage and modern facilities. Perfect for private corporate dinners and exclusive high-level business meetings.",
        amenities: ["Fireplace Lounge", "Library Access", "Business Center", "Fine Dining", "Privacy Assured"],
        highlights: ["Historic architectural charm", "Exclusive member-only feel", "Quiet and productive environment"]
    }
];

export const occasions = [
    "Wedding",
    "Engagement",
    "Birthday",
    "Corporate Event",
    "Anniversary",
    "Cocktail Party",
    "Meeting",
    "Concert"
];
