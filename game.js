/* =====================================================================
   KAMI ET LES LUCIOLES · les données du jeu Flexbox
   Le plateau : un étang la nuit. L’élève écrit du CSS pour que chaque
   luciole se pose sur la feuille de nénuphar de sa couleur.
   Les cibles sont calculées en appliquant la solution (`solution`) au même HTML.
   Chaque objectif (goals) a une fonction `test(c)` qui renvoie
   true (réussi), false (raté) ou un texte (raté, avec une explication).
   Outils disponibles dans les tests : cs, decl, declAny, boardOK…
   (voir engine.js, section « OUTILS POUR LES OBJECTIFS »)
   ===================================================================== */
MASCOT.style = "fireflies";

const svgURL = s => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const FLY = { jaune: "#FFD43B", rose: "#FF6BB5", bleue: "#4CC9F0", verte: "#69DB7C", orange: "#FF922B", violette: "#B197FC" };
const flySVG = c => svgURL(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="34" r="26" fill="${c}" opacity=".28"/><ellipse cx="22" cy="22" rx="10" ry="7" fill="#fff" stroke="#1B2440" stroke-width="2.5" transform="rotate(-25 22 22)"/><ellipse cx="42" cy="22" rx="10" ry="7" fill="#fff" stroke="#1B2440" stroke-width="2.5" transform="rotate(25 42 22)"/><ellipse cx="32" cy="38" rx="12" ry="14" fill="${c}" stroke="#1B2440" stroke-width="3"/><circle cx="32" cy="24" r="8" fill="#1B2440"/><circle cx="29" cy="23" r="2" fill="#fff"/><circle cx="35" cy="23" r="2" fill="#fff"/><path d="M28 6 q-2 6 1 10 M36 6 q2 6 -1 10" stroke="#1B2440" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`);
const leafSVG = c => svgURL(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 32 L58 26 A27 27 0 1 1 52 14 Z" fill="#2F9E44" stroke="${c}" stroke-width="4" stroke-dasharray="7 4"/><circle cx="32" cy="38" r="9" fill="${c}" opacity=".55"/></svg>`);
const colorRules = (fn, extra) => Object.entries(FLY).map(([k, c]) => `.luciole.${k}{background-image:${fn(c)};${extra ? extra(c) : ""}}`).join("");

/* Petits outils pour écrire les missions */
const pond = (...cols) => `<div class="etang">\n${cols.map(k => `  <div class="luciole ${k}"></div>`).join("\n")}\n</div>`;
const et = (c, prop) => cs(c, ".etang", prop);
const isFlex = c => et(c, "display") === "flex" || (decl(c, ".luciole", "display") ? "Le `display: flex` se met sur le parent, `.etang`, pas sur les lucioles." : "Il faut `display: flex` sur `.etang`.");
/* Un étang plus étroit, avec un bord visible, pour les missions « plusieurs lignes » */
const NARROW = `.etang{max-width:300px;border-right:3px dashed rgba(255,255,255,.35)}`;
/* Exemples de la leçon (mini-aperçu) */
const EX_BASE = `.boite{background:#EEEAFF;border:2px dashed #7B5CFF;border-radius:10px;padding:6px;min-height:40px}.boite>div{background:#FFD43B;border:2px solid #1B2440;border-radius:8px;padding:6px 12px;font-weight:700;margin:0}`;
const EX_HTML = `<div class="boite"><div>1</div><div>2</div><div>3</div></div>`;

const GAME = {
  id: "kami-lucioles",
  name: "Kami et les lucioles",
  title: ["Kami", "Flexbox"],
  kicker: "Flexbox · pour bien démarrer dans le web",
  lead: "La nuit tombe sur l’étang. Kami le caméléon doit guider ses amies les lucioles jusqu’aux feuilles de nénuphar de leur couleur. Sa baguette magique : **Flexbox**, l’outil du CSS pour aligner des éléments. Chaque atelier terminé allume une luciole autour de Kami.",
  mode: "board",
  lang: "css",
  rewardWord: "lucioles allumées",
  rewardLabel: "Luciole",
  rewardMsg: "Une nouvelle luciole brille près de Kami :",
  chapterNote: "Chaque atelier terminé allume une luciole autour de Kami.",
  finaleTitle: "L’étang brille de mille feux !",
  confetti: ["#FFD43B", "#FF6BB5", "#4CC9F0", "#69DB7C", "#7B5CFF"],
  links: { html: "https://diurndesign.github.io/Html_game/", css: null, js: "https://diurndesign.github.io/javascript_game/" },
  next: {
    name: "Kami et le potager (Grid)",
    url: "https://diurndesign.github.io/Grid-game/",
    title: "La suite : le potager de Kami, avec CSS Grid",
    text: "Flexbox aligne les éléments sur **une ligne**. Pour placer des éléments en lignes **et** en colonnes à la fois, il existe **CSS Grid**. Kami t’attend dans son potager !"
  },
  board: {
    items: ".etang > *",
    html: `<div class="etang">\n  <div class="luciole jaune"></div>\n</div>`
  },
  boardSkin: {
    title: "L’étang de Kami",
    word: "lucioles sur leur feuille",
    legend: "Chaque luciole doit se poser sur la feuille de **sa couleur**. Le plateau bouge pendant que tu tapes.",
    height: 320,
    base: `.etang{box-sizing:border-box;width:100%;height:100%;padding:16px}.luciole{box-sizing:border-box;width:64px;height:64px;background:center/contain no-repeat}`,
    game: colorRules(flySVG) + `.luciole.on-target{filter:drop-shadow(0 0 10px #FFE066)}`,
    target: `body{background:radial-gradient(circle at 12% 18%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 78% 12%,#fff 0 1px,transparent 1.5px),radial-gradient(circle at 46% 30%,#fff 0 1px,transparent 1.5px),radial-gradient(circle at 90% 60%,#fff 0 1.5px,transparent 2px),linear-gradient(#141B33,#1F3A5F 60%,#1E5162)}` + colorRules(leafSVG) + `.luciole.reached{opacity:.35}body.sandbox .luciole{display:none}`
  },

  /* ------------------------------------------------------------------
     PAGE « DÉCOUVRIR » : c’est quoi, à quoi ça sert, pourquoi
     ------------------------------------------------------------------ */
  discover: {
    nav: "Découvrir",
    button: "C’est quoi Flexbox ?",
    subject: "Flexbox",
    cardTitle: "C’est quoi Flexbox ? À quoi ça sert ? Pourquoi on l’utilise ?",
    cardText: "5 minutes pour comprendre avant de jouer, avec une démo à tester.",
    kicker: "Étape 0 · Découvrir",
    title: "C’est quoi, **Flexbox** ?",
    lead: "Avant de guider ta première luciole, prends cinq minutes pour comprendre ce qu’est Flexbox, à quoi il sert, et pourquoi presque tous les sites l’utilisent pour ranger leurs éléments.",
    say: "Salut, moi c’est Kami ! Ce soir, mes amies les lucioles ont besoin de toi pour se poser. Mais d’abord, je t’explique ma baguette magique : Flexbox.",
    cards: [
      { title: "C’est quoi ?", text: ["**Flexbox** (pour *flexible box*, « boîte souple ») est une partie du **CSS**, le langage qui décide de l’apparence d’une page web.", "C’est une façon de **ranger** des éléments : on prend une boîte, le **conteneur**, et on lui dit comment placer les éléments qu’elle contient, ses **enfants** : en ligne ou en colonne, collés à gauche, au centre, espacés…"] },
      { title: "À quoi ça sert ?", text: "Sans Flexbox, les blocs d’une page s’empilent les uns sous les autres. Avec Flexbox, en quelques lignes, tu peux :", list: ["mettre des éléments **côte à côte** : un menu, une rangée de boutons ;", "les **espacer** régulièrement, ou les pousser à droite ;", "**centrer** un élément, en largeur et en hauteur ;", "laisser les éléments **passer à la ligne** quand l’écran est petit."] },
      { title: "Pourquoi on l’utilise ?", text: ["Avant Flexbox, aligner trois boutons ou centrer un texte demandait des astuces compliquées et fragiles. Flexbox a été créé exactement pour ça : c’est **simple, fiable**, et ça marche dans tous les navigateurs.", "Et c’est **souple** : les éléments s’adaptent à la place disponible, sur un grand écran comme sur un téléphone. C’est pour ça que tous les sites modernes s’en servent."] }
    ],
    trioFocus: "css",
    trioHere: "Flexbox fait partie du CSS",
    trioNote: "Flexbox n’est pas un nouveau langage : ce sont quelques **propriétés CSS** de plus. Le HTML crée les éléments (les lucioles), le CSS avec Flexbox décide **où ils se placent**. Pas de HTML à écrire dans ce jeu : il est déjà prêt, tu écris seulement le CSS.",
    demo: {
      title: "Le même menu, avec et sans Flexbox",
      text: "Clique sur les boutons : le HTML ne change pas, seul le CSS de la boîte `.barre` change.",
      lang: "css",
      html: `<header class="barre">\n  <span class="logo">Kami</span>\n  <span>Accueil</span>\n  <span>Lucioles</span>\n  <span>Contact</span>\n</header>`,
      base: `.barre{background:#1B2440;padding:8px;border-radius:12px}.barre>span{display:block;margin:4px;padding:8px 14px;border:2px solid #1B2440;border-radius:8px;background:#FFD43B;color:#1B2440;font-weight:700}.barre>.logo{background:#69DB7C;font-size:1.5rem;padding:12px 16px}`,
      variants: [
        { label: "Sans Flexbox", css: `.barre {\n  /* rien de spécial :\n     chaque bloc prend\n     toute la largeur */\n}`, caption: "Sans Flexbox, chaque élément est un bloc qui prend toute la largeur : ils s’empilent les uns sous les autres. Pas très pratique pour un menu !" },
        { label: "display: flex", css: `.barre {\n  display: flex;\n}`, caption: "Une seule ligne de CSS sur la boîte, et ses enfants se rangent **côte à côte**, de gauche à droite." },
        { label: "+ espacer et centrer", css: `.barre {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}`, caption: "`justify-content` répartit les éléments sur la largeur (ici : de l’espace **entre** eux). `align-items` les centre **en hauteur** par rapport au grand logo. Voilà un vrai menu de site !" }
      ]
    },
    anatomy: {
      title: "Comment s’écrit Flexbox",
      text: "Deux sortes de règles : celles du **conteneur** (le parent), qui rangent tous les enfants d’un coup, et celles d’**un enfant**, pour le régler tout seul.",
      lang: "css",
      code: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.rose {\n  order: -1;\n}`,
      pieces: [
        [".etang", "le **conteneur** : la boîte qui contient les lucioles. C’est elle qu’on règle"],
        ["display: flex", "« range tes enfants avec Flexbox ». Sans cette ligne, rien d’autre ne marche"],
        ["justify-content", "place les enfants le long de la ligne (l’**axe principal**) : au début, au centre, espacés…"],
        ["align-items", "place les enfants dans l’autre sens (l’**axe secondaire**) : en haut, au milieu, en bas"],
        [".rose", "un **enfant** en particulier : certaines propriétés se mettent sur un seul élément"],
        ["order: -1", "ici, la luciole rose passe devant les autres"]
      ]
    },
    compare: {
      title: "Flexbox ou Grid ?",
      text: "Le CSS a deux outils de rangement. Ils ne sont pas concurrents : on utilise souvent les deux dans la même page.",
      cols: [
        { title: "Flexbox : une seule direction", focus: true,
          svg: `<svg viewBox="0 0 200 84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="196" height="56" rx="10" fill="#fff" stroke="#1B2440" stroke-width="3"/><g fill="#FFD43B" stroke="#1B2440" stroke-width="2.5"><rect x="12" y="14" width="38" height="32" rx="6"/><rect x="58" y="14" width="38" height="32" rx="6"/><rect x="104" y="14" width="38" height="32" rx="6"/><rect x="150" y="14" width="38" height="32" rx="6"/></g><path d="M14 72 H182 M174 66 L184 72 L174 78" stroke="#7B5CFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          items: ["Range les éléments **sur une ligne** (ou une colonne) : c’est une seule dimension.", "Idéal pour un **menu**, une barre de boutons, l’intérieur d’une carte, centrer un élément.", "Ce sont les éléments qui décident de leur taille, Flexbox répartit la place qui reste.", "**C’est ce que tu apprends ici.**"] },
        { title: "Grid : lignes et colonnes", focus: false,
          svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="170" height="100" rx="10" fill="#fff" stroke="#1B2440" stroke-width="3"/><g fill="#69DB7C" stroke="#1B2440" stroke-width="2.5"><rect x="12" y="12" width="44" height="38" rx="6"/><rect x="65" y="12" width="44" height="38" rx="6"/><rect x="118" y="12" width="44" height="38" rx="6"/><rect x="12" y="56" width="44" height="38" rx="6"/><rect x="65" y="56" width="44" height="38" rx="6"/><rect x="118" y="56" width="44" height="38" rx="6"/></g><path d="M14 114 H156 M148 108 L158 114 L148 120 M188 12 V90 M182 82 L188 92 L194 82" stroke="#7B5CFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          items: ["Range les éléments **en lignes et en colonnes à la fois** : deux dimensions, comme un tableau.", "Idéal pour la **mise en page** d’ensemble : en-tête, colonnes, pied de page, galerie de photos.", "C’est la grille qui décide des cases, les éléments viennent s’y placer.", "À découvrir dans le jeu suivant : le potager de Kami."] }
      ]
    },
    usesTitle: "Où on trouve Flexbox dans la vraie vie",
    uses: [
      { title: "Les menus", text: "Le logo à gauche, les liens à droite, tout bien centré en hauteur : c’est presque toujours Flexbox." },
      { title: "Les boutons", text: "« Annuler » et « Valider » côte à côte, avec un petit espace entre les deux : une ligne de Flexbox et un `gap`." },
      { title: "Les cartes", text: "Une rangée de cartes produits qui passent à la ligne sur téléphone : Flexbox avec `flex-wrap`." },
      { title: "Centrer", text: "Une fenêtre de connexion pile au milieu de l’écran : `justify-content` et `align-items` à `center`." }
    ],
    jobs: {
      title: "Et dans les métiers du web ?",
      text: "Flexbox n’est pas un exercice d’école : c’est un outil que les pros utilisent **tous les jours**, souvent plusieurs fois par heure.",
      items: [
        { title: "Intégrateur·rice web", text: "Reçoit une maquette et la transforme en vraie page avec HTML et CSS. Chaque menu, chaque rangée de boutons, chaque bloc centré de la maquette devient une règle Flexbox." },
        { title: "Développeur·se front-end", text: "Construit l’interface des sites et des applis. Les composants réutilisables (barre de recherche, carte, fenêtre) sont presque tous rangés à l’intérieur avec Flexbox." },
        { title: "Webdesigner / UI designer", text: "Dessine les écrans dans un logiciel comme Figma. Sa fonction « Auto layout » fonctionne exactement comme Flexbox : direction, espacement, alignement. Connaître Flexbox aide à dessiner des maquettes faciles à coder." },
        { title: "Webmaster / gestion de sites", text: "Adapte des thèmes WordPress ou Shopify : pour décaler un bouton, aligner un logo ou réorganiser une fiche produit, on modifie souvent quelques lignes de Flexbox." }
      ]
    },
    words: [
      ["**Conteneur**", "la boîte « parent » sur laquelle on écrit `display: flex`. Ici : l’étang."],
      ["**Enfant** (ou élément flex)", "chaque élément placé directement dans le conteneur. Ici : les lucioles."],
      ["**Axe principal**", "la direction dans laquelle les enfants se rangent : de gauche à droite par défaut. `justify-content` agit sur cet axe."],
      ["**Axe secondaire**", "la direction perpendiculaire (de haut en bas par défaut). `align-items` agit sur cet axe."],
      ["**Propriété**", "un réglage CSS, comme `justify-content`. On lui donne une **valeur**, comme `center`."],
      ["**Passer à la ligne**", "quand il n’y a plus de place, les enfants continuent sur une nouvelle ligne (`flex-wrap: wrap`)."]
    ],
    traps: [
      "Écrire `display: flex` sur les enfants au lieu du parent. On l’écrit toujours sur la **boîte qui contient**.",
      "Inventer des valeurs comme `justify-content: right` ou `middle`. Les vraies : `flex-start`, `flex-end`, `center`, `space-between`…",
      "Mélanger les deux axes : `justify-content` suit la ligne, `align-items` va dans l’autre sens. Et tout tourne quand on passe en colonne !",
      "Essayer de centrer en hauteur sans hauteur : si la boîte est juste assez haute pour son contenu, il n’y a pas de place pour bouger."
    ],
    tools: [
      "Un éditeur de code gratuit : **VS Code**, avec un fichier `index.html` et un fichier `style.css`.",
      "Dans Chrome ou Firefox : clic droit, puis **Inspecter**. Un petit badge `flex` apparaît à côté du conteneur : clique dessus pour voir les espaces.",
      "La documentation **MDN** (developer.mozilla.org, en français) explique chaque propriété avec des exemples."
    ],
    ctaTitle: "Prêt à guider les lucioles ?",
    ctaText: "16 missions t’attendent, des toutes premières lignes jusqu’à la grande fête de l’étang. Chaque atelier terminé allume une luciole autour de Kami."
  },

  /* ------------------------------------------------------------------
     BAC À SABLE
     ------------------------------------------------------------------ */
  sandbox: {
    id: "bac-a-sable", sandbox: true, title: "Bac à sable", mode: "board",
    say: "Ici, pas de feuilles à viser : fais danser les lucioles comme tu veux !",
    ideas: [
      "Essaie chaque valeur de `justify-content` : `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`.",
      "Passe en `flex-direction: column` et regarde ce que devient `justify-content`.",
      "Donne `flex-grow: 1` à une seule luciole, puis à deux.",
      "Ajoute `gap: 30px` sur l’étang, puis `order: -1` sur la luciole verte."
    ],
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    starter: `.etang {\n  display: flex;\n}\n\n.verte {\n  \n}\n`,
    hints: []
  },

  /* ------------------------------------------------------------------
     ATELIERS
     ------------------------------------------------------------------ */
  chapters: [
    { n: 1, title: "Le réveil", piece: "La luciole jaune", notions: ["display: flex", "justify-content"] },
    { n: 2, title: "Se répartir", piece: "La luciole rose", notions: ["space-between", "space-around", "space-evenly"] },
    { n: 3, title: "Haut et bas", piece: "La luciole bleue", notions: ["align-items", "centrer"] },
    { n: 4, title: "Changer de direction", piece: "La luciole verte", notions: ["flex-direction", "column", "row-reverse"] },
    { n: 5, title: "Plusieurs lignes", piece: "La luciole orange", notions: ["flex-wrap", "gap"] },
    { n: 6, title: "Chaque luciole", piece: "La luciole violette", notions: ["order", "align-self", "flex-grow"] }
  ],

  levels: [
  /* ------------------------------ ATELIER 1 ------------------------------ */
  {
    id: "display-flex", ch: 1, title: "Le réveil des lucioles", notion: "display: flex",
    say: "Psst ! Mes amies les lucioles dorment encore, empilées les unes sous les autres. Allume Flexbox sur l’étang : elles vont se ranger en ligne !",
    lesson: {
      what: ["Dans une page web, les éléments sont rangés dans des **boîtes**. Une boîte qui en contient d’autres s’appelle le **conteneur** (ou le **parent**). Les boîtes qu’il contient sont ses **enfants**.", "Ici, le conteneur est l’étang (`.etang`) et ses enfants sont les lucioles. Pour allumer Flexbox, on écrit `display: flex` **sur le conteneur** : ses enfants se rangent alors **en ligne**, de gauche à droite."],
      why: "Sans Flexbox, chaque bloc prend toute la largeur et passe sous le précédent. Avec une seule ligne de CSS, les blocs se mettent côte à côte : c’est la base de tous les menus, barres de boutons et rangées de cartes.",
      code: `.etang {\n  display: flex;\n}`,
      pieces: [[".etang", "le **sélecteur** : la boîte qu’on vise, ici le conteneur"], ["display", "la **propriété** : le mode d’affichage de la boîte"], ["flex", "la **valeur** : « range mes enfants avec Flexbox »"], ["{ }  et  ;", "les accolades entourent les réglages, le point-virgule termine chaque ligne"]],
      example: { code: `.boite {\n  display: flex;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Écrire `display: flex` sur les lucioles (`.luciole`) au lieu de l’étang. On l’écrit toujours sur la **boîte qui contient**, jamais sur les enfants."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Dans la règle `.etang`, sur la ligne vide, écris `display: flex;`.", "Regarde les lucioles se ranger en ligne, chacune au-dessus de sa feuille.", "Clique sur **Vérifier**."],
    starter: `.etang {\n  \n}\n`,
    goals: [
      { label: "L’étang utilise `display: flex`", test: isFlex },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Écris ta déclaration entre les accolades `{` et `}` de `.etang`.", "Une déclaration, c’est `propriété: valeur;`. La propriété ici est `display`.", "`display: flex;`"],
    solution: `.etang {\n  display: flex;\n}`,
    debrief: "Une seule ligne, et les enfants passent de « empilés » à « en ligne ». L’étang est devenu un **conteneur flex** et les lucioles des **éléments flex**. Retiens bien la règle d’or : Flexbox s’allume **sur le parent**. Dans la vraie vie, c’est la première ligne qu’on écrit pour faire un menu horizontal."
  },
  {
    id: "justify-end", ch: 1, title: "Tout au bout de l’étang", notion: "justify-content",
    say: "Le courant a fait dériver les feuilles tout à droite ! Pousse les lucioles au bout de la ligne pour qu’elles se posent.",
    lesson: {
      what: ["Avec Flexbox, les enfants se rangent le long d’une ligne imaginaire : l’**axe principal**. Par défaut, il va de gauche à droite, comme quand on lit.", "La propriété `justify-content` (« justifier le contenu ») décide **où** les enfants se placent sur cet axe : au début, à la fin ou au centre."],
      why: "Pousser des éléments à droite ou les centrer, c’est un besoin de tous les jours : les boutons d’un formulaire alignés à droite, un titre centré, un panier en haut à droite d’un site…",
      code: `.etang {\n  display: flex;\n  justify-content: flex-end;\n}`,
      pieces: [["flex-start", "au début de la ligne, à gauche (c’est la valeur par défaut)"], ["flex-end", "à la fin de la ligne, à droite"], ["center", "au centre de la ligne"]],
      example: { code: `.boite {\n  display: flex;\n  justify-content: center;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Écrire `justify-content: right` parce que c’est plus naturel. En Flexbox, on raisonne en **début** et **fin** de ligne : la bonne valeur est `flex-end`."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Garde `display: flex` : sans lui, `justify-content` ne fait rien.", "En dessous, ajoute `justify-content` avec la valeur qui envoie les lucioles **à la fin** de la ligne."],
    starter: `.etang {\n  display: flex;\n  \n}\n`,
    goals: [
      { label: "`justify-content` vaut `flex-end`", test: c => { const v = et(c, "justify-content"); return v === "flex-end" || v === "end" || (v === "right" ? "Ça marche à l’écran, mais en Flexbox la valeur à retenir est `flex-end`." : (v === "center" ? "Au centre, c’est presque ça : il faut aller jusqu’au bout de la ligne." : false)); } },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété à ajouter : `justify-content`.", "« À la fin » se dit `end` en anglais, et Flexbox ajoute `flex-` devant.", "`justify-content: flex-end;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: flex-end;\n}`,
    debrief: "`justify-content` agit sur l’**axe principal** : en ligne, c’est l’horizontale. `flex-start` au début, `flex-end` à la fin, `center` au milieu. Remarque que l’ordre des lucioles ne change pas : elles glissent ensemble, comme un train."
  },

  /* ------------------------------ ATELIER 2 ------------------------------ */
  {
    id: "space-between", ch: 2, title: "Chacune sa place", notion: "justify-content: space-between",
    say: "Les lucioles se serrent toutes au milieu, elles vont se marcher sur les ailes ! Écarte-les : une à chaque bord, les autres bien réparties entre elles.",
    lesson: {
      what: "`justify-content` ne sert pas qu’à pousser le groupe : il peut aussi **partager l’espace libre** entre les enfants. Avec `space-between` (« espace entre »), le premier enfant se colle au début, le dernier à la fin, et l’espace restant est partagé à parts égales **entre** eux.",
      why: "C’est la valeur des barres de navigation : le logo tout à gauche, le menu tout à droite. Ou d’une barre d’onglets en bas d’une appli, où les icônes sont réparties sur toute la largeur.",
      code: `.etang {\n  display: flex;\n  justify-content: space-between;\n}`,
      pieces: [["space-between", "le premier au bord gauche, le dernier au bord droit, le même espace entre chacun"], ["l’espace libre", "la largeur de l’étang moins la largeur des lucioles : c’est lui qui est partagé"]],
      example: { code: `.boite {\n  display: flex;\n  justify-content: space-between;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Ajouter des marges (`margin`) à la main pour écarter les éléments. Si l’écran change de taille, tout se décale. `space-between` recalcule l’espace tout seul."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Pour l’instant, `justify-content` vaut `center` : les lucioles sont serrées au milieu.", "Change cette valeur pour que l’espace se partage **entre** les lucioles, avec une luciole à chaque bord."],
    starter: `.etang {\n  display: flex;\n  justify-content: center;\n}\n`,
    goals: [
      { label: "`justify-content` vaut `space-between`", test: c => { const v = et(c, "justify-content"); return v === "space-between" || (/space-(around|evenly)/.test(v) ? "Presque ! Avec cette valeur, il reste de l’espace aux bords. Il faut que la première et la dernière luciole touchent les bords." : false); } },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Ne rajoute pas de ligne : modifie seulement la valeur `center`.", "« Espace entre » se dit *space between* en anglais.", "`justify-content: space-between;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: space-between;\n}`,
    debrief: "Avec `space-between`, tu ne choisis pas la taille des espaces : Flexbox mesure la place libre et la partage. Agrandis la fenêtre de ton navigateur : les lucioles resteraient collées aux bords, avec des espaces plus grands. C’est ça, la **souplesse** de Flexbox."
  },
  {
    id: "space-evenly", ch: 2, title: "Des espaces bien égaux", notion: "space-around, space-evenly",
    say: "Les feuilles du bord ont dérivé vers le milieu. Cette fois, je veux exactement le même espace partout : entre les lucioles, et aussi contre les bords de l’étang.",
    lesson: {
      what: ["Deux autres valeurs de `justify-content` mettent aussi de l’espace **aux bords** :", "Avec `space-around` (« espace autour »), chaque enfant reçoit le même espace à sa gauche et à sa droite. Résultat : entre deux enfants, les espaces s’additionnent, donc les bords ont **moitié moins** d’espace.", "Avec `space-evenly` (« espace égal »), **tous** les espaces sont identiques, bords compris."],
      why: "Pour une rangée d’icônes, de logos de partenaires ou de cartes, on veut souvent que rien ne colle aux bords. `space-evenly` donne le rendu le plus régulier à l’œil.",
      code: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n}`,
      pieces: [["space-between", "rien aux bords, tout l’espace entre les enfants"], ["space-around", "un demi-espace aux bords, un espace entier entre les enfants"], ["space-evenly", "exactement le même espace partout"]],
      example: { code: `.boite {\n  display: flex;\n  justify-content: space-around;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Confondre `space-around` et `space-evenly`. Regarde les bords : s’ils ont **moins** d’espace qu’entre les éléments, c’est `space-around`."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Regarde les feuilles : l’espace contre les bords est le même qu’entre les feuilles.", "Remplace `space-between` par la valeur qui fait **des espaces tous égaux**."],
    starter: `.etang {\n  display: flex;\n  justify-content: space-between;\n}\n`,
    goals: [
      { label: "`justify-content` vaut `space-evenly`", test: c => { const v = et(c, "justify-content"); return v === "space-evenly" || (v === "space-around" ? "Presque ! Avec `space-around`, les bords ont moitié moins d’espace. Regarde bien les feuilles du bord." : false); } },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Il existe deux valeurs qui mettent de l’espace aux bords : essaie les deux et compare avec les feuilles.", "« Égal, régulier » se dit *evenly* en anglais.", "`justify-content: space-evenly;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n}`,
    debrief: "Tu connais maintenant toute la famille `space-` : `between` (rien aux bords), `around` (un demi-espace aux bords), `evenly` (tout pareil). Les trois partagent l’espace libre automatiquement : sur un téléphone, les espaces rétrécissent, sur un grand écran, ils grandissent."
  },
  {
    id: "quiz1", ch: 2, quiz: true, title: "Le contrôle de la nuit", notion: "quiz",
    say: "Avant d’aller plus loin, vérifions que tu as bien compris comment ranger les lucioles sur la ligne. Tout juste, et la luciole rose s’allume !",
    questions: [
      { q: "Pour ranger les lucioles avec Flexbox, sur quelle boîte écrit-on `display: flex` ?", opts: ["Sur chaque luciole", "Sur l’étang, le conteneur qui les contient", "Dans le HTML, avec une balise `<flex>`"], a: 1, why: "Flexbox s’allume toujours sur le **parent**. Ce sont ensuite ses enfants qui se rangent." },
      { q: "Où vont les liens de ce menu ?", code: `.menu {\n  display: flex;\n  justify-content: flex-end;\n}`, lang: "css", opts: ["À gauche", "Au centre", "À droite, à la fin de la ligne"], a: 2, why: "`flex-end` envoie les enfants à la fin de l’axe principal : en ligne, c’est à droite." },
      { q: "Quelle valeur met **exactement le même espace** entre les éléments et contre les bords ?", opts: ["`space-evenly`", "`space-between`", "`space-around`"], a: 0, why: "`space-evenly` : tous les espaces sont égaux. `space-between` ne laisse rien aux bords, `space-around` en laisse moitié moins." },
      { q: "Avec `justify-content: space-between`, où sont le premier et le dernier élément ?", opts: ["Tous les deux au centre", "Collés aux bords, à gauche et à droite", "À un demi-espace des bords"], a: 1, why: "Avec `space-between`, tout l’espace libre va **entre** les éléments : le premier et le dernier touchent les bords." }
    ],
    debrief: "Tu sais allumer Flexbox et répartir les éléments sur la ligne. C’est déjà ce qu’il faut pour la plupart des menus du web !"
  },

  /* ------------------------------ ATELIER 3 ------------------------------ */
  {
    id: "align-end", ch: 3, title: "Au ras de l’eau", notion: "align-items",
    say: "Les nénuphars flottent tout en bas de l’étang, près de l’eau. Mais les lucioles restent collées en haut ! Fais-les descendre.",
    lesson: {
      what: ["`justify-content` place les enfants **le long** de la ligne. Pour les placer dans l’autre sens, de haut en bas, on utilise `align-items` (« aligner les éléments »).", "Cette deuxième direction s’appelle l’**axe secondaire** : il croise l’axe principal, comme les deux branches d’une croix."],
      why: "Dans une barre de menu, le logo est souvent plus grand que les liens. `align-items` permet d’aligner tout le monde en haut, en bas ou au milieu, pour que la barre ait l’air bien rangée.",
      code: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n}`,
      pieces: [["align-items", "place les enfants sur l’axe secondaire : en ligne, c’est la verticale"], ["flex-start", "en haut"], ["flex-end", "en bas"], ["center", "au milieu"], ["stretch", "étirés sur toute la hauteur (par défaut, si les enfants n’ont pas de hauteur fixée)"]],
      example: { code: `.boite {\n  display: flex;\n  height: 90px;\n  align-items: flex-end;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Utiliser `justify-content` pour descendre les éléments. En ligne, `justify-content` ne bouge qu’à l’horizontale : pour la hauteur, c’est `align-items`."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Garde les deux lignes déjà écrites : les lucioles sont bien centrées en largeur.", "Ajoute `align-items` pour les envoyer **en bas** de l’étang."],
    starter: `.etang {\n  display: flex;\n  justify-content: center;\n  \n}\n`,
    goals: [
      { label: "`align-items` vaut `flex-end`", test: c => { const v = et(c, "align-items"); return v === "flex-end" || v === "end" || (v === "center" ? "Au milieu, c’est un bon début : il faut descendre jusqu’en bas." : (v === "bottom" ? "La valeur `bottom` n’existe pas ici : en Flexbox, on dit `flex-end`." : false)); } },
      { label: "Elles restent centrées en largeur", test: c => et(c, "justify-content") === "center" || "Ne touche pas à `justify-content: center`." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété pour l’axe vertical : `align-items`.", "Les valeurs sont les mêmes que pour `justify-content` : début, fin, centre.", "`align-items: flex-end;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n}`,
    debrief: "Tu as utilisé les **deux axes** en même temps : `justify-content` pour la largeur, `align-items` pour la hauteur. Ça marche ici parce que l’étang est plus haut que les lucioles : s’il n’y a pas de place en hauteur, `align-items` n’a rien à faire."
  },
  {
    id: "centrer", ch: 3, title: "Le cœur de l’étang", notion: "centrer parfaitement",
    say: "La luciole bleue est la reine de l’étang. Sa feuille est pile au milieu, en largeur et en hauteur. Montre-lui le chemin !",
    lesson: {
      what: "Pour centrer un élément **parfaitement**, on combine les deux axes : `justify-content: center` le centre en largeur, `align-items: center` le centre en hauteur.",
      why: "Pendant des années, centrer un élément en hauteur était un vrai casse-tête en CSS. Avec Flexbox, trois lignes suffisent. On s’en sert partout : fenêtre de connexion, icône dans un bouton rond, message « page introuvable »…",
      code: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
      pieces: [["justify-content: center", "au centre sur l’axe principal (la largeur)"], ["align-items: center", "au centre sur l’axe secondaire (la hauteur)"], ["les trois lignes", "la recette à retenir par cœur pour centrer n’importe quoi"]],
      example: { code: `.boite {\n  display: flex;\n  height: 90px;\n  justify-content: center;\n  align-items: center;\n}`, base: EX_BASE, html: `<div class="boite"><div>Au centre !</div></div>` },
      trap: "Essayer de centrer avec `text-align: center` ou des marges calculées à la main. `text-align` ne centre que du texte, et seulement en largeur."
    },
    boardHTML: pond("bleue"),
    steps: ["Centre la luciole **en largeur** avec `justify-content`.", "Centre-la **en hauteur** avec `align-items`."],
    starter: `.etang {\n  display: flex;\n  \n}\n`,
    goals: [
      { label: "`justify-content` vaut `center`", test: c => et(c, "justify-content") === "center" },
      { label: "`align-items` vaut `center`", test: c => et(c, "align-items") === "center" || (et(c, "justify-content") === "center" ? "En largeur, c’est bon. Il reste la hauteur." : false) },
      { label: "La luciole est sur sa feuille", test: boardOK }
    ],
    hints: ["Il faut deux lignes : une par axe.", "Les deux propriétés ont la même valeur : `center`.", "`justify-content: center;` puis `align-items: center;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    debrief: "`display: flex` + `justify-content: center` + `align-items: center` : c’est **la** recette pour centrer, à garder dans ta poche. Tu la réécriras des dizaines de fois dans ta vie de développeur ou de développeuse web."
  },

  /* ------------------------------ ATELIER 4 ------------------------------ */
  {
    id: "column", ch: 4, title: "Les axes tournent", notion: "flex-direction: column",
    say: "Les lucioles volent vers la droite, mais ce soir elles veulent faire une tour, les unes sous les autres ! Change juste leur direction… et regarde bien ce qui se passe.",
    lesson: {
      what: ["`flex-direction` choisit la direction de l’**axe principal**, c’est-à-dire le sens dans lequel les enfants se rangent. Par défaut, c’est `row` (« rangée ») : de gauche à droite.", "Avec `column` (« colonne »), les enfants se rangent **de haut en bas**. Et attention : les deux axes tournent avec ! `justify-content` agit alors sur la **hauteur**, et `align-items` sur la **largeur**."],
      why: "Sur téléphone, on empile souvent ce qui était côte à côte sur ordinateur : un menu, des cartes, un formulaire. On passe simplement de `row` à `column`, sans changer le reste.",
      code: `.etang {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n}`,
      pieces: [["flex-direction: row", "en ligne, de gauche à droite (par défaut)"], ["flex-direction: column", "en colonne, de haut en bas"], ["justify-content", "suit **toujours** l’axe principal : en colonne, c’est la hauteur"], ["align-items", "suit **toujours** l’axe secondaire : en colonne, c’est la largeur"]],
      example: { code: `.boite {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Croire que `justify-content` veut dire « horizontal ». Il veut dire « **le long de l’axe principal** ». Quand on passe en colonne, il devient vertical."
    },
    boardHTML: pond("jaune", "rose", "verte"),
    steps: ["Les lucioles sont en ligne, à droite (`flex-end`), centrées en hauteur (`center`).", "Ajoute **seulement** `flex-direction: column;`, sans toucher aux autres lignes.", "Observe : elles vont en bas et au centre. Les axes ont tourné !"],
    starter: `.etang {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  \n}\n`,
    goals: [
      { label: "`flex-direction` vaut `column`", test: c => et(c, "flex-direction") === "column" || (et(c, "flex-direction") === "column-reverse" ? "Pas à l’envers : juste `column`." : false) },
      { label: "`justify-content` et `align-items` n’ont pas changé", test: c => (["flex-end", "end"].includes(et(c, "justify-content")) && et(c, "align-items") === "center") || "Garde `justify-content: flex-end` et `align-items: center` : c’est la direction qui fait tout le travail." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété qui change la direction : `flex-direction`.", "« Colonne » se dit *column* en anglais.", "Sur la ligne vide : `flex-direction: column;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-direction: column;\n}`,
    debrief: "Une seule ligne ajoutée, et `flex-end` qui voulait dire « à droite » veut maintenant dire « en bas ». Retiens : `justify-content` suit l’**axe principal**, `align-items` l’**axe secondaire**, et `flex-direction` décide lequel est lequel. C’est le point le plus important de tout Flexbox !"
  },
  {
    id: "reverse", ch: 4, title: "La file à l’envers", notion: "row-reverse, column-reverse",
    say: "Ce soir, c’est la verte qui mène la danse ! Les lucioles veulent voler dans l’autre sens : la verte en tête à gauche, la jaune en dernier, tout à droite.",
    lesson: {
      what: ["`flex-direction` a deux valeurs « à l’envers » :", "`row-reverse` range les enfants **de droite à gauche** : le premier enfant du HTML se retrouve tout à droite.", "`column-reverse` range les enfants **de bas en haut** : le premier enfant se retrouve tout en bas."],
      why: "On change l’ordre d’affichage **sans toucher au HTML**. Par exemple, sur une page qui alterne « image à gauche, texte à droite » puis « texte à gauche, image à droite », une carte sur deux passe en `row-reverse`.",
      code: `.etang {\n  display: flex;\n  flex-direction: row-reverse;\n}`,
      pieces: [["row-reverse", "en ligne, de droite à gauche"], ["column-reverse", "en colonne, de bas en haut"], ["le début de l’axe", "s’inverse aussi : en `row-reverse`, le « début » (`flex-start`) est à droite"]],
      example: { code: `.boite {\n  display: flex;\n  flex-direction: row-reverse;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Utiliser `justify-content: flex-end` pour « inverser ». Les éléments vont bien à droite, mais **dans le même ordre**. Regarde les couleurs !"
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Dans le HTML, l’ordre est : jaune, rose, bleue, verte.", "Regarde les feuilles : de gauche à droite, verte, bleue, rose, jaune, collées à droite.", "Ajoute un `flex-direction` qui range les lucioles **de droite à gauche**."],
    starter: `.etang {\n  display: flex;\n  \n}\n`,
    goals: [
      { label: "`flex-direction` vaut `row-reverse`", test: c => { const v = et(c, "flex-direction"); return v === "row-reverse" || (v === "column-reverse" ? "Tu as inversé, mais en colonne ! Il faut rester en ligne." : (["flex-end", "end"].includes(et(c, "justify-content")) ? "Elles sont à droite, mais dans le même ordre qu’avant. Il faut inverser la direction." : false)); } },
      { label: "Sans `order` ni `justify-content`", test: c => (!declAny(c, "order") && !declAny(c, "justify-content")) || "Ici, la direction suffit : retire `order` et `justify-content`." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["C’est toujours `flex-direction`, avec une valeur qui finit par `-reverse` (« à l’envers »).", "On reste en ligne (*row*), mais à l’envers.", "`flex-direction: row-reverse;`"],
    solution: `.etang {\n  display: flex;\n  flex-direction: row-reverse;\n}`,
    debrief: "`row-reverse` inverse à la fois l’ordre **et** le point de départ : les lucioles partent de la droite. Le HTML n’a pas bougé, seul l’affichage a changé. Attention quand même : les personnes qui naviguent au clavier ou avec un lecteur d’écran suivent l’ordre du HTML, pas l’ordre affiché."
  },

  /* ------------------------------ ATELIER 5 ------------------------------ */
  {
    id: "wrap", ch: 5, title: "Trop de monde sur la ligne", notion: "flex-wrap: wrap",
    say: "Six lucioles sur une seule ligne, dans ce petit coin d’étang ? Elles sont toutes écrasées ! Laisse-les passer à la ligne.",
    boardBase: NARROW, boardHeight: 220,
    lesson: {
      what: ["Par défaut, Flexbox garde tous les enfants sur **une seule ligne**, quitte à les **écraser** quand la place manque.", "Avec `flex-wrap: wrap` (« envelopper, passer à la ligne »), les enfants qui ne tiennent plus continuent sur une **nouvelle ligne**, comme les mots d’un texte."],
      why: "C’est indispensable pour le **responsive**, c’est-à-dire les pages qui s’adaptent à toutes les tailles d’écran. Une galerie de photos montre 4 images par ligne sur ordinateur et 2 sur téléphone, sans changer une ligne de code.",
      code: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n}`,
      pieces: [["nowrap", "tout sur une seule ligne, quitte à écraser les enfants (par défaut)"], ["wrap", "les enfants passent à la ligne quand il n’y a plus de place"], ["la ligne pointillée", "le bord droit de l’étang : ici, il est plus étroit que d’habitude"]],
      example: { code: `.boite {\n  display: flex;\n  flex-wrap: wrap;\n  width: 150px;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>` },
      trap: "Oublier `flex-wrap` et se demander pourquoi les images sont toutes petites sur téléphone. Sans `wrap`, Flexbox préfère rétrécir les éléments plutôt que de passer à la ligne."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte", "orange", "violette"),
    steps: ["Regarde l’étang : les six lucioles sont écrasées sur une seule ligne.", "Ajoute `flex-wrap` avec la valeur qui les laisse **passer à la ligne**."],
    starter: `.etang {\n  display: flex;\n  \n}\n`,
    goals: [
      { label: "`flex-wrap` vaut `wrap`", test: c => { const v = et(c, "flex-wrap"); return v === "wrap" || (v === "wrap-reverse" ? "Pas à l’envers : juste `wrap`." : false); } },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété : `flex-wrap`.", "Sa valeur par défaut est `nowrap` (« pas de retour à la ligne »). Il faut le contraire.", "`flex-wrap: wrap;`"],
    solution: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n}`,
    debrief: "Quatre lucioles tiennent sur la première ligne, les deux autres passent à la suivante. Si l’étang était plus large, elles tiendraient toutes sur une ligne : Flexbox décide tout seul. Remarque aussi que les deux lignes se partagent la hauteur de l’étang : c’est le comportement par défaut."
  },
  {
    id: "gap", ch: 5, title: "Un peu d’air entre les ailes", notion: "gap",
    say: "Les lucioles passent bien à la ligne, mais elles se touchent du bout des ailes. Laisse 20 pixels d’air entre elles, dans tous les sens !",
    boardBase: NARROW, boardHeight: 220,
    lesson: {
      what: "`gap` (« écart ») ajoute un espace **entre** les enfants, et seulement entre eux : rien contre les bords du conteneur. Il s’écrit sur le **conteneur**, et marche à la fois entre les colonnes et entre les lignes.",
      why: "Avant `gap`, on ajoutait des marges à chaque élément, puis on retirait celle du dernier… Avec `gap`, une seule ligne suffit, et les espaces sont toujours parfaitement réguliers : boutons, cartes, galeries.",
      code: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}`,
      pieces: [["gap: 20px", "20 pixels entre les enfants, à l’horizontale et à la verticale"], ["gap: 10px 30px", "deux valeurs : 10px entre les lignes, 30px entre les colonnes"], ["row-gap / column-gap", "pour régler un seul des deux sens"]],
      example: { code: `.boite {\n  display: flex;\n  gap: 20px;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Mettre le `gap` sur les lucioles. Comme `display: flex`, il s’écrit sur le **parent**, celui qui contient les enfants."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte", "orange", "violette"),
    steps: ["Garde `display: flex` et `flex-wrap: wrap`.", "Ajoute un `gap` de `20px` sur l’étang.", "Regarde : avec l’espace en plus, seulement trois lucioles tiennent par ligne !"],
    starter: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  \n}\n`,
    goals: [
      { label: "`gap` vaut `20px` dans les deux sens", test: c => { const cg = px(et(c, "column-gap")), rg = px(et(c, "row-gap")); return (cg === 20 && rg === 20) || (declAny(c, "margin") ? "Pas de marges : utilise `gap` sur l’étang." : ((cg || rg) ? `Pour l’instant : ${cg}px entre les colonnes et ${rg}px entre les lignes. Il faut 20px partout.` : false)); } },
      { label: "Les lucioles passent toujours à la ligne", test: c => et(c, "flex-wrap") === "wrap" || "Garde `flex-wrap: wrap`." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété : `gap`, sur l’étang.", "N’oublie pas l’unité : `20px`, sans espace entre le nombre et `px`.", "`gap: 20px;`"],
    solution: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}`,
    debrief: "`gap` est la façon moderne d’espacer des éléments : propre, régulière, et sans espace parasite aux bords. Combiné à `flex-wrap`, c’est la recette d’une galerie ou d’une liste de cartes qui s’adapte à tous les écrans."
  },
  {
    id: "quiz2", ch: 5, quiz: true, title: "Le contrôle des étoiles", notion: "quiz",
    say: "On a vu beaucoup de choses : les deux axes, les directions, les lignes. Petit contrôle sous les étoiles avant le dernier atelier !",
    questions: [
      { q: "Dans un conteneur en ligne (`row`), `align-items` agit sur…", opts: ["la largeur (l’axe principal)", "la hauteur (l’axe secondaire)", "l’ordre des éléments"], a: 1, why: "`align-items` agit toujours sur l’**axe secondaire**. En ligne, c’est la hauteur." },
      { q: "Que fait `justify-content: center` dans ce conteneur ?", code: `.liste {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}`, lang: "css", opts: ["Il centre les éléments en hauteur", "Il centre les éléments en largeur", "Rien, il ne marche pas en colonne"], a: 0, why: "En colonne, l’axe principal est vertical : `justify-content` agit donc sur la hauteur." },
      { q: "Tes cartes sont toutes écrasées sur une ligne, sur téléphone. Que faut-il ajouter au conteneur ?", opts: ["`flex-direction: row`", "`gap: 20px`", "`flex-wrap: wrap`"], a: 2, why: "Par défaut, Flexbox garde tout sur une ligne. `flex-wrap: wrap` laisse les éléments passer à la ligne suivante." },
      { q: "`gap: 20px` sur le conteneur, ça donne…", opts: ["20px autour de chaque élément, bords compris", "20px **entre** les éléments, rien contre les bords", "des éléments 20px plus larges"], a: 1, why: "`gap` met de l’espace uniquement **entre** les enfants, jamais contre les bords du conteneur." }
    ],
    debrief: "Les deux axes, la direction, les lignes multiples et les espaces : tu maîtrises tout ce qui se règle sur le **conteneur**. Dernier atelier : régler chaque luciole une par une !"
  },

  /* ------------------------------ ATELIER 6 ------------------------------ */
  {
    id: "order", ch: 6, title: "Qui passe devant ?", notion: "order",
    say: "La verte veut ouvrir le bal, et la jaune préfère fermer la marche. Change leur place dans la file, sans toucher au HTML !",
    lesson: {
      what: ["Jusqu’ici, toutes les propriétés s’écrivaient sur le conteneur. Certaines s’écrivent sur **un seul enfant**, pour le régler à part.", "`order` (« ordre ») change la place d’un enfant dans la file. Chaque enfant a `order: 0` par défaut. Flexbox range les plus **petits** nombres en premier : un enfant avec `order: -1` passe devant tout le monde, un enfant avec `order: 1` passe derrière."],
      why: "On peut réorganiser l’affichage selon la taille de l’écran, sans réécrire le HTML. Par exemple, sur téléphone, faire passer le bouton « Acheter » au-dessus de la description du produit.",
      code: `.verte {\n  order: -1;\n}\n\n.jaune {\n  order: 1;\n}`,
      pieces: [[".verte", "on vise **une** luciole grâce à sa classe de couleur"], ["order: 0", "la valeur de tout le monde par défaut"], ["order: -1", "plus petit que 0 : passe devant les autres"], ["order: 1", "plus grand que 0 : passe derrière les autres"]],
      example: { code: `.boite {\n  display: flex;\n}\n.trois {\n  order: -1;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div>2</div><div class="trois">3</div></div>` },
      trap: "Écrire `order` sur le conteneur `.etang`. Ça ne fait rien : `order` s’écrit sur l’**enfant** qu’on veut déplacer."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["L’étang est déjà réglé : ne touche pas à sa règle.", "Dans la règle `.verte`, donne-lui un `order` qui la fait passer **devant** toutes les autres.", "Dans la règle `.jaune`, donne-lui un `order` qui la fait passer **derrière** toutes les autres."],
    starter: `.etang {\n  display: flex;\n  justify-content: center;\n}\n\n.verte {\n  \n}\n\n.jaune {\n  \n}\n`,
    goals: [
      { label: "La luciole verte passe devant avec un `order` négatif", test: c => { const o = parseInt(cs(c, ".verte", "order"), 10); return o < 0 || (o > 0 ? "Un nombre positif l’envoie à la fin. Pour passer devant les autres (qui ont 0), il faut un nombre plus petit que 0." : false); } },
      { label: "La luciole jaune passe derrière avec un `order` positif", test: c => parseInt(cs(c, ".jaune", "order"), 10) > 0 },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Tout le monde a `order: 0` par défaut.", "Pour passer devant 0 : un nombre négatif. Pour passer derrière : un nombre positif.", "Dans `.verte` : `order: -1;` et dans `.jaune` : `order: 1;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: center;\n}\n\n.verte {\n  order: -1;\n}\n\n.jaune {\n  order: 1;\n}`,
    debrief: "`order` est ta première propriété **d’enfant** : elle ne range pas tout le monde, elle déplace une seule luciole. Les enfants de même `order` gardent l’ordre du HTML : c’est pour ça que la rose reste devant la bleue. Comme pour `row-reverse`, n’oublie pas que les lecteurs d’écran suivent l’ordre du HTML."
  },
  {
    id: "align-self", ch: 6, title: "La rose n’en fait qu’à sa tête", notion: "align-self",
    say: "Toutes les lucioles se posent en bas, au ras de l’eau… sauf la rose, qui adore rester au milieu de l’étang pour admirer la lune.",
    lesson: {
      what: "`align-self` (« s’aligner soi-même ») est la version **pour un seul enfant** de `align-items`. Le conteneur donne la règle générale avec `align-items`, et un enfant peut faire une exception avec `align-self`. Il accepte les mêmes valeurs : `flex-start`, `flex-end`, `center`, `stretch`.",
      why: "Dans une carte produit, tous les éléments sont alignés en haut, sauf le badge « Promo » qu’on veut en bas. Ou dans un menu, un seul bouton qui doit se démarquer. Inutile de tout changer : on règle juste l’exception.",
      code: `.etang {\n  display: flex;\n  align-items: flex-end;\n}\n\n.rose {\n  align-self: center;\n}`,
      pieces: [["align-items", "sur le conteneur : la règle pour **tous** les enfants"], ["align-self", "sur un enfant : l’exception, rien que pour lui"], ["l’axe", "comme `align-items`, il agit sur l’axe secondaire (la hauteur, en ligne)"]],
      example: { code: `.boite {\n  display: flex;\n  height: 90px;\n  align-items: flex-start;\n}\n.deux {\n  align-self: flex-end;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div class="deux">2</div><div>3</div></div>` },
      trap: "Chercher un `justify-self` pour déplacer un seul enfant en largeur : en Flexbox, il n’existe pas. Pour ça, on utilise `order`, ou des marges automatiques."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Sur l’étang, ajoute `align-items` pour poser **toutes** les lucioles en bas.", "Dans la règle `.rose`, ajoute `align-self` pour que la rose, et elle seule, reste **au milieu**."],
    starter: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  \n}\n\n.rose {\n  \n}\n`,
    goals: [
      { label: "L’étang pose les lucioles en bas avec `align-items: flex-end`", test: c => ["flex-end", "end"].includes(et(c, "align-items")) },
      { label: "La rose fait exception avec `align-self: center`", test: c => cs(c, ".rose", "align-self") === "center" || (et(c, "align-items") === "center" ? "Là, ce sont toutes les lucioles qui sont au milieu. L’exception s’écrit sur `.rose` seulement." : false) },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["D’abord la règle générale, sur `.etang` : `align-items: flex-end;`.", "Puis l’exception, dans `.rose` : la propriété est `align-self`.", "Dans `.rose` : `align-self: center;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: flex-end;\n}\n\n.rose {\n  align-self: center;\n}`,
    debrief: "La règle générale sur le parent, l’exception sur l’enfant : c’est une logique qu’on retrouve partout en CSS. `align-self` gagne toujours sur `align-items` pour l’enfant qui le porte."
  },
  {
    id: "flex-grow", ch: 6, title: "La jaune prend ses aises", notion: "flex-grow",
    say: "La luciole jaune fait une longue traînée de lumière : elle veut prendre toute la place libre et pousser les autres au bout de l’étang !",
    boardBase: `.luciole{border-radius:32px;background-color:rgba(255,255,255,.09)}`,
    lesson: {
      what: ["`flex-grow` (« grandir ») permet à un enfant de **s’étirer** pour prendre l’espace libre du conteneur.", "Par défaut, `flex-grow` vaut `0` : l’enfant garde sa taille. Avec `flex-grow: 1`, il grandit jusqu’à remplir toute la place qui reste. Si plusieurs enfants ont `flex-grow: 1`, ils se partagent la place à parts égales."],
      why: "C’est ce qui fait qu’une barre de recherche s’allonge pour remplir l’espace entre le logo et le bouton « Connexion ». Ou que des boutons d’une barre d’outils font tous la même largeur.",
      code: `.jaune {\n  flex-grow: 1;\n}`,
      pieces: [["flex-grow: 0", "ne grandit pas (par défaut)"], ["flex-grow: 1", "prend toute la place libre"], ["flex-grow: 2", "si un autre a 1, celui-ci reçoit deux fois plus de place libre que lui"], ["le halo", "ici, chaque luciole a un halo clair qui montre la vraie taille de sa boîte"]],
      example: { code: `.boite {\n  display: flex;\n}\n.deux {\n  flex-grow: 1;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div class="deux">2</div><div>3</div></div>` },
      trap: "Donner une largeur fixe (`width: 500px`) pour remplir l’espace. Sur un autre écran, ce sera trop grand ou trop petit. `flex-grow` s’adapte toujours."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Regarde la feuille jaune : sa boîte s’étire sur presque toute la largeur.", "Dans la règle `.jaune`, ajoute `flex-grow` pour qu’elle prenne **toute la place libre**."],
    starter: `.etang {\n  display: flex;\n}\n\n.jaune {\n  \n}\n`,
    goals: [
      { label: "La luciole jaune a un `flex-grow` positif", test: c => parseFloat(cs(c, ".jaune", "flex-grow")) > 0 || ((decl(c, ".jaune", "width") || decl(c, ".jaune", "min-width")) ? "Pas de largeur fixée à la main : utilise `flex-grow`." : (parseFloat(cs(c, ".rose", "flex-grow")) > 0 || parseFloat(cs(c, ".bleue", "flex-grow")) > 0 ? "C’est la jaune qui doit grandir, pas une autre." : false)) },
      { label: "Les autres lucioles gardent leur taille", test: c => (parseFloat(cs(c, ".rose", "flex-grow")) === 0 && parseFloat(cs(c, ".bleue", "flex-grow")) === 0) || "Seule la jaune grandit : retire le `flex-grow` des autres." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["C’est une propriété d’enfant : elle s’écrit dans `.jaune`.", "La valeur est un simple nombre, sans unité.", "Dans `.jaune` : `flex-grow: 1;`"],
    solution: `.etang {\n  display: flex;\n}\n\n.jaune {\n  flex-grow: 1;\n}`,
    debrief: "Avec `flex-grow: 1`, la boîte jaune mange toute la place libre, et les deux autres sont poussées au bout. Pas besoin de calculer une largeur : Flexbox le fait pour toi, sur tous les écrans. C’est le « flex » de Flexbox : des boîtes **souples**."
  },
  {
    id: "finale", ch: 6, boss: true, title: "La grande fête de l’étang", notion: "mission finale",
    say: "C’est la nuit de la grande fête ! Les six lucioles sont là. Range-les toutes sur leurs feuilles avec tout ce que tu as appris, et l’étang brillera de mille feux.",
    lesson: {
      what: "Cette mission réunit les propriétés du **conteneur** et celles des **enfants**. Avance pas à pas : d’abord l’étang, ensuite les lucioles une par une. Les objectifs te disent ce qui manque.",
      why: "C’est exactement comme ça qu’on travaille sur un vrai site : d’abord on règle la boîte qui contient (direction, répartition, alignement), puis on traite les exceptions, élément par élément.",
      code: `.etang {\n  display: flex;\n  justify-content: …;\n  align-items: …;\n}\n\n.violette {\n  order: …;\n  align-self: …;\n}`,
      pieces: [["le conteneur", "`display`, `justify-content`, `align-items` : la règle pour tout le monde"], ["les enfants", "`order`, `align-self` : les exceptions"], ["les feuilles", "observe-les bien : leur place te dit quelles valeurs choisir"]],
      trap: "Tout écrire d’un coup, puis chercher ce qui ne va pas. Ajoute une ligne, regarde le plateau, puis passe à la suivante."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte", "orange", "violette"),
    steps: [
      "Allume Flexbox sur l’étang.",
      "Répartis les lucioles avec **le même espace partout**, bords compris.",
      "Centre-les **en hauteur**.",
      "La violette passe **devant** toutes les autres, et se pose **en haut**.",
      "L’orange se pose **en bas**."
    ],
    starter: `.etang {\n  \n}\n\n.violette {\n  \n}\n\n.orange {\n  \n}\n`,
    goals: [
      { label: "L’étang utilise `display: flex`", test: isFlex },
      { label: "Le même espace partout : `justify-content: space-evenly`", test: c => { const v = et(c, "justify-content"); return v === "space-evenly" || (/space-(around|between)/.test(v) ? "Presque : regarde l’espace contre les bords, il doit être le même qu’entre les lucioles." : false); } },
      { label: "Les lucioles sont centrées en hauteur : `align-items: center`", test: c => et(c, "align-items") === "center" },
      { label: "La violette passe devant (`order`) et se pose en haut (`align-self`)", test: c => (parseInt(cs(c, ".violette", "order"), 10) < 0 && ["flex-start", "start"].includes(cs(c, ".violette", "align-self"))) || (parseInt(cs(c, ".violette", "order"), 10) < 0 ? "Elle passe bien devant. Il reste à la poser en haut avec `align-self`." : false) },
      { label: "L’orange se pose en bas (`align-self`)", test: c => ["flex-end", "end"].includes(cs(c, ".orange", "align-self")) },
      { label: "Toutes les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Commence par l’étang : `display: flex;`, puis `justify-content: space-evenly;` et `align-items: center;`.", "Pour la violette : un `order` négatif pour passer devant, et `align-self: flex-start;` pour monter.", "Pour l’orange : `align-self: flex-end;`."],
    solution: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.violette {\n  order: -1;\n  align-self: flex-start;\n}\n\n.orange {\n  align-self: flex-end;\n}`,
    debrief: "Bravo ! Tu as réglé un conteneur flex complet **et** ses exceptions. Avec `display`, `justify-content`, `align-items`, `flex-direction`, `flex-wrap`, `gap`, `order`, `align-self` et `flex-grow`, tu connais tout ce qu’on utilise vraiment au quotidien. Les menus, les barres de boutons, les cartes, les blocs centrés : tu sais maintenant les construire. Prochaine étape : les grilles en deux dimensions, dans le potager de Kami !"
  }
  ]
};
