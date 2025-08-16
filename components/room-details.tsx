import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Car, Coffee, Waves, X, Calendar, Users } from "lucide-react"

interface Room {
  id: string | number
  title: string
  location: string
  price: number
  rating: number
  reviews: number
  image?: string
  images?: string[]
  amenities: string[]
  type: string
  description?: string
  maxGuests?: number
  bedrooms?: number
  bathrooms?: number
  hostName?: string
  hostImage?: string
  checkInTime?: string
  checkOutTime?: string
  policies?: string[]
}

interface RoomDetailsModalProps {
  room: Room | null
  isOpen: boolean
  onClose: () => void
  onBookNow?: (roomId: string | number) => void
}

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

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  isOpen,
  onClose,
  onBookNow
}) => {
  if (!room) return null

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(room.id)
    }
    // You can also add booking logic here
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-left">{room.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={room.image || room.images?.[0] || "/placeholder.svg"} 
                alt={room.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                {room.type}
              </Badge>
            </div>
            
            {/* Additional images if available */}
            {room.images && room.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {room.images.slice(1, 5).map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${room.title} ${index + 2}`}
                    className="w-full h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Location and Rating */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{room.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{room.rating}</span>
                  </div>
                  <span className="text-gray-600">({room.reviews} reviews)</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {room.maxGuests && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.maxGuests} guests</span>
                  </div>
                )}
                {room.bedrooms && (
                  <span>{room.bedrooms} bedroom{room.bedrooms !== 1 ? 's' : ''}</span>
                )}
                {room.bathrooms && (
                  <span>{room.bathrooms} bathroom{room.bathrooms !== 1 ? 's' : ''}</span>
                )}
              </div>

              {/* Description */}
              {room.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">About this place</h3>
                  <p className="text-gray-700 leading-relaxed">{room.description}</p>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee
                    return (
                      <div key={amenity} className="flex items-center gap-2 text-gray-700">
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Check-in/Check-out Times */}
              {(room.checkInTime || room.checkOutTime) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Check-in & Check-out</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {room.checkInTime && (
                      <div>
                        <span className="text-gray-600">Check-in:</span>
                        <p className="font-medium">{room.checkInTime}</p>
                      </div>
                    )}
                    {room.checkOutTime && (
                      <div>
                        <span className="text-gray-600">Check-out:</span>
                        <p className="font-medium">{room.checkOutTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Policies */}
              {room.policies && room.policies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">House Rules</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {room.policies.map((policy, index) => (
                      <li key={index}>• {policy}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="md:col-span-1">
              <div className="sticky top-4 border rounded-lg p-6 shadow-lg bg-white">
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">${room.price}</span>
                    <span className="text-gray-600">/night</span>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                    </select>
                  </div>
                </div>

                <Button 
                  className="w-full mb-3" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>

                <p className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </p>

                {/* Host Info */}
                {room.hostName && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-2">Hosted by {room.hostName}</h4>
                    <div className="flex items-center gap-3">
                      {room.hostImage && (
                        <img 
                          src={room.hostImage} 
                          alt={room.hostName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div className="text-sm text-gray-600">
                        <p>Response rate: 100%</p>
                        <p>Response time: within an hour</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}