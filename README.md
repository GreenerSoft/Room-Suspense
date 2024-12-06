# Room-Suspense
**Room-Suspense** est un composant basé sur **[Room](https://roomjs.fr)** permettant d’afficher un contenu temporaire en attendant que ses composants enfants soient tous chargés.

**Room-Suspense** est disponible sous la forme d’un module **ECMAScript 6** (une version non **ECMAScript** est également disponible) qui comme **Room**, ne nécessite pas de système de construction (build tools). **Room-Suspense** est donc utilisable directement dans un navigateur Web.

**Room-Suspense** ne fonctionne qu’à partir de la version **1.1.0** de **Room**.

## Installation
**Room-Suspense** est disponible sur :

* **NPM** : **[https://www.npmjs.com/package/room-suspense](https://www.npmjs.com/package/room-suspense)**
* **jsDelivr** : **[https://www.jsdelivr.com/package/npm/room-suspense](https://www.jsdelivr.com/package/npm/room-suspense)**

Vous pouvez aussi auto-héberger **Room-Suspense** en utilisant le fichier `room-suspense.min.js` (version **ESM**) ou le fichier `room-suspense-nm.min.js` (version non **ESM**).

## Utilisation
### Version ESM
Une **[carte d'importation](https://developer.mozilla.org/fr/docs/Web/HTML/Element/script/type/importmap)** est obligatoire en version **ESM** à minima pour indiquer où est le module **Room**. Vous pouvez donc y ajouter une entrée pour indiquer où est le module **Room-Suspense**.

Vous trouverez un exemple de carte d’importation dans le fichier `index.html` de notre dépôt **[Room-Test](https://github.com/GreenerSoft/Room-Test)**. Il contient par ailleurs plusieurs exemples d'utilisation de **Room-Suspense**.

### Version non ESM
En version non **ESM**, vous devez avoir un élément `<script>` dans votre page **HTML** après celui pour **Room**.

Vous avez alors un objet `RoomSuspense` attaché à l'objet principal `window` qui permet d'appeler la fonction retournant le composant (`RoomSuspense.Suspense()`).

Une autre solution plus simple consiste à utiliser l'**[affection par décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)** :

```javascript
const {Suspense} = RoomSuspense;
```

Vous pouvez alors appeler directement la fonction `Suspense()` sans préfixer avec `RoomSuspense.`.

## Fonction
**Room-Suspense** exporte une seule fonction `Suspense()` qui retourne le composant.

La signature de la fonction est :

```javascript
Suspense({fallback}, ...children)
```

Le premier paramètre est requis et doit être un objet qui peut contenir la propriété optionnelle `fallback` ou être vide (`{}`). 

La valeur de la propriété `fallback` est retournée par la fonction et représente un élément qui va temporairement être inséré dans le **DOM** et remplacé par les contenus des éléments enfants quand ils seront tous disponibles.

Si la propriété `fallback` n’est pas définie, à la valeur `null` ou `undefined`, alors la fonction `Suspense()` utile un noeud [**`Text`**](https://developer.mozilla.org/fr/docs/Web/API/Text) vide en remplacement. C'est le cas également si la valeur de la propriété est une chaîne de caractères en utilisant cette chaîne comme valeur du noeud.

Si la valeur de la propriété `fallback` est une instance de la classe [**`Element`**](https://developer.mozilla.org/fr/docs/Web/API/Element) (**HTMLElement**, **SVGElement**, etc.) il est alors utilisé directement.

Le paramètre `children` représente les composants enfants dont les contenus vont remplacer l’élément temporaire quand ils seront tous disponibles.

Il faut qu’au moins un des enfants soit une promesse JavaScript sinon l’élément temporaire est remplacé immédiatement. Et s'il n'y pas d'enfants, l'élément temporaire est supprimé immédiatement du **DOM**.

Les promesses doivent toutes être tenues (une alternative doit être donnée en cas de rejet) sinon l'élément temporaire n’est jamais remplacé.

Une fonction asynchrone JavaScript retourne une promesse, donc son appel peut être utilisé comme élément enfant.

Les contenus des enfants peuvent être de tous les types supportés par la fonction [`append()`](https://roomjs.fr/documentation/fonctions#enfants) de **Room** (chaînes de caractères, éléments **HTML**, fonctions etc.). Les contenus peuvent donc aussi être un composant Suspense, l'imbrication est possible.


## Exemples
Un exemple avec le composant [**Room-Leaflet**](https://github.com/GreenerSoft/Room-Leaflet) où dans une composition d’interface, on peut remplacer :

```javascript
div(
	await MapContainer({provider: OpenStreetMapProvider()})
)
```

Par :

```javascript
div(
	Suspense({fallback: "Chargement de la carte ..."},
		MapContainer({provider: OpenStreetMapProvider()})
	)
)
```

Un texte est utilisé ici comme élément temporaire mais un composant plus complexe peut l’être.

Plus d’exemples sont disponibles dans notre dépôt **[Room-Test](https://github.com/GreenerSoft/Room-Test)**.

## Restriction
La fonction `Suspense()` ne peut pas être utilisée comme résultat d'une fonction réactive de **Room**, il faut inclure le résultat de la fonction dans un élément **HTML** pour que cela fonctionne.