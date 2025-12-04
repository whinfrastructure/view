# 🗺️ Roadmap - WH Riviera Platform

## 📅 Phase 1 : MVP Foundation (Semaines 1-2)

### ✅ Authentification & Base (Déjà fait)
- [x] Better Auth avec Facebook & Google OAuth
- [x] Admin plugin configuré
- [x] Pages login/register avec social auth
- [x] Redirect vers /account après connexion
- [x] Layout /account avec sidebar différenciée (admin/user)
- [x] Protection des routes admin

### 🎯 Base de Données & Modèles
- [ ] Créer le schéma de base de données
  - [ ] Table `listings` (villas)
  - [ ] Table `bookings` (demandes de réservation)
  - [ ] Table `messages` (tchat)
  - [ ] Table `reviews` (avis)
  - [ ] Table `favorites` (favoris user)
  - [ ] Relations avec table `user` existante
- [ ] Migrations Prisma/Drizzle
- [ ] Seed data pour développement (villas de test)

### 🏠 Admin - Gestion Listings (CRUD Basique)
- [ ] Page liste des villas (`/account/admin/listings`)
  - [ ] Tableau avec toutes les villas
  - [ ] Filtres : Statut, Localisation
  - [ ] Recherche
- [ ] Page création villa (`/account/admin/listings/new`)
  - [ ] Formulaire : Titre, Description, Localisation
  - [ ] Caractéristiques : Chambres, Salle de bains, Superficie
  - [ ] Équipements : Checkboxes (WiFi, Piscine, etc.)
  - [ ] Règles de la maison
  - [ ] Statut : Publié/Brouillon
- [ ] Page édition villa (`/account/admin/listings/[id]/edit`)
- [ ] Suppression de villa

---

## 📅 Phase 2 : Fonctionnalités Core (Semaines 3-4)

### 📸 Upload & Médias
- [ ] Intégration Cloudinary ou AWS S3
- [ ] Upload multiple d'images pour les villas
- [ ] Galerie photo avec drag & drop pour réorganiser
- [ ] Image principale (cover)
- [ ] Preview des images

### 🗓️ Système de Calendrier
- [ ] Composant Calendrier (react-day-picker ou similaire)
- [ ] Admin peut bloquer/débloquer des dates
- [ ] Affichage des disponibilités en temps réel
- [ ] Vue mensuelle & annuelle

### 📋 User - Recherche & Découverte
- [ ] Page `/listings` (catalogue public des villas)
  - [ ] Grid/List view des villas
  - [ ] Filtres sidebar
  - [ ] Recherche par nom
  - [ ] Tri : Popularité, Nouveauté
- [ ] Page détail villa (`/listings/[id]`)
  - [ ] Galerie photos (slider/lightbox)
  - [ ] Description complète
  - [ ] Carte interactive
  - [ ] Calendrier de disponibilité
  - [ ] Bouton "Demander une réservation"
- [ ] Système de favoris

### 🎫 Système de Réservation
- [ ] Formulaire demande de réservation
- [ ] Validation côté serveur
- [ ] Statuts : En attente / Confirmée / Refusée
- [ ] Admin peut approuver/refuser
- [ ] Notifications email automatiques

---

## 📅 Phase 3 : Communication & Interaction (Semaines 5-6)

### 💬 Système de Tchat
- [ ] Architecture temps réel (Socket.io ou Pusher)
- [ ] Component Chat UI
- [ ] Page `/account/inbox` complète
- [ ] Admin inbox

### 🔔 Système de Notifications
- [ ] Notifications in-app
- [ ] Notifications email
- [ ] Préférences notifications

### ⭐ Système d'Avis
- [ ] User peut laisser un avis après séjour
- [ ] Admin peut répondre aux avis
- [ ] Affichage des avis sur la page villa

---

## 📅 Phase 4 : Expérience Avancée (Semaines 7-8)

### 🗺️ Carte Interactive
### 🔍 Recherche Avancée
### 📊 Admin Analytics Dashboard
### 🎯 Comparateur de Villas
### 🤖 Chatbot FAQ

---

## 📅 Phase 5 : Optimisations & Polish (Semaines 9-10)

### ⚡ Performance
### 🌐 Internationalisation (i18n)
### 📱 Mobile Optimization
### 🔒 Sécurité & Tests
### 🎨 UI/UX Polish

---

## 📅 Phase 6 : Features Bonus (Semaines 11+)

### 🎁 Programme Fidélité
### 🏆 Recommandations IA
### 📧 Email Marketing
### 🔐 Vérifications Avancées
### 🎥 Visites Virtuelles
### 📞 Conciergerie

---

**Date de début**: 4 Décembre 2025  
**MVP Target**: Fin Janvier 2026  
**V1 Complete**: Mars 2026