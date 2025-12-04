"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function AccountPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:h-screen md:overflow-y-auto">
      <div className="max-w-4xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mon Compte</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et vos réservations
          </p>
        </div>

        <div className="grid gap-6">
          {/* User Information Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Informations du compte</h2>
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
                    <p className="text-sm text-muted-foreground">ID Utilisateur</p>
                    <p className="font-mono text-sm">{session.user.id}</p>
                  </div>
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

          {/* Session Information Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Session</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Session ID</p>
                <p className="font-mono text-sm">{session.session.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expire le</p>
                <p className="text-sm">
                  {new Date(session.session.expiresAt).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </Card>

          {/* Admin Panel Link (if admin) */}
          {(session.user as any).role === "admin" && (
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
              <h2 className="text-2xl font-semibold mb-4">Administration</h2>
              <p className="text-muted-foreground mb-4">
                Vous avez les privilèges administrateur. Vous pouvez gérer les utilisateurs et les sessions.
              </p>
              <Button variant="outline">
                Accéder au panneau d&apos;administration
              </Button>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleSignOut} variant="destructive">
              Se déconnecter
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Retour à l&apos;accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
