"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Inbox, Search, Trash2, Star, Reply } from "lucide-react";
import { useState } from "react";

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1);

  const messages = [
    {
      id: 1,
      from: "Support WH Riviera",
      subject: "Confirmation de votre réservation",
      preview: "Votre réservation pour Villa Sunset a été confirmée...",
      date: "Il y a 2 heures",
      unread: true,
      starred: false,
    },
    {
      id: 2,
      from: "Jean Dupont",
      subject: "Question sur la villa Paradise",
      preview: "Bonjour, j'aimerais savoir si la villa dispose d'une piscine...",
      date: "Hier",
      unread: true,
      starred: true,
    },
    {
      id: 3,
      from: "Service Client",
      subject: "Mise à jour de votre profil",
      preview: "Vos informations ont été mises à jour avec succès...",
      date: "Il y a 2 jours",
      unread: false,
      starred: false,
    },
    {
      id: 4,
      from: "Marie Martin",
      subject: "Nouvelle offre spéciale",
      preview: "Profitez de -20% sur votre prochaine réservation...",
      date: "Il y a 3 jours",
      unread: false,
      starred: false,
    },
  ];

  const selectedMsg = messages.find((msg) => msg.id === selectedMessage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">
            {messages.filter((m) => m.unread).length} nouveaux messages
          </p>
        </div>
        <Button>Nouveau message</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Messages List */}
        <Card className="md:col-span-1 p-4 h-[600px] overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMessage === message.id
                    ? "bg-primary text-primary-foreground"
                    : message.unread
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm truncate">{message.from}</span>
                  {message.starred && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
                <p className="text-sm font-medium truncate">{message.subject}</p>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {message.preview}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{message.date}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Message Content */}
        <Card className="md:col-span-2 p-6 h-[600px] flex flex-col">
          {selectedMsg ? (
            <>
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMsg.subject}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      De: {selectedMsg.from}
                    </p>
                    <p className="text-xs text-muted-foreground">{selectedMsg.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto mb-4">
                <p className="text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                  <br />
                  <br />
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  <br />
                  <br />
                  Cordialement,
                  <br />
                  {selectedMsg.from}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Reply className="mr-2 h-4 w-4" />
                  Répondre
                </Button>
                <Button variant="outline">Transférer</Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <Inbox className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Sélectionnez un message pour le lire
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
