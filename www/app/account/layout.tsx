"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/blocks/sidebar";
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
  ChevronsUpDown,
  Calendar,
  Home,
  Inbox,
  BookOpen,
  Users,
  Settings,
  Shield,
  LogOut,
  User,
  Building2,
} from "lucide-react";

function UserMenu({ session }: { session: any }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between gap-3 h-12 px-3"
        >
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <CircleUserRound className="h-8 w-8 rounded-full" />
            )}
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {session?.user?.name || "Utilisateur"}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {session?.user?.email}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/account")}>
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/account/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AccountSidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const isAdmin = session?.user?.role === "admin";

  const userMenuItems = [
    { title: "Dashboard", url: "/account", icon: Home },
    { title: "Réservations", url: "/account/book", icon: BookOpen },
    { title: "Messages", url: "/account/inbox", icon: Inbox },
    { title: "Profil", url: "/account/profile", icon: User },
  ];

  const adminMenuItems = [
    { title: "Dashboard", url: "/account", icon: Home },
    { title: "Villas", url: "/account/admin/listings", icon: Building2 },
    { title: "Utilisateurs", url: "/account/admin/users", icon: Users },
    { title: "Réservations", url: "/account/admin/bookings", icon: Calendar },
    { title: "Messages", url: "/account/admin/messages", icon: Inbox },
    { title: "Paramètres", url: "/account/admin/settings", icon: Settings },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <Sidebar className="bg-white border-r">
      <SidebarContent>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">WH Riviera</h2>
          {isAdmin && (
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
              <Shield className="h-3 w-3" />
              Admin
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2">
            {isAdmin ? "Administration" : "Menu Principal"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a
                        href={item.url}
                        className={`flex items-center ${
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        } transition-colors`}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu session={session} />
      </SidebarFooter>
    </Sidebar>
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AccountSidebar session={session} />
        <main className="flex-1 md:h-screen md:overflow-y-auto">
          <div className="px-4 py-2 border-b bg-white sticky top-0 z-10">
            <SidebarTrigger className="h-5 w-5" />
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
