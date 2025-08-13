"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  MapPin,
  Star,
  MessageSquare,
  Download,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthHeader } from "@/components/auth-header"
import { useAuth } from "@/lib/auth-context"

// Mock booking data
const mockBookings = [
  {
    id: "BK123456789",
    property: {
      id: 1,
      title: "Modern Downtown Loft",
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
    },
    host: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
      email: "sarah@example.com",
    },
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    guests: 2,
    nights: 5,
    total: 1017,
    status: "confirmed",
    bookingDate: "2024-01-20",
    address: "123 Market Street, San Francisco, CA 94102",
  },
  {
    id: "BK987654321",
    property: {
      id: 2,
      title: "Cozy Beach House",
      location: "Malibu, CA",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
    },
    host: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 987-6543",
      email: "mike@example.com",
    },
    checkIn: "2024-01-10",
    checkOut: "2024-01-15",
    guests: 4,
    nights: 5,
    total: 1600,
    status: "completed",
    bookingDate: "2023-12-15",
    address: "456 Ocean Drive, Malibu, CA 90265",
  },
  {
    id: "BK456789123",
    property: {
      id: 3,
      title: "Mountain Cabin Retreat",
      location: "Aspen, CO",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
    },
    host: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 456-7890",
      email: "emma@example.com",
    },
    checkIn: "2024-03-01",
    checkOut: "2024-03-07",
    guests: 6,
    nights: 6,
    total: 1500,
    status: "pending",
    bookingDate: "2024-01-25",
    address: "789 Mountain View, Aspen, CO 81611",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "completed":
      return <CheckCircle className="h-4 w-4 text-blue-600" />
    case "cancelled":
      return <X className="h-4 w-4 text-red-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "default"
    case "pending":
      return "secondary"
    case "completed":
      return "outline"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

export default function BookingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Filter bookings by status
  const upcomingBookings = mockBookings.filter(
    (booking) => booking.status === "confirmed" || booking.status === "pending",
  )
  const pastBookings = mockBookings.filter((booking) => booking.status === "completed")
  const cancelledBookings = mockBookings.filter((booking) => booking.status === "cancelled")

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Bookings</h1>
            <p className="text-muted-foreground">Manage your reservations and travel plans</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Past ({pastBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming" className="space-y-6">
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Ready for your next adventure? Explore amazing properties and book your perfect stay.
                    </p>
                    <Button onClick={() => router.push("/")}>Browse Properties</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                          {/* Property Image */}
                          <div className="lg:col-span-1">
                            <img
                              src={booking.property.image || "/placeholder.svg"}
                              alt={booking.property.title}
                              className="w-full h-48 lg:h-32 object-cover rounded-lg"
                            />
                          </div>

                          {/* Booking Details */}
                          <div className="lg:col-span-2 space-y-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{booking.property.title}</h3>
                                {getStatusIcon(booking.status)}
                                <Badge variant={getStatusColor(booking.status) as any}>{booking.status}</Badge>
                              </div>
                              <div className="flex items-center text-muted-foreground mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{booking.property.location}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                                <span className="text-sm">{booking.property.rating}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Check-in</p>
                                <p className="font-medium">{booking.checkIn}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Check-out</p>
                                <p className="font-medium">{booking.checkOut}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Guests</p>
                                <p className="font-medium">{booking.guests}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Total</p>
                                <p className="font-medium">${booking.total}</p>
                              </div>
                            </div>

                            {/* Host Info */}
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={booking.host.avatar || "/placeholder.svg"} alt={booking.host.name} />
                                <AvatarFallback>
                                  {booking.host.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{booking.host.name}</p>
                                <p className="text-xs text-muted-foreground">Your host</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Mail className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="lg:col-span-1 flex flex-col gap-2">
                            <Button variant="outline" className="w-full bg-transparent">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message Host
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              View Details
                            </Button>
                            {booking.status === "confirmed" && (
                              <Button variant="destructive" className="w-full">
                                Cancel Booking
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past" className="space-y-6">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                    <p className="text-muted-foreground text-center">Your completed stays will appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                          {/* Property Image */}
                          <div className="lg:col-span-1">
                            <img
                              src={booking.property.image || "/placeholder.svg"}
                              alt={booking.property.title}
                              className="w-full h-48 lg:h-32 object-cover rounded-lg"
                            />
                          </div>

                          {/* Booking Details */}
                          <div className="lg:col-span-2 space-y-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{booking.property.title}</h3>
                                {getStatusIcon(booking.status)}
                                <Badge variant={getStatusColor(booking.status) as any}>{booking.status}</Badge>
                              </div>
                              <div className="flex items-center text-muted-foreground mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{booking.property.location}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                                <span className="text-sm">{booking.property.rating}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Check-in</p>
                                <p className="font-medium">{booking.checkIn}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Check-out</p>
                                <p className="font-medium">{booking.checkOut}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Guests</p>
                                <p className="font-medium">{booking.guests}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Total</p>
                                <p className="font-medium">${booking.total}</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="lg:col-span-1 flex flex-col gap-2">
                            <Button variant="outline" className="w-full bg-transparent">
                              <Download className="mr-2 h-4 w-4" />
                              Download Receipt
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              <Star className="mr-2 h-4 w-4" />
                              Write Review
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Cancelled Bookings */}
            <TabsContent value="cancelled" className="space-y-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <X className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No cancelled bookings</h3>
                  <p className="text-muted-foreground text-center">Your cancelled reservations will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
