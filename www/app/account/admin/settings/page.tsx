"use client";

import { useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Settings as SettingsIcon, Globe, Bell, Shield, Database } from "lucide-react";
import { useEffect } from "react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && (session.user as any).role !== "admin") {
      router.push("/account");
    }
  }, [session, router]);

  if (!session || (session.user as any).role !== "admin") {
    return null;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Paramètres Admin</h1>
        <p className="text-muted-foreground mt-1">
          Configurez les paramètres de l&apos;application
        </p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Paramètres généraux
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">Nom du site</Label>
            <Input
              id="siteName"
              defaultValue="WH Riviera"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="siteDescription">Description</Label>
            <Input
              id="siteDescription"
              defaultValue="Location de villas de luxe sur la Côte d'Azur"
              className="mt-2"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Email de contact</Label>
              <Input
                id="contactEmail"
                type="email"
                defaultValue="contact@whriviera.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Téléphone</Label>
              <Input
                id="contactPhone"
                type="tel"
                defaultValue="+33 4 12 34 56 78"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Notifications par email</p>
              <p className="text-sm text-muted-foreground">
                Recevoir les notifications de réservation par email
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Alertes de paiement</p>
              <p className="text-sm text-muted-foreground">
                Être alerté des nouveaux paiements
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Messages utilisateurs</p>
              <p className="text-sm text-muted-foreground">
                Notifications pour les nouveaux messages
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Sécurité
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Authentification à deux facteurs</p>
              <p className="text-sm text-muted-foreground">
                Renforcer la sécurité du compte admin
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configurer
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Sessions actives</p>
              <p className="text-sm text-muted-foreground">
                Gérer les sessions utilisateurs
              </p>
            </div>
            <Button variant="outline" size="sm">
              Voir
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Logs d&apos;activité</p>
              <p className="text-sm text-muted-foreground">
                Consulter l&apos;historique des actions admin
              </p>
            </div>
            <Button variant="outline" size="sm">
              Consulter
            </Button>
          </div>
        </div>
      </Card>

      {/* Database Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Base de données
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Sauvegarder la base de données</p>
              <p className="text-sm text-muted-foreground">
                Créer une sauvegarde complète
              </p>
            </div>
            <Button variant="outline" size="sm">
              Sauvegarder
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Optimiser la base</p>
              <p className="text-sm text-muted-foreground">
                Nettoyer et optimiser les tables
              </p>
            </div>
            <Button variant="outline" size="sm">
              Optimiser
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button>Enregistrer les modifications</Button>
        <Button variant="outline">Annuler</Button>
      </div>
    </div>
  );
}
