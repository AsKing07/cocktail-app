
# 🥂 CocktailApp

**CocktailApp** est une application web simple et intuitive permettant de découvrir des cocktails de manière aléatoire. Conçue avec Angular et Tailwind CSS, elle offre une expérience fluide et responsive.

> Générée avec [Angular CLI](https://github.com/angular/angular-cli) — version 19.2.9.

---

## 📖 Présentation

Vous manquez d'inspiration pour votre prochaine boisson ? CocktailApp vous propose des cocktails aléatoires accompagnés de leurs recettes détaillées. Chaque session est une nouvelle découverte ! L’application gère automatiquement le chargement et les erreurs, assurant une navigation agréable.

---

## ✨ Fonctionnalités

* 🔀 **Cocktails aléatoires** : Affichage dynamique à chaque chargement.
* 🔁 **Bouton "Rafraîchir"** : Obtenez une nouvelle liste de cocktails en un clic.
* 📋 **Recettes détaillées** : Ingrédients et étapes de préparation inclus.
* 📱 **Interface responsive** : Adaptée aux écrans mobiles, tablettes et ordinateurs.

---

## ⚙️ Technologies utilisées

* **Angular**
* **Tailwind CSS**
* **ng-icons**
* **API** : [TheCocktailDB](https://www.thecocktaildb.com/)

---

## 🐳 Image Docker

L’image Docker du projet est disponible sur Docker Hub :

> 🔗 [Cocktail-App sur Docker Hub](https://hub.docker.com/r/asking07/cocktail-app)

### Commandes

```bash
# Télécharger l’image
docker pull asking07/cocktail-app:latest

# Construire l’image en local
docker build -t cocktail-app .

# Lancer le conteneur
docker run -p 4000:4000 cocktail-app
```

🔗 L’application sera accessible à l’adresse : `http://localhost:4000/`

---

## 🚀 Installation locale

### 1. Cloner le dépôt

```bash
git clone <https://github.com/AsKing07/cocktail-app>
cd cocktail-app
```

### 2. Installer les dépendances

```bash
# Avec npm
npm install

# ou avec yarn
yarn install
```

### 3. Lancer le serveur de développement

```bash
ng serve
```

🔗 L’application sera accessible à l’adresse : `http://localhost:4200/`

---

## ✅ Tests

### ✔️ Tests unitaires

Exécutez les tests unitaires avec [Karma](https://karma-runner.github.io) :

```bash
ng test
```

### 🧪 Tests end-to-end

Lancement des tests e2e (à configurer selon le framework choisi) :

```bash
ng e2e
```

*⚠️ Angular CLI ne fournit plus de framework e2e par défaut. Vous pouvez intégrer [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/) ou un autre outil selon vos préférences.*

---

## 🧭 Utilisation

1. Lancez l’application.
2. Rendez-vous sur `http://localhost:4200/`.
3. Explorez la sélection de cocktails générés aléatoirement.
4. Utilisez le bouton **"Rafraîchir"** pour découvrir d'autres cocktails.
5. En cas d’erreur, un message vous invitera à réessayer.

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

### Étapes :

1. Forkez le dépôt.
2. Créez une branche :

   ```bash
   git checkout -b feature/nom-fonctionnalite
   ```
3. Apportez vos modifications et commitez :

   ```bash
   git commit -m "Ajout de la fonctionnalité X"
   ```
4. Poussez la branche :

   ```bash
   git push origin feature/nom-fonctionnalite
   ```
5. Ouvrez une **Pull Request**.

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus d’informations.

