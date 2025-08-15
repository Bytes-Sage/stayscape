"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  Plus,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthHeader } from "@/components/auth-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createRoom } from '../apis/endpoints'
import Cookies from "js-cookie"

// Mock data for dashboard
const mockStats = {
  totalRevenue: 12450,
  totalBookings: 34,
  occupancyRate: 78,
  averageRating: 4.8,
}

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "San Francisco, CA",
    status: "active",
    bookings: 12,
    revenue: 4200,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Cozy Beach House",
    location: "Malibu, CA",
    status: "active",
    bookings: 8,
    revenue: 3200,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    status: "inactive",
    bookings: 14,
    revenue: 5050,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const mockBookings = [
  {
    id: 1,
    guest: "John Smith",
    property: "Modern Downtown Loft",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    status: "confirmed",
    total: 900,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    guest: "Sarah Johnson",
    property: "Cozy Beach House",
    checkIn: "2024-02-18",
    checkOut: "2024-02-25",
    status: "pending",
    total: 1400,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    guest: "Mike Chen",
    property: "Mountain Cabin Retreat",
    checkIn: "2024-02-10",
    checkOut: "2024-02-14",
    status: "completed",
    total: 1200,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockMessages = [
  {
    id: 1,
    guest: "Emma Davis",
    property: "Modern Downtown Loft",
    message: "Hi! I have a question about the parking situation...",
    time: "2 hours ago",
    unread: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    guest: "Alex Wilson",
    property: "Cozy Beach House",
    message: "Thank you for the great stay! Everything was perfect.",
    time: "1 day ago",
    unread: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    pricePerNight: 0,
    amenities: "",
    image: "",
    description: "",
  })

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "pricePerNight" ? Number(value) : value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {

      
      const roomData = {
        ...formData,
        amenities: formData.amenities.split(',').map(s => s.trim()),
      };

      await createRoom(roomData);
      console.log("Room created successfully!");
      setIsModalOpen(false); // Close the modal on success
      
      // Reset form data
      setFormData({
        title: "",
        type: "",
        location: "",
        pricePerNight: 0,
        amenities: "",
        image: "",
        description: "",
      });

      // You might want to refresh the properties list here
      // For this example, we'll just log success.
      // In a real app, you would fetch the updated list of properties.

    } catch (error) {
      console.error("Failed to create room:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">StayScape</span>
              <Badge variant="secondary" className="ml-2">
                Host Dashboard
              </Badge>
            </div>
            <AuthHeader />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and bookings</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.occupancyRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.averageRating}</div>
                  <p className="text-xs text-muted-foreground">
                    <Star className="inline h-3 w-3 mr-1 fill-current text-yellow-400" />
                    Excellent rating
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest reservations for your properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.guest} />
                        <AvatarFallback>
                          {booking.guest
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{booking.guest}</p>
                        <p className="text-xs text-muted-foreground truncate">{booking.property}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${booking.total}</p>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Performance</CardTitle>
                  <CardDescription>Your top performing properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-4">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="h-12 w-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{property.title}</p>
                        <p className="text-xs text-muted-foreground">{property.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${property.revenue}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                          {property.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Properties</h2>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-3 right-3"
                      variant={property.status === "active" ? "default" : "secondary"}
                    >
                      {property.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{property.location}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Bookings</p>
                        <p className="font-medium">{property.bookings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">${property.revenue}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium">{property.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-bold">Bookings Management</h2>

            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your property reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.guest} />
                          <AvatarFallback>
                            {booking.guest
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{booking.guest}</h4>
                          <p className="text-sm text-muted-foreground">{booking.property}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.checkIn} - {booking.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.total}</p>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold">Guest Messages</h2>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Communicate with your guests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.guest} />
                        <AvatarFallback>
                          {message.guest
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{message.guest}</h4>
                          {message.unread && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{message.property}</p>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{message.time}</p>
                      </div>
                      <Button size="sm">Reply</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your host account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Payment & Tax Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Notification Preferences
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Settings</CardTitle>
                  <CardDescription>Default settings for your properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Default House Rules
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Pricing & Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Guest Requirements
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Property Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Enter the details for your new property. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[70vh] py-4">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Cozy Beach House"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  name="type"
                  placeholder="e.g., Housing"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Malibu, CA"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pricePerNight">Price Per Night</Label>
                <Input
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  name="amenities"
                  placeholder="e.g., WiFi, Water, Light"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="A well-furnished building with necessities."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Property"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}



// "use client"

// import { useState } from "react"
// import {
//   Home,
//   Calendar,
//   BarChart3,
//   MessageSquare,
//   Settings,
//   Plus,
//   Star,
//   TrendingUp,
//   Users,
//   DollarSign,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { AuthHeader } from "@/components/auth-header"

// // Mock data for dashboard
// const mockStats = {
//   totalRevenue: 12450,
//   totalBookings: 34,
//   occupancyRate: 78,
//   averageRating: 4.8,
// }

// const mockProperties = [
//   {
//     id: 1,
//     title: "Modern Downtown Loft",
//     location: "San Francisco, CA",
//     status: "active",
//     bookings: 12,
//     revenue: 4200,
//     rating: 4.9,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 2,
//     title: "Cozy Beach House",
//     location: "Malibu, CA",
//     status: "active",
//     bookings: 8,
//     revenue: 3200,
//     rating: 4.8,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 3,
//     title: "Mountain Cabin Retreat",
//     location: "Aspen, CO",
//     status: "inactive",
//     bookings: 14,
//     revenue: 5050,
//     rating: 4.7,
//     image: "/placeholder.svg?height=200&width=300",
//   },
// ]

// const mockBookings = [
//   {
//     id: 1,
//     guest: "John Smith",
//     property: "Modern Downtown Loft",
//     checkIn: "2024-02-15",
//     checkOut: "2024-02-20",
//     status: "confirmed",
//     total: 900,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 2,
//     guest: "Sarah Johnson",
//     property: "Cozy Beach House",
//     checkIn: "2024-02-18",
//     checkOut: "2024-02-25",
//     status: "pending",
//     total: 1400,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 3,
//     guest: "Mike Chen",
//     property: "Mountain Cabin Retreat",
//     checkIn: "2024-02-10",
//     checkOut: "2024-02-14",
//     status: "completed",
//     total: 1200,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
// ]

// const mockMessages = [
//   {
//     id: 1,
//     guest: "Emma Davis",
//     property: "Modern Downtown Loft",
//     message: "Hi! I have a question about the parking situation...",
//     time: "2 hours ago",
//     unread: true,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 2,
//     guest: "Alex Wilson",
//     property: "Cozy Beach House",
//     message: "Thank you for the great stay! Everything was perfect.",
//     time: "1 day ago",
//     unread: false,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
// ]

// export default function DashboardPage() {
//   const [activeTab, setActiveTab] = useState("overview")

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
//               <Badge variant="secondary" className="ml-2">
//                 Host Dashboard
//               </Badge>
//             </div>
//             <AuthHeader />
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
//             <p className="text-muted-foreground">Manage your properties and bookings</p>
//           </div>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Property
//           </Button>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="overview" className="flex items-center gap-2">
//               <BarChart3 className="h-4 w-4" />
//               Overview
//             </TabsTrigger>
//             <TabsTrigger value="properties" className="flex items-center gap-2">
//               <Home className="h-4 w-4" />
//               Properties
//             </TabsTrigger>
//             <TabsTrigger value="bookings" className="flex items-center gap-2">
//               <Calendar className="h-4 w-4" />
//               Bookings
//             </TabsTrigger>
//             <TabsTrigger value="messages" className="flex items-center gap-2">
//               <MessageSquare className="h-4 w-4" />
//               Messages
//             </TabsTrigger>
//             <TabsTrigger value="settings" className="flex items-center gap-2">
//               <Settings className="h-4 w-4" />
//               Settings
//             </TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <TrendingUp className="inline h-3 w-3 mr-1" />
//                     +12% from last month
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <TrendingUp className="inline h-3 w-3 mr-1" />
//                     +8% from last month
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{mockStats.occupancyRate}%</div>
//                   <p className="text-xs text-muted-foreground">
//                     <TrendingUp className="inline h-3 w-3 mr-1" />
//                     +5% from last month
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
//                   <Star className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{mockStats.averageRating}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <Star className="inline h-3 w-3 mr-1 fill-current text-yellow-400" />
//                     Excellent rating
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Recent Activity */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Bookings</CardTitle>
//                   <CardDescription>Latest reservations for your properties</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {mockBookings.slice(0, 3).map((booking) => (
//                     <div key={booking.id} className="flex items-center gap-4">
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.guest} />
//                         <AvatarFallback>
//                           {booking.guest
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">{booking.guest}</p>
//                         <p className="text-xs text-muted-foreground truncate">{booking.property}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium">${booking.total}</p>
//                         <Badge
//                           variant={
//                             booking.status === "confirmed"
//                               ? "default"
//                               : booking.status === "pending"
//                                 ? "secondary"
//                                 : "outline"
//                           }
//                           className="text-xs"
//                         >
//                           {booking.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Property Performance</CardTitle>
//                   <CardDescription>Your top performing properties</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {mockProperties.map((property) => (
//                     <div key={property.id} className="flex items-center gap-4">
//                       <img
//                         src={property.image || "/placeholder.svg"}
//                         alt={property.title}
//                         className="h-12 w-16 rounded object-cover"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">{property.title}</p>
//                         <p className="text-xs text-muted-foreground">{property.bookings} bookings</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium">${property.revenue}</p>
//                         <div className="flex items-center text-xs text-muted-foreground">
//                           <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
//                           {property.rating}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Properties Tab */}
//           <TabsContent value="properties" className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold">Your Properties</h2>
//               <Button>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add New Property
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {mockProperties.map((property) => (
//                 <Card key={property.id} className="overflow-hidden">
//                   <div className="relative">
//                     <img
//                       src={property.image || "/placeholder.svg"}
//                       alt={property.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <Badge
//                       className="absolute top-3 right-3"
//                       variant={property.status === "active" ? "default" : "secondary"}
//                     >
//                       {property.status}
//                     </Badge>
//                   </div>
//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
//                     <p className="text-muted-foreground text-sm mb-4">{property.location}</p>

//                     <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//                       <div>
//                         <p className="text-muted-foreground">Bookings</p>
//                         <p className="font-medium">{property.bookings}</p>
//                       </div>
//                       <div>
//                         <p className="text-muted-foreground">Revenue</p>
//                         <p className="font-medium">${property.revenue}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-1">
//                         <Star className="h-4 w-4 fill-current text-yellow-400" />
//                         <span className="text-sm font-medium">{property.rating}</span>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button size="sm" variant="outline">
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button size="sm" variant="outline">
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button size="sm" variant="outline">
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Bookings Tab */}
//           <TabsContent value="bookings" className="space-y-6">
//             <h2 className="text-2xl font-bold">Bookings Management</h2>

//             <Card>
//               <CardHeader>
//                 <CardTitle>All Bookings</CardTitle>
//                 <CardDescription>Manage your property reservations</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {mockBookings.map((booking) => (
//                     <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
//                       <div className="flex items-center gap-4">
//                         <Avatar className="h-12 w-12">
//                           <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.guest} />
//                           <AvatarFallback>
//                             {booking.guest
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <h4 className="font-medium">{booking.guest}</h4>
//                           <p className="text-sm text-muted-foreground">{booking.property}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {booking.checkIn} - {booking.checkOut}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">${booking.total}</p>
//                         <Badge
//                           variant={
//                             booking.status === "confirmed"
//                               ? "default"
//                               : booking.status === "pending"
//                                 ? "secondary"
//                                 : "outline"
//                           }
//                         >
//                           {booking.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Messages Tab */}
//           <TabsContent value="messages" className="space-y-6">
//             <h2 className="text-2xl font-bold">Guest Messages</h2>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Messages</CardTitle>
//                 <CardDescription>Communicate with your guests</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {mockMessages.map((message) => (
//                     <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg">
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.guest} />
//                         <AvatarFallback>
//                           {message.guest
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h4 className="font-medium">{message.guest}</h4>
//                           {message.unread && (
//                             <Badge variant="destructive" className="text-xs">
//                               New
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="text-sm text-muted-foreground mb-1">{message.property}</p>
//                         <p className="text-sm">{message.message}</p>
//                         <p className="text-xs text-muted-foreground mt-2">{message.time}</p>
//                       </div>
//                       <Button size="sm">Reply</Button>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Settings Tab */}
//           <TabsContent value="settings" className="space-y-6">
//             <h2 className="text-2xl font-bold">Settings</h2>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Account Settings</CardTitle>
//                   <CardDescription>Manage your host account preferences</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     Edit Profile Information
//                   </Button>
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     Payment & Tax Settings
//                   </Button>
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     Notification Preferences
//                   </Button>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Property Settings</CardTitle>
//                   <CardDescription>Default settings for your properties</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     Default House Rules
//                   </Button>
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     Pricing & Availability
//                   </Button>
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     Guest Requirements
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }
