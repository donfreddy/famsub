# 🚀 Famsub – Roadmap de lancement MVP

## 🎯 Objectif

Développer une plateforme simple de partage d’abonnements, où les utilisateurs peuvent **créer une offre** ou *
*rejoindre une offre**, communiquer entre eux et gérer leurs abonnements partagés.

---

## 🛠️ Stack technique

- **Frontend** : Nuxt.js 3 + Tailwind CSS
- **Backend** : NestJS
- **Base de données** : PostgreSQL
- **Déploiement suggéré** : Vercel (frontend), VPS (backend)
- **Nom de domaine** : [famsub.com](https://famsub.com)

---

## 🧱 Fonctionnalités MVP

### Authentification

- [ ] Inscription / Connexion (email + mot de passe)
- [x] Middleware d’authentification
- [x] JWT côté backend

### Offres d’abonnement

- [ ] Créer une offre (nom du service, prix, nombre de places)
- [ ] Rejoindre une offre
- [ ] Voir la liste des offres publiques
- [ ] Annuler une offre ou quitter une offre

### Dashboard utilisateur

- [ ] Voir mes offres créées
- [ ] Voir mes offres rejointes

### Messagerie simple

- [ ] Envoi de message entre créateur et participants
- [ ] Affichage d’une conversation par offre

---

## 📅 Roadmap par semaine

### 🔹 Semaine 1: Auth & Setup

- [x] Setup du repo Git
- [x] Init backend NestJS + DB PostgreSQL
- [x] Init frontend Nuxt.js + Auth pages
- [ ] Authentification (JWT)
- [x] Pages : Login, Register, Profil

### 🔹 Semaine 2 : Gestion des offres

- [ ] CRUD offres (create, read, join)
- [ ] Formulaire de création d’offre
- [ ] Affichage de toutes les offres disponibles
- [ ] Rejoindre une offre (via bouton)

### 🔹 Semaine 3 : Messagerie

- [ ] Modèle Message (slotId, senderId, content)
- [ ] API messages (envoi et réception)
- [ ] UI simple de messagerie dans chaque offre

### 🔹 Semaine 4 : Déploiement & Lancement

- [ ] Mise en production backend (VPS)
- [ ] Déploiement frontend (Vercel)
- [ ] Landing page avec formulaire de contact
- [ ] Tests utilisateurs (feedbacks)
- [ ] Bugs + amélioration UX

---

## 🧪 Checklist pré-lancement

- [ ] Pages fonctionnelles : Login / Dashboard / Créer une offre / Rejoindre / Chat
- [ ] Auth sécurisée
- [ ] Gestion des erreurs / validations
- [ ] Déploiement en ligne opérationnel
- [ ] Nom de domaine relié
- [ ] Landing page prête sur [famsub.com](https://famsub.com)
- [ ] Collecte des premiers feedbacks

---

## 🚀 Après le MVP (Roadmap V2 – bonus)

- Intégration paiements (Campay, Paydunya…)
- Notifications par email
- Système de notation / avis
- Interface admin (modération)
- Offres privées + invitation par lien

---

Besoin d’aide pour un de ces blocs ? Fais-moi signe 💬
