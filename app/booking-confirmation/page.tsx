"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Calendar, MapPin, Users, Download, MessageSquare, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AuthHeader } from "@/components/auth-header"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const bookingId = searchParams.get("bookingId") || "BK123456789"

  // Mock booking data (in real app, this would come from API)
  const bookingData = {
    id: bookingId,
    property: {
      title: "Modern Downtown Loft",
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300",
    },
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    guests: 2,
    nights: 5,
    total: 1017,
    host: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@example.com",
    },
    address: "123 Market Street, San Francisco, CA 94102",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div> */}
              <span className="text-xl font-bold text-foreground">StayScape</span>
            </div>
            <AuthHeader />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your reservation has been successfully processed. You'll receive a confirmation email shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Booking ID</span>
                    <Badge variant="outline">{bookingData.id}</Badge>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <img
                      src={bookingData.property.image || "/placeholder.svg"}
                      alt={bookingData.property.title}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{bookingData.property.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {bookingData.property.location}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Check-in</span>
                      </div>
                      <span className="text-sm font-medium">{bookingData.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Check-out</span>
                      </div>
                      <span className="text-sm font-medium">{bookingData.checkOut}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Guests</span>
                      </div>
                      <span className="text-sm font-medium">{bookingData.guests}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Total Paid</span>
                    <span>${bookingData.total}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Host Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Host Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">{bookingData.host.name}</h4>
                    <p className="text-sm text-muted-foreground">Your host</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Phone:</strong> {bookingData.host.phone}
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> {bookingData.host.email}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Host
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Property Info & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{bookingData.address}</p>
                  <p className="text-xs text-muted-foreground">
                    The exact address will be provided 24 hours before your check-in date.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-medium">Check your email</p>
                        <p className="text-xs text-muted-foreground">
                          We've sent you a confirmation email with all the details
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contact your host</p>
                        <p className="text-xs text-muted-foreground">Introduce yourself and ask any questions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-medium">Prepare for your trip</p>
                        <p className="text-xs text-muted-foreground">
                          Pack your bags and get ready for an amazing stay!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Confirmation
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/bookings")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Bookings
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
