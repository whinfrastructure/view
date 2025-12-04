"use client";

import { useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Calendar, BookOpen, Inbox, User } from "lucide-react";

export default function AccountPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const isAdmin = (session?.user as any)?.role === "admin";

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Bienvenue, {session.user.name || "Utilisateur"}
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos réservations et vos informations personnelles
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Réservations</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Inbox className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Messages</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prochaine visite</p>
              <p className="text-sm font-bold">15 Jan 2025</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Membre depuis</p>
              <p className="text-sm font-bold">Déc 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Information Card */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations du compte</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User avatar"}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <p className="text-lg font-medium">{session.user.name || "Utilisateur"}</p>
              <p className="text-muted-foreground">{session.user.email}</p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Rôle</p>
                <p className="font-medium">
                  {(session.user as any).role || "user"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statut du compte</p>
                <p className="font-medium text-green-600">Actif</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email vérifié</p>
                <p className="font-medium">
                  {session.user.emailVerified ? "Oui" : "Non"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Admin Panel */}
      {isAdmin && (
        <Card className="p-6 bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <h2 className="text-xl font-semibold mb-4">Administration</h2>
          <p className="text-muted-foreground mb-4">
            Vous avez les privilèges administrateur. Accédez aux fonctions de gestion avancées.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => router.push("/account/admin/users")}>
              Gérer les utilisateurs
            </Button>
            <Button variant="outline" onClick={() => router.push("/account/admin/bookings")}>
              Voir les réservations
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => router.push("/account/book")}>
            <BookOpen className="mr-2 h-4 w-4" />
            Nouvelle réservation
          </Button>
          <Button variant="outline" onClick={() => router.push("/account/inbox")}>
            <Inbox className="mr-2 h-4 w-4" />
            Voir les messages
          </Button>
          <Button variant="outline" onClick={() => router.push("/account/profile")}>
            <User className="mr-2 h-4 w-4" />
            Modifier le profil
          </Button>
        </div>
      </Card>
    </div>
  );
}
