"use client";

import { useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Mail, User, Phone, MapPin, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos informations personnelles
        </p>
      </div>

      {/* Profile Picture */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Photo de profil</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <p className="font-medium">{session.user.name || "Utilisateur"}</p>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
            <Button variant="outline" size="sm" className="mt-2">
              Changer la photo
            </Button>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">
                <User className="inline h-4 w-4 mr-2" />
                Prénom
              </Label>
              <Input
                id="firstName"
                defaultValue={session.user.name?.split(" ")[0] || ""}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                defaultValue={session.user.name?.split(" ")[1] || ""}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">
              <Mail className="inline h-4 w-4 mr-2" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={session.user.email || ""}
              className="mt-2"
              disabled
            />
            <p className="text-xs text-muted-foreground mt-1">
              Votre email ne peut pas être modifié
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone">
                <Phone className="inline h-4 w-4 mr-2" />
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="birthdate">
                <Calendar className="inline h-4 w-4 mr-2" />
                Date de naissance
              </Label>
              <Input id="birthdate" type="date" className="mt-2" />
            </div>
          </div>

          <div>
            <Label htmlFor="address">
              <MapPin className="inline h-4 w-4 mr-2" />
              Adresse
            </Label>
            <Input
              id="address"
              placeholder="123 Rue de la Paix"
              className="mt-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input id="city" placeholder="Paris" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="postalCode">Code postal</Label>
              <Input id="postalCode" placeholder="75001" className="mt-2" />
            </div>
          </div>

          <div>
            <Label htmlFor="country">Pays</Label>
            <Input id="country" placeholder="France" className="mt-2" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button>Enregistrer les modifications</Button>
            <Button variant="outline">Annuler</Button>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Paramètres du compte</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Statut du compte</p>
              <p className="text-sm text-muted-foreground">
                Compte {(session.user as any).role || "utilisateur"}
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Actif
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Email vérifié</p>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                session.user.emailVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {session.user.emailVerified ? "Vérifié" : "Non vérifié"}
            </span>
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium">Mot de passe</p>
              <p className="text-sm text-muted-foreground">
                Géré par votre fournisseur d&apos;authentification
              </p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Modifier
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Zone de danger</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium">Supprimer le compte</p>
              <p className="text-sm text-muted-foreground">
                Cette action est irréversible
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Supprimer le compte
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
