import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Star, Wifi, Car, Coffee, Users, Bath, Bed, Home, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthHeader } from "@/components/auth-header"

// Extended mock data for property details
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "San Francisco, CA",
    price: 180,
    rating: 4.9,
    reviews: 127,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    amenities: ["Wifi", "Parking", "Kitchen", "Air Conditioning", "Washer", "TV", "Workspace"],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "Experience urban living at its finest in this stunning modern loft located in the heart of downtown San Francisco. This beautifully designed space features floor-to-ceiling windows, exposed brick walls, and contemporary furnishings that create the perfect blend of comfort and style.",
    host: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      joinedYear: 2019,
      reviews: 89,
      verified: true,
    },
    rules: ["Check-in: 3:00 PM - 10:00 PM", "Checkout: 11:00 AM", "No smoking", "No pets", "No parties or events"],
    recentReviews: [
      {
        id: 1,
        author: "Mike Chen",
        rating: 5,
        date: "2024-01-15",
        comment: "Absolutely perfect stay! The loft is exactly as pictured and Sarah was an excellent host.",
      },
      {
        id: 2,
        author: "Emma Davis",
        rating: 5,
        date: "2024-01-10",
        comment: "Great location and beautiful space. Would definitely stay here again!",
      },
    ],
  },
  // Add other properties with similar structure...
]

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wifi":
      return <Wifi className="h-5 w-5" />
    case "parking":
      return <Car className="h-5 w-5" />
    case "kitchen":
      return <Coffee className="h-5 w-5" />
    case "air conditioning":
      return <Home className="h-5 w-5" />
    case "washer":
      return <Home className="h-5 w-5" />
    case "tv":
      return <Home className="h-5 w-5" />
    case "workspace":
      return <Home className="h-5 w-5" />
    default:
      return <Home className="h-5 w-5" />
  }
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const propertyId = Number.parseInt(params.id)
  const property = mockProperties.find((p) => p.id === propertyId)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">StayScape</span>
            </div>
            <AuthHeader />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Property Title and Location */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="ml-1">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="lg:col-span-2 lg:row-span-2">
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div key={index} className="hidden lg:block">
              <img
                src={image || "/placeholder.svg"}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Host Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Meet your host</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={property.host.avatar || "/placeholder.svg"} alt={property.host.name} />
                      <AvatarFallback>
                        {property.host.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold">{property.host.name}</h4>
                        {property.host.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Host since {property.host.joinedYear}</span>
                        <span>{property.host.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <h3 className="text-xl font-semibold">
                  {property.rating} · {property.reviews} reviews
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.recentReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {review.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{review.author}</div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="ml-auto flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* House Rules */}
            <div>
              <h3 className="text-xl font-semibold mb-4">House rules</h3>
              <ul className="space-y-2">
                {property.rules.map((rule, index) => (
                  <li key={index} className="text-muted-foreground">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">${property.price}</span>
                    <span className="text-muted-foreground"> night</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Check-in</label>
                    <Input type="date" className="w-full" id="checkin" defaultValue="2024-02-15" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Check-out</label>
                    <Input type="date" className="w-full" id="checkout" defaultValue="2024-02-20" />
                  </div>
                </div>

                {/* Guest Selection */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="2 guests" className="pl-10" id="guests" defaultValue="2" />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>$180 × 5 nights</span>
                    <span>$900</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$67</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$1,017</span>
                  </div>
                </div>

                {/* Updated Reserve button to link to checkout with booking details */}
                <Button className="w-full" size="lg" asChild>
                  <Link
                    href={`/checkout?propertyId=${property.id}&checkIn=2024-02-15&checkOut=2024-02-20&guests=2&nights=5&total=1017`}
                  >
                    Reserve
                  </Link>
                </Button>

                <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
