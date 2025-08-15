import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Wifi, Car, Coffee, Waves } from "lucide-react"

// Mock data for available rooms/lets
const availableRooms = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Downtown, City Center",
    price: 85,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["WiFi", "Kitchen", "Parking"],
    type: "Studio",
  },
  {
    id: 2,
    title: "Cozy 2-Bedroom Flat",
    location: "Residential Area, Quiet Street",
    price: 120,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["WiFi", "Balcony", "Pet Friendly"],
    type: "2-Bedroom",
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Uptown, Premium District",
    price: 250,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["WiFi", "Pool", "Gym", "Concierge"],
    type: "Penthouse",
  },
  {
    id: 4,
    title: "Charming Garden Cottage",
    location: "Suburbs, Green Area",
    price: 95,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["WiFi", "Garden", "Parking"],
    type: "Cottage",
  },
  {
    id: 5,
    title: "Spacious Family Home",
    location: "Family Neighborhood",
    price: 180,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["WiFi", "Backyard", "Parking", "Kitchen"],
    type: "House",
  },
  {
    id: 6,
    title: "Beachfront Apartment",
    location: "Coastal Area, Ocean View",
    price: 160,
    rating: 4.9,
    reviews: 91,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["WiFi", "Beach Access", "Balcony"],
    type: "Apartment",
  },
]

const amenityIcons = {
  WiFi: Wifi,
  Kitchen: Coffee,
  Parking: Car,
  Pool: Waves,
  "Beach Access": Waves,
  Balcony: Coffee,
  Garden: Coffee,
  Backyard: Coffee,
  Gym: Coffee,
  Concierge: Coffee,
  "Pet Friendly": Coffee,
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">StayScape</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Browse
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Host
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            </nav>
            <AuthHeader />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Discover amazing rooms and lets in your desired location. From cozy studios to luxury penthouses.
          </p>

          {/* Mobile-First Search Bar */}
          <div className="max-w-4xl mx-auto">
            {/* Mobile Search (stacked vertically) */}
            <div className="md:hidden bg-white rounded-2xl shadow-lg p-4 space-y-3">
              <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <Input 
                  placeholder="Where are you going?" 
                  className="border-0 focus-visible:ring-0 bg-transparent p-0 text-base"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <label className="text-xs text-gray-500 block mb-1">Check-in</label>
                  <Input 
                    type="date" 
                    className="border-0 focus-visible:ring-0 bg-transparent p-0 text-sm"
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <label className="text-xs text-gray-500 block mb-1">Check-out</label>
                  <Input 
                    type="date" 
                    className="border-0 focus-visible:ring-0 bg-transparent p-0 text-sm"
                  />
                </div>
              </div>
              <Button className="w-full rounded-lg py-3">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Desktop Search (horizontal layout) */}
            <div className="hidden md:flex bg-white rounded-full shadow-lg p-2 gap-2">
              <div className="flex-1 flex items-center px-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <Input placeholder="Where are you going?" className="border-0 focus-visible:ring-0 text-lg" />
              </div>
              <div className="flex-1 flex items-center px-4 border-l border-gray-200">
                <Input type="date" className="border-0 focus-visible:ring-0 text-lg" />
              </div>
              <div className="flex-1 flex items-center px-4 border-l border-gray-200">
                <Input type="date" className="border-0 focus-visible:ring-0 text-lg" />
              </div>
              <Button size="lg" className="rounded-full px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Rooms Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Available Rooms & Lets</h2>
              <p className="text-gray-600">Choose from our selection of verified properties</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="md:text-base">Filter</Button>
              <Button variant="outline" size="sm" className="md:text-base">Sort</Button>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {availableRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={room.image || "/placeholder.svg"} alt={room.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">{room.type}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 pr-2">{room.title}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{room.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{room.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities.slice(0, 3).map((amenity) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          <IconComponent className="h-3 w-3" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-gray-900">${room.price}</span>
                      <span className="text-gray-600 text-sm">/night</span>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>

                  <div className="text-xs text-gray-500 mt-1">{room.reviews} reviews</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8 md:mt-12">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Load More Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


// import { AuthHeader } from "@/components/auth-header"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Search, MapPin, Star, Wifi, Car, Coffee, Waves } from "lucide-react"

// // Mock data for available rooms/lets
// const availableRooms = [
//   {
//     id: 1,
//     title: "Modern Studio Apartment",
//     location: "Downtown, City Center",
//     price: 85,
//     rating: 4.8,
//     reviews: 124,
//     image: "/placeholder.svg?height=200&width=300",
//     amenities: ["WiFi", "Kitchen", "Parking"],
//     type: "Studio",
//   },
//   {
//     id: 2,
//     title: "Cozy 2-Bedroom Flat",
//     location: "Residential Area, Quiet Street",
//     price: 120,
//     rating: 4.9,
//     reviews: 89,
//     image: "/placeholder.svg?height=200&width=300",
//     amenities: ["WiFi", "Balcony", "Pet Friendly"],
//     type: "2-Bedroom",
//   },
//   {
//     id: 3,
//     title: "Luxury Penthouse Suite",
//     location: "Uptown, Premium District",
//     price: 250,
//     rating: 4.7,
//     reviews: 67,
//     image: "/placeholder.svg?height=200&width=300",
//     amenities: ["WiFi", "Pool", "Gym", "Concierge"],
//     type: "Penthouse",
//   },
//   {
//     id: 4,
//     title: "Charming Garden Cottage",
//     location: "Suburbs, Green Area",
//     price: 95,
//     rating: 4.6,
//     reviews: 156,
//     image: "/placeholder.svg?height=200&width=300",
//     amenities: ["WiFi", "Garden", "Parking"],
//     type: "Cottage",
//   },
//   {
//     id: 5,
//     title: "Spacious Family Home",
//     location: "Family Neighborhood",
//     price: 180,
//     rating: 4.8,
//     reviews: 203,
//     image: "/placeholder.svg?height=200&width=300",
//     amenities: ["WiFi", "Backyard", "Parking", "Kitchen"],
//     type: "House",
//   },
//   {
//     id: 6,
//     title: "Beachfront Apartment",
//     location: "Coastal Area, Ocean View",
//     price: 160,
//     rating: 4.9,
//     reviews: 91,
//     image: "/placeholder.svg?height=200&width=300",
//     amenities: ["WiFi", "Beach Access", "Balcony"],
//     type: "Apartment",
//   },
// ]

// const amenityIcons = {
//   WiFi: Wifi,
//   Kitchen: Coffee,
//   Parking: Car,
//   Pool: Waves,
//   "Beach Access": Waves,
//   Balcony: Coffee,
//   Garden: Coffee,
//   Backyard: Coffee,
//   Gym: Coffee,
//   Concierge: Coffee,
//   "Pet Friendly": Coffee,
// }

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               {/* <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-sm">S</span>
//               </div> */}
//               <span className="text-xl font-bold text-foreground">StayScape</span>
//             </div>
//             <nav className="hidden md:flex items-center space-x-6">
//               <a href="#" className="text-foreground hover:text-primary transition-colors">
//                 Browse
//               </a>
//               <a href="#" className="text-foreground hover:text-primary transition-colors">
//                 Host
//               </a>
//               <a href="#" className="text-foreground hover:text-primary transition-colors">
//                 About
//               </a>
//             </nav>
//             <AuthHeader />
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Find Your Perfect Stay</h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Discover amazing rooms and lets in your desired location. From cozy studios to luxury penthouses.
//           </p>

//           {/* Search Bar */}
//           <div className="max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row gap-2">
//             <div className="flex-1 flex items-center px-4">
//               <MapPin className="h-5 w-5 text-gray-400 mr-2" />
//               <Input placeholder="Where are you going?" className="border-0 focus-visible:ring-0 text-lg" />
//             </div>
//             <div className="flex-1 flex items-center px-4 border-l border-gray-200">
//               <Input type="date" className="border-0 focus-visible:ring-0 text-lg" />
//             </div>
//             <div className="flex-1 flex items-center px-4 border-l border-gray-200">
//               <Input type="date" className="border-0 focus-visible:ring-0 text-lg" />
//             </div>
//             <Button size="lg" className="rounded-full px-8">
//               <Search className="h-5 w-5 mr-2" />
//               Search
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Available Rooms Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Rooms & Lets</h2>
//               <p className="text-gray-600">Choose from our selection of verified properties</p>
//             </div>
//             <div className="flex gap-2">
//               <Button variant="outline">Filter</Button>
//               <Button variant="outline">Sort</Button>
//             </div>
//           </div>

//           {/* Property Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {availableRooms.map((room) => (
//               <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
//                 <div className="relative">
//                   <img src={room.image || "/placeholder.svg"} alt={room.title} className="w-full h-48 object-cover" />
//                   <Badge className="absolute top-3 left-3 bg-white text-gray-900">{room.type}</Badge>
//                 </div>
//                 <CardContent className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{room.title}</h3>
//                     <div className="flex items-center gap-1">
//                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-medium">{room.rating}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center text-gray-600 mb-3">
//                     <MapPin className="h-4 w-4 mr-1" />
//                     <span className="text-sm">{room.location}</span>
//                   </div>

//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {room.amenities.slice(0, 3).map((amenity) => {
//                       const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee
//                       return (
//                         <div
//                           key={amenity}
//                           className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
//                         >
//                           <IconComponent className="h-3 w-3" />
//                           {amenity}
//                         </div>
//                       )
//                     })}
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="text-2xl font-bold text-gray-900">${room.price}</span>
//                       <span className="text-gray-600 text-sm">/night</span>
//                     </div>
//                     <Button size="sm">View Details</Button>
//                   </div>

//                   <div className="text-xs text-gray-500 mt-1">{room.reviews} reviews</div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Load More Button */}
//           <div className="text-center mt-12">
//             <Button variant="outline" size="lg">
//               Load More Properties
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
