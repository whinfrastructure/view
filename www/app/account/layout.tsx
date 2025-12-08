"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  Calendar,
  Home,
  Inbox,
  BookOpen,
  Users,
  Settings,
  LogOut,
  User,
  Building2,
  Search,
  Bell,
  Activity,
  ChevronDown,
  LayoutTemplate,
} from "lucide-react";

function AccountHeader({ session }: { session: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = session?.user?.role === "admin";
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const userMenuItems = [
    { title: "Dashboard", url: "/account", icon: Home },
    {
      title: "Réservations",
      url: "/account/book",
      icon: BookOpen,
      children: [
        { title: "Mes réservations", url: "/account/book" },
        { title: "Historique", url: "/account/book/history" },
      ],
    },
    {
      title: "Messages",
      url: "/account/inbox",
      icon: Inbox,
      children: [
        { title: "Boîte de réception", url: "/account/inbox" },
        { title: "Archivés", url: "/account/inbox/archived" },
      ],
    },
  ];

  const adminMenuItems = [
    { title: "Dashboard", url: "/account", icon: Home },
    {
      title: "Villas",
      url: "/account/admin/listings",
      icon: Building2,
      children: [
        { title: "Toutes les villas", url: "/account/admin/listings" },
        { title: "Créer une villa", url: "/account/admin/listings/new" },
      ],
    },
    {
      title: "Utilisateurs",
      url: "/account/admin/users",
      icon: Users,
      children: [
        { title: "Tous les utilisateurs", url: "/account/admin/users" },
      ],
    },
    {
      title: "Réservations",
      url: "/account/admin/bookings",
      icon: Calendar,
      children: [
        { title: "Toutes les réservations", url: "/account/admin/bookings" },
      ],
    },
    {
      title: "Messages",
      url: "/account/admin/messages",
      icon: Inbox,
      children: [
        { title: "Tous les messages", url: "/account/admin/messages" },
      ],
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-6 gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/wh.svg"
            alt="WH Riviera"
            className="h-10 w-auto"
          />
        </div>

        <div className="flex flex-1 items-center gap-4">
          {/* Navigation Menu */}
          <nav className="flex items-center gap-1 text-sm">
            {menuItems.map((item) => {
              const isActive = pathname === item.url || pathname.startsWith(item.url + "/");

              if ((item as any).children) {
                const children = (item as any).children as { title: string; url: string }[];
                return (
                  <DropdownMenu
                    key={item.url}
                    open={openMenu === item.url}
                    onOpenChange={(open) =>
                      setOpenMenu(open ? item.url : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        onMouseEnter={() => setOpenMenu(item.url)}
                        onMouseLeave={() => setOpenMenu(null)}
                        className={`gap-2 ${
                          isActive
                            ? "bg-muted/60 font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                        <ChevronDown className="h-3 w-3 transition-transform data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="mt-1 min-w-[180px] text-sm"
                      onMouseEnter={() => setOpenMenu(item.url)}
                      onMouseLeave={() => setOpenMenu(null)}
                    >
                      {children.map((child) => (
                        <DropdownMenuItem
                          key={child.url}
                          onClick={() => router.push(child.url)}
                        >
                          {child.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Button
                  key={item.url}
                  variant="ghost"
                  onClick={() => router.push(item.url)}
                  className={`gap-2 ${
                    isActive
                      ? "bg-muted/60 font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              );
            })}
          </nav>

          {/* Search Bar avec Kanban */}
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-1 rounded-full border bg-white/80 px-2 py-0.5 text-xs font-medium">
                <LayoutTemplate className="h-3 w-3" />
                <span>Kanban</span>
              </div>
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Rechercher une villa, une réservation..."
              className="h-9 rounded-full border-0 bg-muted/50 pl-32 pr-4 text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pl-2">
          <Button variant="ghost" size="icon" className="relative">
            <Activity className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 rounded-full border bg-white px-3 hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <CircleUserRound className="h-6 w-6" />
                    )}
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                {isAdmin && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-purple-600 text-[8px] font-bold text-white">A</span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {session?.user?.name || "Utilisateur"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/account/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem onClick={() => router.push("/account/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

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
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <AccountHeader session={session} />
      <main className="flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
