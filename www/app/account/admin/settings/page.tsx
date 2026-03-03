"use client";

import { useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Settings as SettingsIcon,
  Globe,
  Bell,
  Shield,
  Database,
  Key,
  Loader2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Upload,
  Sparkles,
  FileJson,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings state
  const [openaiApiKey, setOpenaiApiKey] = useState("");

  // Import state
  const [jsonInput, setJsonInput] = useState("");
  const [useAI, setUseAI] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  useEffect(() => {
    if (session && (session.user as any).role !== "admin") {
      router.push("/account");
    }
  }, [session, router]);

  useEffect(() => {
    if (session && (session.user as any).role === "admin") {
      fetchSettings();
    }
  }, [session]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setOpenaiApiKey(data.openai_api_key || "");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "openai_api_key",
          value: openaiApiKey,
          description: "OpenAI API Key for AI features",
        }),
      });
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving API key:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    setImportResult(null);
    try {
      const jsonData = JSON.parse(jsonInput);
      const response = await fetch("/api/admin/listings/import-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonData, useAI }),
      });
      const result = await response.json();
      setImportResult(result);
      if (result.success) {
        setJsonInput("");
      }
    } catch (error: any) {
      setImportResult({ error: error.message || "Invalid JSON format" });
    } finally {
      setImporting(false);
    }
  };

  const loadSampleJson = async () => {
    try {
      const response = await fetch("/api/admin/listings/sample-json");
      if (response.ok) {
        const data = await response.json();
        setJsonInput(JSON.stringify(data, null, 2));
      }
    } catch {
      // Use default sample if API fails
      setJsonInput(
        JSON.stringify(
          [
            {
              title: "Villa Example",
              location: "Les Issambres",
              city: "Les Issambres",
              country: "France",
              bedrooms: 4,
              bathrooms: 3,
              maxGuests: 8,
              description: "Belle villa avec vue mer...",
              amenities: ["wifi", "pool", "sea_view"],
              status: "published",
              featured: false,
            },
          ],
          null,
          2
        )
      );
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
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Paramètres Admin</h1>
        <p className="text-muted-foreground mt-1">
          Configurez les paramètres de l&apos;application
        </p>
      </div>

      {/* OpenAI API Key */}
      <Card className="p-6 border-2 border-emerald-200 dark:border-emerald-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Key className="h-5 w-5 text-emerald-600" />
          Clé API OpenAI
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Nécessaire pour l&apos;import intelligent de listings avec génération
          de descriptions par IA.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <Button onClick={saveApiKey} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : saveSuccess ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Sauvé
                  </>
                ) : (
                  "Sauvegarder"
                )}
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Obtenez votre clé sur{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              platform.openai.com
            </a>
          </p>
        </div>
      </Card>

      {/* AI Import */}
      <Card className="p-6 border-2 border-purple-200 dark:border-purple-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Import de Listings avec IA
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Importez des villas depuis un fichier JSON. L&apos;IA peut améliorer
          automatiquement les descriptions.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-input">JSON des listings</Label>
              <Button variant="ghost" size="sm" onClick={loadSampleJson}>
                <FileJson className="h-4 w-4 mr-1" />
                Charger exemple
              </Button>
            </div>
            <Textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[{"title": "Villa...", "location": "..."}]'
              className="font-mono text-sm min-h-[200px]"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
                className="rounded border-gray-300 h-4 w-4"
                disabled={!openaiApiKey}
              />
              <span className="text-sm flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Améliorer les descriptions avec l&apos;IA
              </span>
              {!openaiApiKey && (
                <span className="text-xs text-amber-600">
                  (Configurez d&apos;abord la clé API)
                </span>
              )}
            </label>
          </div>

          <Button
            onClick={handleImport}
            disabled={importing || !jsonInput.trim()}
            className="w-full sm:w-auto"
          >
            {importing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Import en cours...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Importer les listings
              </>
            )}
          </Button>

          {importResult && (
            <div
              className={`p-4 rounded-lg ${
                importResult.error
                  ? "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  : "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
              }`}
            >
              {importResult.error ? (
                <div className="flex items-start gap-2 text-red-700 dark:text-red-300">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Erreur d&apos;import</p>
                    <p className="text-sm">{importResult.error}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-green-700 dark:text-green-300">
                  <Check className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Import réussi !</p>
                    <p className="text-sm">
                      {importResult.inserted} listing(s) importé(s)
                    </p>
                    {importResult.errors && importResult.errors.length > 0 && (
                      <p className="text-sm text-amber-600 mt-1">
                        {importResult.errors.length} erreur(s)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* General Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Paramètres généraux
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">Nom du site</Label>
            <Input id="siteName" defaultValue="WelkomHome" className="mt-2" />
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
                defaultValue="contact@welkomhome.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Téléphone</Label>
              <Input
                id="contactPhone"
                type="tel"
                defaultValue="+33 668 192 755"
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
    </div>
  );
}
