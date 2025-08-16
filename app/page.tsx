"use client";
import { AuthHeader } from "@/components/auth-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Waves,
  X,
  Calendar,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./apis/endpoints";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

// Interface for Room data
interface Room {
  id: string | number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image?: string;
  images?: string[];
  amenities: string[];
  type: string;
  description?: string;
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number;
  hostName?: string;
  hostImage?: string;
  checkInTime?: string;
  checkOutTime?: string;
  policies?: string[];
}

// Mock data for available rooms/lets (fallback)
const mockRooms: Room[] = [
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
    description:
      "A beautifully designed modern studio apartment in the heart of the city. Perfect for business travelers and couples looking for a comfortable stay with easy access to restaurants, shops, and public transportation.",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Sarah Johnson",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    policies: ["No smoking", "No parties", "Check-in after 3 PM"],
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
    description:
      "Spacious and cozy 2-bedroom flat located in a quiet residential neighborhood. Features a lovely balcony with garden views and is pet-friendly for those traveling with furry companions.",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    hostName: "Michael Chen",
    checkInTime: "2:00 PM",
    checkOutTime: "10:00 AM",
    policies: ["Pets allowed", "No smoking indoors", "Quiet hours after 10 PM"],
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
    description:
      "Experience luxury living in this stunning penthouse suite. Featuring panoramic city views, premium amenities including a rooftop pool, gym access, and 24/7 concierge service.",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    hostName: "Elena Rodriguez",
    checkInTime: "4:00 PM",
    checkOutTime: "12:00 PM",
    policies: ["No parties", "Maximum 6 guests", "24-hour concierge available"],
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
    description:
      "A charming cottage surrounded by beautiful gardens in a peaceful suburban setting. Perfect for those seeking tranquility while still having easy access to the city center.",
    maxGuests: 3,
    bedrooms: 2,
    bathrooms: 1,
    hostName: "David Thompson",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    policies: ["No smoking", "Garden access included", "Free parking"],
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
    description:
      "Perfect for family getaways! This spacious home features a large backyard, fully equipped kitchen, and comfortable living spaces. Located in a safe, family-friendly neighborhood.",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    hostName: "Jennifer Miller",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    policies: [
      "Family-friendly",
      "No smoking",
      "Children welcome",
      "Free parking",
    ],
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
    description:
      "Wake up to stunning ocean views from this beachfront apartment. Direct beach access and a private balcony make this the perfect seaside retreat for couples and small families.",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hostName: "Carlos Martinez",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    policies: ["No smoking", "Beach access included", "Ocean view guaranteed"],
  },
];

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
};

export default function HomePage() {
  const [originalRooms, setOriginalRooms] = useState<Room[]>([]); // To store all fetched rooms
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]); // Filtered rooms
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState<string>(""); // State for location search input
  const { toast } = useToast();

  // New state for booking form data
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const fetchAvailableRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/rooms?page=1&limit=30`);
      if (response.data && response.data.docs) {
        // Map API response to our Room interface
        const mappedRooms = response.data.docs.map((room: any) => ({
          id: room._id || room.id,
          title: room.name || room.title,
          location: room.address || room.location,
          price: room.pricePerNight || room.price,
          rating: room.averageRating || room.rating || 4.5,
          reviews: room.totalReviews || room.reviews || 0,
          image: room.photos?.[0] || room.image,
          images: room.photos || (room.image ? [room.image] : []),
          amenities: room.amenities || [],
          type: room.roomType || room.type,
          description: room.description,
          maxGuests: room.maxGuests || room.capacity,
          bedrooms: room.bedrooms,
          bathrooms: room.bathrooms,
          hostName: room.host?.name || room.hostName,
          hostImage: room.host?.profilePicture || room.hostImage,
          checkInTime: room.checkInTime,
          checkOutTime: room.checkOutTime,
          policies: room.houseRules || room.policies || [],
        }));
        setOriginalRooms(mappedRooms); // Store original list
        setAvailableRooms(mappedRooms); // Display all rooms initially
      }
    } catch (err) {
      console.error("Error fetching available rooms:", err);
      setError("Failed to load rooms. Showing sample data instead.");
      setOriginalRooms(mockRooms); // Fallback to mock data
      setAvailableRooms(mockRooms); // Display mock data
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomDetails = async (roomId: string | number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/rooms/${roomId}`);
      if (response.data) {
        // Map single room response to our Room interface
        const roomData = response.data.room || response.data;
        const mappedRoom: Room = {
          id: roomData._id || roomData.id,
          title: roomData.name || roomData.title,
          location: roomData.address || roomData.location,
          price: roomData.pricePerNight || roomData.price,
          rating: roomData.averageRating || roomData.rating || 4.5,
          reviews: roomData.totalReviews || roomData.reviews || 0,
          image: roomData.photos?.[0] || roomData.image,
          images: roomData.photos || (roomData.image ? [roomData.image] : []),
          amenities: roomData.amenities || [],
          type: roomData.roomType || roomData.type,
          description: roomData.description,
          maxGuests: roomData.maxGuests || roomData.capacity,
          bedrooms: roomData.bedrooms,
          bathrooms: roomData.bathrooms,
          hostName: roomData.host?.name || roomData.hostName,
          hostImage: roomData.host?.profilePicture || roomData.hostImage,
          checkInTime: roomData.checkInTime,
          checkOutTime: roomData.checkOutTime,
          policies: roomData.houseRules || roomData.policies || [],
        };
        setSelectedRoom(mappedRoom);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error("Error fetching room details:", err);
      // Fallback to room from list
      const fallbackRoom = originalRooms.find((room) => room.id === roomId); // Use originalRooms for fallback
      if (fallbackRoom) {
        setSelectedRoom(fallbackRoom);
        setIsModalOpen(true);
      } else {
        setError("Failed to load room details");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (roomId: string | number) => {
    fetchRoomDetails(roomId);
  };

  const handleBookNow = () => {
    if (!selectedRoom || !bookingDetails.checkIn || !bookingDetails.checkOut) {
      // Use a custom modal or toast for alerts instead of window.alert
      console.error("Please fill in all booking details.");
      // Example of a custom message box (replace with actual UI component)
      toast({
        title: "Booking Failed",
        description: "Please fill in all booking details to proceed.",
        variant: "destructive", // Use the destructive variant for errors
        duration: 5000,
      });
      alert("Please fill in all booking details to proceed.");
      return;
    }

    // Retrieve existing bookings or initialize an empty array
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    // Create a new booking object
    const newBooking = {
      id: Date.now(), // Unique ID for the booking
      roomId: selectedRoom.id,
      roomTitle: selectedRoom.title,
      roomLocation: selectedRoom.location,
      pricePerNight: selectedRoom.price,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      bookingDate: new Date().toISOString(),
    };

    // Add the new booking to the list
    const updatedBookings = [...existingBookings, newBooking];

    // Save the updated list to localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Use a custom modal or toast for alerts instead of window.alert
    console.log("Booking successful! Your booking has been saved.");
    toast({
      title: "Booking Confirmed! ✅",
      description: `Your booking for "${selectedRoom.title}" has been saved.`,
      duration: 5000,
      className: "bg-green-500 text-white", // Custom styling for success toast
    });

    alert(`Your booking for "${selectedRoom.title}" has been saved.`);

    // Close the modal and reset state
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    // Reset booking form state when closing the modal
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      guests: 1,
    });
  };

  // --- Search functionality ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchLocation.trim()) {
      setAvailableRooms(originalRooms); // If search bar is empty, show all rooms
      return;
    }
    const filtered = originalRooms.filter((room) =>
      room.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setAvailableRooms(filtered);
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">
                StayScape
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                Browse
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                Host
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
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
            Discover amazing rooms and lets in your desired location. From cozy
            studios to luxury penthouses.
          </p>

          {/* Mobile-First Search Bar */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch}>
              {/* Mobile Search (stacked vertically) */}
              <div className="md:hidden bg-white rounded-2xl shadow-lg p-4 space-y-3">
                <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <Input
                    placeholder="Where are you going?"
                    className="border-0 focus-visible:ring-0 bg-transparent p-0 text-base"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <label className="text-xs text-gray-500 block mb-1">
                      Check-in
                    </label>
                    <Input
                      type="date"
                      className="border-0 focus-visible:ring-0 bg-transparent p-0 text-sm"
                      // Dates are negligible for now as per request
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <label className="text-xs text-gray-500 block mb-1">
                      Check-out
                    </label>
                    <Input
                      type="date"
                      className="border-0 focus-visible:ring-0 bg-transparent p-0 text-sm"
                      // Dates are negligible for now as per request
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full rounded-lg py-3">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>

              {/* Desktop Search (horizontal layout) */}
              <div className="hidden md:flex bg-white rounded-full shadow-lg p-2 gap-2">
                <div className="flex-1 flex items-center px-4">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    placeholder="Where are you going?"
                    className="border-0 focus-visible:ring-0 text-lg"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-l border-gray-200">
                  <Input
                    type="date"
                    className="border-0 focus-visible:ring-0 text-lg"
                    // Dates are negligible for now as per request
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-l border-gray-200">
                  <Input
                    type="date"
                    className="border-0 focus-visible:ring-0 text-lg"
                    // Dates are negligible for now as per request
                  />
                </div>
                <Button type="submit" size="lg" className="rounded-full px-8">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Available Rooms Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Available Rooms & Lets
              </h2>
              <p className="text-gray-600">
                Choose from our selection of verified properties
              </p>
              {error && <p className="text-amber-600 text-sm mt-1">{error}</p>}
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" className="md:text-base">
                Filter
              </Button>
              <Button variant="outline" size="sm" className="md:text-base">
                Sort
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <p>Loading rooms...</p>
            </div>
          )}

          {/* Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {availableRooms.length > 0 ? (
              availableRooms.map((room) => (
                <Card
                  key={room.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                      {room.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 pr-2">
                        {room.title}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {room.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{room.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 3).map((amenity) => {
                        const IconComponent =
                          amenityIcons[amenity as keyof typeof amenityIcons] ||
                          Coffee;
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                          >
                            <IconComponent className="h-3 w-3" />
                            <span className="truncate">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl md:text-2xl font-bold text-gray-900">
                          ${room.price}
                        </span>
                        <span className="text-gray-600 text-sm">/night</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(room.id)}
                        disabled={loading}
                      >
                        View Details
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {room.reviews} reviews
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-600">
                No rooms found for the given location.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 pb-0 flex justify-between items-start">
              <h2 className="text-2xl font-bold text-left pr-8">
                {selectedRoom.title}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 pt-4">
              {/* Image Gallery */}
              <div className="mb-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={
                      selectedRoom.image ||
                      selectedRoom.images?.[0] ||
                      "/placeholder.svg"
                    }
                    alt={selectedRoom.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {selectedRoom.type}
                  </Badge>
                </div>

                {/* Additional images if available */}
                {selectedRoom.images && selectedRoom.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {selectedRoom.images.slice(1, 5).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedRoom.title} ${index + 2}`}
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
                      <span>{selectedRoom.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {selectedRoom.rating}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        ({selectedRoom.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {selectedRoom.maxGuests && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{selectedRoom.maxGuests} guests</span>
                      </div>
                    )}
                    {selectedRoom.bedrooms && (
                      <span>
                        {selectedRoom.bedrooms} bedroom
                        {selectedRoom.bedrooms !== 1 ? "s" : ""}
                      </span>
                    )}
                    {selectedRoom.bathrooms && (
                      <span>
                        {selectedRoom.bathrooms} bathroom
                        {selectedRoom.bathrooms !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {selectedRoom.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        About this place
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedRoom.description}
                      </p>
                    </div>
                  )}

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedRoom.amenities.map((amenity) => {
                        const IconComponent =
                          amenityIcons[amenity as keyof typeof amenityIcons] ||
                          Coffee;
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <IconComponent className="h-4 w-4" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Check-in/Check-out Times */}
                  {(selectedRoom.checkInTime || selectedRoom.checkOutTime) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Check-in & Check-out
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {selectedRoom.checkInTime && (
                          <div>
                            <span className="text-gray-600">Check-in:</span>
                            <p className="font-medium">
                              {selectedRoom.checkInTime}
                            </p>
                          </div>
                        )}
                        {selectedRoom.checkOutTime && (
                          <div>
                            <span className="text-gray-600">Check-out:</span>
                            <p className="font-medium">
                              {selectedRoom.checkOutTime}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Policies */}
                  {selectedRoom.policies &&
                    selectedRoom.policies.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          House Rules
                        </h3>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {selectedRoom.policies.map((policy, index) => (
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
                        <span className="text-2xl font-bold">
                          ${selectedRoom.price}
                        </span>
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
                          value={bookingDetails.checkIn}
                          onChange={(e) =>
                            setBookingDetails({
                              ...bookingDetails,
                              checkIn: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={bookingDetails.checkOut}
                          onChange={(e) =>
                            setBookingDetails({
                              ...bookingDetails,
                              checkOut: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Guests
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={bookingDetails.guests}
                          onChange={(e) =>
                            setBookingDetails({
                              ...bookingDetails,
                              guests: parseInt(e.target.value),
                            })
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} guest{i > 0 ? "s" : ""}
                            </option>
                          ))}
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
                    {selectedRoom.hostName && (
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-medium mb-2">
                          Hosted by {selectedRoom.hostName}
                        </h4>
                        <div className="flex items-center gap-3">
                          {selectedRoom.hostImage && (
                            <img
                              src={selectedRoom.hostImage}
                              alt={selectedRoom.hostName}
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
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
