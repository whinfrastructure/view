"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Shield,
  Ban,
  Loader2,
  MoreHorizontal,
  UserCog,
  LogIn,
  KeyRound,
  ShieldCheck,
  ShieldOff,
  Clock,
  Globe,
  Monitor,
  X,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import type { User } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Session = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialogs
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [sessionsDialogOpen, setSessionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("permanent");
  const [userSessions, setUserSessions] = useState<Session[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  useEffect(() => {
    if (session && (session.user as any).role !== "admin") {
      router.push("/account");
    }
  }, [session, router]);

  useEffect(() => {
    if (session && (session.user as any).role === "admin") {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "banned" && user.banned) ||
        (statusFilter === "active" && !user.banned);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Ban user
  const handleBanUser = async () => {
    if (!selectedUser) return;
    setActionLoading(selectedUser.id);
    try {
      const banExpiresIn =
        banDuration === "permanent"
          ? undefined
          : banDuration === "1d"
            ? 86400
            : banDuration === "7d"
              ? 604800
              : banDuration === "30d"
                ? 2592000
                : undefined;

      await authClient.admin.banUser({
        userId: selectedUser.id,
        banReason: banReason || undefined,
        banExpiresIn,
      });
      await fetchUsers();
      setBanDialogOpen(false);
      setBanReason("");
      setBanDuration("permanent");
      setSelectedUser(null);
    } catch (error) {
      console.error("Error banning user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Unban user
  const handleUnbanUser = async (user: User) => {
    setActionLoading(user.id);
    try {
      await authClient.admin.unbanUser({ userId: user.id });
      await fetchUsers();
    } catch (error) {
      console.error("Error unbanning user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Change role
  const handleChangeRole = async (newRole: "admin" | "user") => {
    if (!selectedUser) return;
    setActionLoading(selectedUser.id);
    try {
      await authClient.admin.setRole({
        userId: selectedUser.id,
        role: newRole,
      });
      await fetchUsers();
      setRoleDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error changing role:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Impersonate user
  const handleImpersonate = async (user: User) => {
    setActionLoading(user.id);
    try {
      await authClient.admin.impersonateUser({ userId: user.id });
      router.push("/account");
    } catch (error) {
      console.error("Error impersonating user:", error);
      setActionLoading(null);
    }
  };

  // Fetch user sessions
  const fetchUserSessions = async (user: User) => {
    setSelectedUser(user);
    setSessionsLoading(true);
    setSessionsDialogOpen(true);
    try {
      const response = await authClient.admin.listUserSessions({
        userId: user.id,
      });
      setUserSessions((response.data?.sessions as Session[]) || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setUserSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  };

  // Revoke session
  const handleRevokeSession = async (sessionToken: string) => {
    try {
      await authClient.admin.revokeUserSession({ sessionToken });
      if (selectedUser) {
        fetchUserSessions(selectedUser);
      }
    } catch (error) {
      console.error("Error revoking session:", error);
    }
  };

  if (!session || (session.user as any).role !== "admin") {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground mt-1">
            {filteredUsers.length} sur {users.length} utilisateurs
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-md bg-background"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md bg-background"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="banned">Banni</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Inscrit le
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium">
                              {user.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {user.role === "admin" && (
                        <Shield className="h-3 w-3 mr-1" />
                      )}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.banned
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }`}
                    >
                      {user.banned ? "Banni" : "Actif"}
                    </span>
                    {user.banned && user.banReason && (
                      <p className="text-xs text-muted-foreground mt-1 max-w-[150px] truncate">
                        {user.banReason}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={actionLoading === user.id}
                        >
                          {actionLoading === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => fetchUserSessions(user)}
                        >
                          <KeyRound className="h-4 w-4 mr-2" />
                          Voir les sessions
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setRoleDialogOpen(true);
                          }}
                        >
                          <UserCog className="h-4 w-4 mr-2" />
                          Changer le rôle
                        </DropdownMenuItem>
                        {user.id !== (session.user as any).id && (
                          <DropdownMenuItem
                            onClick={() => handleImpersonate(user)}
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Se connecter en tant que
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {user.banned ? (
                          <DropdownMenuItem
                            onClick={() => handleUnbanUser(user)}
                            className="text-green-600"
                          >
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Débannir
                          </DropdownMenuItem>
                        ) : (
                          user.id !== (session.user as any).id && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setBanDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Bannir
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                Aucun utilisateur trouvé
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-500" />
              Bannir {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>
              L&apos;utilisateur ne pourra plus se connecter et ses sessions
              seront révoquées.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ban-reason">Raison du bannissement</Label>
              <Textarea
                id="ban-reason"
                placeholder="Violation des conditions d'utilisation..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ban-duration">Durée</Label>
              <select
                id="ban-duration"
                className="w-full px-3 py-2 border rounded-md bg-background"
                value={banDuration}
                onChange={(e) => setBanDuration(e.target.value)}
              >
                <option value="1d">1 jour</option>
                <option value="7d">7 jours</option>
                <option value="30d">30 jours</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleBanUser}
              disabled={actionLoading === selectedUser?.id}
            >
              {actionLoading === selectedUser?.id && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Confirmer le bannissement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Changer le rôle de {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>
              Rôle actuel :{" "}
              <span className="font-medium">{selectedUser?.role}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <button
              onClick={() => handleChangeRole("user")}
              disabled={
                selectedUser?.role === "user" ||
                actionLoading === selectedUser?.id
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedUser?.role === "user"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-border hover:border-blue-300"
              } disabled:opacity-50`}
            >
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">Utilisateur</p>
              <p className="text-xs text-muted-foreground">Accès standard</p>
            </button>
            <button
              onClick={() => handleChangeRole("admin")}
              disabled={
                selectedUser?.role === "admin" ||
                actionLoading === selectedUser?.id
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedUser?.role === "admin"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-border hover:border-purple-300"
              } disabled:opacity-50`}
            >
              <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Accès complet</p>
            </button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sessions Dialog */}
      <Dialog open={sessionsDialogOpen} onOpenChange={setSessionsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Sessions de {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>
              Sessions actives de cet utilisateur
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {sessionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : userSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucune session active
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {userSessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[300px]">
                          {sess.userAgent || "Appareil inconnu"}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {sess.ipAddress || "IP inconnue"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Expire{" "}
                            {new Date(sess.expiresAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRevokeSession(sess.token)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSessionsDialogOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
