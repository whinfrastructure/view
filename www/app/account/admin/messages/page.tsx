"use client";

import { useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Inbox } from "lucide-react";

export default function AdminMessagesPage() {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages Admin</h1>
        <p className="text-muted-foreground mt-1">
          Gérez tous les messages des utilisateurs
        </p>
      </div>

      <Card className="p-12 text-center">
        <Inbox className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          Gestion des messages en cours de développement
        </h3>
        <p className="text-muted-foreground">
          Cette fonctionnalité sera bientôt disponible
        </p>
      </Card>
    </div>
  );
}
