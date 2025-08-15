"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Lock, Shield, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthHeader } from "@/components/auth-header"
import { useAuth } from "@/lib/auth-context"

// Mock property data (in real app, this would come from API)
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "San Francisco, CA",
    price: 180,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })

  // Get booking details from URL params
  const propertyId = searchParams.get("propertyId") || "1"
  const checkIn = searchParams.get("checkIn") || "2024-02-15"
  const checkOut = searchParams.get("checkOut") || "2024-02-20"
  const guests = searchParams.get("guests") || "2"
  const nights = searchParams.get("nights") || "5"
  const total = searchParams.get("total") || "1017"

  const property = mockProperties.find((p) => p.id === Number.parseInt(propertyId))

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login")
  //   }
  // }, [user, router])

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock payment processing
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to confirmation page
      router.push(`/booking-confirmation?bookingId=BK${Date.now()}`)
    }, 2000)
  }

  if (!property) {
    return <div>Property not found</div>
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
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to property
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Complete your booking</h1>
                <p className="text-muted-foreground">You're just one step away from your perfect stay</p>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        placeholder="123 Main Street"
                        value={paymentData.billingAddress}
                        onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="San Francisco"
                          value={paymentData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="94102"
                          value={paymentData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="United States"
                        value={paymentData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Complete Booking - ${total}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Property Info */}
                  <div className="flex gap-4">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{property.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Booking Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Check-in</span>
                      </div>
                      <span className="text-sm font-medium">{checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Check-out</span>
                      </div>
                      <span className="text-sm font-medium">{checkOut}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Guests</span>
                      </div>
                      <span className="text-sm font-medium">{guests}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">
                        ${property.price} × {nights} nights
                      </span>
                      <span className="text-sm">${property.price * Number.parseInt(nights)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cleaning fee</span>
                      <span className="text-sm">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Service fee</span>
                      <span className="text-sm">$67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Taxes</span>
                      <span className="text-sm">$0</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <strong>Cancellation policy:</strong> Free cancellation until 24 hours before check-in. After that,
                    cancel before check-in and get a 50% refund, minus service fees.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
