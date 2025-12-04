"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Euro } from "lucide-react";

export default function BookPage() {
  const bookings = [
    {
      id: 1,
      villa: "Villa Sunset",
      location: "Cannes",
      dates: "15 Jan - 22 Jan 2025",
      guests: 4,
      price: 2500,
      status: "Confirmé",
      image: "/media/villa1.jpg",
    },
    {
      id: 2,
      villa: "Villa Paradise",
      location: "Nice",
      dates: "10 Fév - 17 Fév 2025",
      guests: 6,
      price: 3200,
      status: "En attente",
      image: "/media/villa2.jpg",
    },
    {
      id: 3,
      villa: "Villa Azure",
      location: "Saint-Tropez",
      dates: "5 Mar - 12 Mar 2025",
      guests: 8,
      price: 4500,
      status: "Confirmé",
      image: "/media/villa3.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mes Réservations</h1>
          <p className="text-muted-foreground mt-1">
            Gérez et suivez vos réservations de villas
          </p>
        </div>
        <Button>Nouvelle réservation</Button>
      </div>

      {/* Bookings List */}
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Booking Image */}
              <div className="w-full md:w-48 h-48 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>

              {/* Booking Details */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{booking.villa}</h3>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {booking.location}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Confirmé"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dates</p>
                      <p className="text-sm font-medium">{booking.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Invités</p>
                      <p className="text-sm font-medium">{booking.guests} personnes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Prix total</p>
                      <p className="text-sm font-medium">{booking.price}€</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    Voir les détails
                  </Button>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                  {booking.status === "En attente" && (
                    <Button variant="outline" size="sm" className="text-red-500">
                      Annuler
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State - Show when no bookings */}
      {bookings.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Aucune réservation</h3>
          <p className="text-muted-foreground mb-6">
            Vous n&apos;avez pas encore effectué de réservation
          </p>
          <Button>Découvrir nos villas</Button>
        </Card>
      )}
    </div>
  );
}
