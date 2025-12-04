"use client";

import { useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Calendar, Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { useEffect } from "react";

export default function AdminBookingsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && (session.user as any).role !== "admin") {
      router.push("/account");
    }
  }, [session, router]);

  const bookings = [
    {
      id: 1,
      user: "Jean Dupont",
      villa: "Villa Sunset",
      dates: "15 Jan - 22 Jan 2025",
      guests: 4,
      price: 2500,
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 2,
      user: "Marie Martin",
      villa: "Villa Paradise",
      dates: "10 Fév - 17 Fév 2025",
      guests: 6,
      price: 3200,
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: 3,
      user: "Pierre Dubois",
      villa: "Villa Azure",
      dates: "5 Mar - 12 Mar 2025",
      guests: 8,
      price: 4500,
      status: "confirmed",
      paymentStatus: "paid",
    },
    {
      id: 4,
      user: "Sophie Laurent",
      villa: "Villa Dream",
      dates: "20 Mar - 27 Mar 2025",
      guests: 5,
      price: 3800,
      status: "cancelled",
      paymentStatus: "refunded",
    },
  ];

  if (!session || (session.user as any).role !== "admin") {
    return null;
  }

  const statusConfig: Record<string, { label: string; class: string; icon: any }> = {
    confirmed: { label: "Confirmé", class: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { label: "En attente", class: "bg-yellow-100 text-yellow-800", icon: Clock },
    cancelled: { label: "Annulé", class: "bg-red-100 text-red-800", icon: XCircle },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
          <p className="text-muted-foreground mt-1">
            {bookings.length} réservations au total
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exporter</Button>
          <Button>Nouvelle réservation</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Confirmées</p>
              <p className="text-xl font-bold">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">En attente</p>
              <p className="text-xl font-bold">
                {bookings.filter((b) => b.status === "pending").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Annulées</p>
              <p className="text-xl font-bold">
                {bookings.filter((b) => b.status === "cancelled").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ce mois</p>
              <p className="text-xl font-bold">{bookings.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher une réservation..." className="pl-9" />
          </div>
          <select className="px-4 py-2 border rounded-md">
            <option value="all">Tous les statuts</option>
            <option value="confirmed">Confirmé</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulé</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option value="all">Toutes les villas</option>
            <option value="sunset">Villa Sunset</option>
            <option value="paradise">Villa Paradise</option>
            <option value="azure">Villa Azure</option>
          </select>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Villa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Invités
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => {
                const statusInfo = statusConfig[booking.status];
                const Icon = statusInfo.icon;
                return (
                  <tr key={booking.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{booking.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{booking.villa}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-muted-foreground">
                        {booking.dates}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{booking.guests}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{booking.price}€</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${statusInfo.class}`}
                      >
                        <Icon className="h-3 w-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : booking.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.paymentStatus === "paid"
                          ? "Payé"
                          : booking.paymentStatus === "pending"
                          ? "En attente"
                          : "Remboursé"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="ghost" size="sm">
                        Détails
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
