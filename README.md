# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

_Votre réponse pour l'exercice 1 :_

Pour implémenter la recherche en temps réel avec debounce :

1. J'ai utilisé useState pour gérer l'état de la recherche
2. J'ai créé un hook personnalisé useDebounce pour optimiser les performances
3. J'ai implémenté useEffect pour déclencher la recherche uniquement après le debounce

```jsx
// Exemple de code pour ProductSearch
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  // Effectuer la recherche
  searchProducts(debouncedSearch);
}, [debouncedSearch]);
```

[Screenshot de la recherche en action]

### Exercice 2 : Context et Internationalisation
#### Objectif : Gérer les préférences de langue

_Votre réponse pour l'exercice 2 :_

Pour gérer l'internationalisation :

1. Création du LanguageContext avec React.createContext
2. Implémentation du LanguageProvider avec les traductions
3. Utilisation du hook useContext pour accéder aux traductions

```jsx
// Exemple de LanguageContext
const LanguageContext = React.createContext({
  language: 'fr',
  setLanguage: () => {},
  translations: {}
});
```

[Screenshot du sélecteur de langue]

### Exercice 3 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

_Votre réponse pour l'exercice 3 :_

Création de deux hooks personnalisés :

1. useDebounce :
```jsx
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};
```

2. useLocalStorage :
```jsx
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  return [storedValue, setStoredValue];
};
```

[Screenshot démontrant l'utilisation des hooks]

### Exercice 4 : Gestion Asynchrone et Pagination
#### Objectif : Gérer le chargement et la pagination

_Votre réponse pour l'exercice 4 :_

Pour la gestion de la pagination et du chargement asynchrone :

1. Implémentation d'un état de chargement
2. Gestion de la pagination avec useState
3. Utilisation de useEffect pour charger les données

```jsx
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [products, setProducts] = useState([]);

useEffect(() => {
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(page);
      setProducts(prev => [...prev, ...data]);
    } finally {
      setLoading(false);
    }
  };
  
  loadProducts();
}, [page]);
```

[Screenshot de la pagination en action]


## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran. 
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.