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
const selHas = (r, s) => (r.sel || "").split(",").map(x => x.trim()).includes(s);
/* Un étang plus étroit, avec un bord visible, pour les missions « plusieurs lignes » */
const NARROW = `.etang{max-width:300px;border-right:3px dashed rgba(255,255,255,.35)}`;
/* Un halo clair qui montre la vraie taille de chaque boîte (missions sur les tailles) */
const HALO = `.luciole{border-radius:32px;background-color:rgba(255,255,255,.09)}`;
/* Les règles écrites dans la media query des écrans de 600px ou moins */
const MQ600 = c => (c.rules || []).filter(r => r.media && /max-width\s*:\s*600px/i.test(r.media));
/* Exemples de la leçon (mini-aperçu) */
const EX_BASE = `.boite{background:#EEEAFF;border:2px dashed #7B5CFF;border-radius:10px;padding:6px;min-height:40px}.boite>div{background:#FFD43B;border:2px solid #1B2440;border-radius:8px;padding:6px 12px;font-weight:700;margin:0}`;
const EX_HTML = `<div class="boite"><div>1</div><div>2</div><div>3</div></div>`;
const EX_NEST = `.entete{display:flex;justify-content:space-between;align-items:center;background:#EEEAFF;border:2px dashed #7B5CFF;border-radius:10px;padding:6px}.logo{background:#69DB7C;border:2px solid #1B2440;border-radius:8px;padding:8px 12px;font-weight:700}.liens{border:2px dashed #FF6BB5;border-radius:8px;padding:4px}.liens>div{background:#FFD43B;border:2px solid #1B2440;border-radius:8px;padding:2px 10px;font-weight:700}`;

const GAME = {
  id: "kami-lucioles",
  name: "Kami et les lucioles",
  title: ["Kami", "Flexbox"],
  kicker: "Flexbox · pour bien démarrer dans le web",
  lead: "La nuit tombe sur l’étang. Kami le caméléon doit guider ses amies les lucioles jusqu’aux feuilles de nénuphar de leur couleur. Sa baguette magique : **Flexbox**, l’outil du CSS pour aligner des éléments. Chaque atelier terminé allume une luciole autour de Kami.",
  mode: "board",
  lang: "css",
  rewardWord: "lucioles allumées",
  rewardLabel: "À gagner",
  rewardMsg: "Une nouvelle luciole brille près de Kami :",
  chapterNote: "Chaque atelier terminé allume une luciole autour de Kami.",
  finaleTitle: "L’étang brille de mille feux !",
  confetti: ["#FFD43B", "#FF6BB5", "#4CC9F0", "#69DB7C", "#7B5CFF"],
  links: { html: "https://diurndesign.github.io/Html_game/", css: null, js: "https://diurndesign.github.io/javascript_game/" },
  next: {
    name: "Kami et le potager (Grid)",
    url: "https://diurndesign.github.io/Grid-game/",
    title: "La suite : le potager de Kami, avec CSS Grid",
    text: "Flexbox range les éléments dans **une seule direction** : une ligne ou une colonne. Pour placer des éléments en lignes **et** en colonnes à la fois, il existe **CSS Grid**. Tu y retrouveras des amis : le conteneur, les éléments, `gap`, `justify-content`, `align-items`… Kami t’attend dans son potager !"
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
    before: {
      title: "Ce qu’il faut savoir avant de commencer",
      text: "Flexbox, c’est du **CSS**. Ce jeu suit le jeu CSS (« Mission Kami ») : tu peux commencer si tu sais déjà…",
      items: [
        "écrire une **règle** CSS : un **sélecteur**, des accolades `{ }`, et dedans des **déclarations** `propriété: valeur;` ;",
        "viser des éléments par leur **classe**, avec un point : `.etang`, `.rose` ;",
        "reconnaître dans le HTML un élément **parent** et ses **enfants** (les éléments imbriqués dedans) ;",
        "utiliser les unités `px` et `%`, et le **modèle de boîte** : `width`, `height`, `padding`, `margin` ;",
        "la **cascade** : quand deux règles se contredisent, la plus précise gagne, et à égalité, la dernière écrite ;",
        "relier un fichier CSS à une page avec `<link rel=\"stylesheet\" href=\"style.css\">`."
      ],
      link: { label: "Revoir le jeu CSS", url: "https://diurndesign.github.io/Css_game/" }
    },
    cards: [
      { title: "C’est quoi ?", text: ["**Flexbox** (pour *flexible box*, « boîte souple ») est une partie du **CSS**, le langage qui décide de l’apparence d’une page web.", "C’est une façon de **ranger** des éléments : on prend une boîte, le **conteneur flex**, et on lui dit comment placer les boîtes qu’elle contient, ses **éléments flex** : en ligne ou en colonne, collés au début, au centre, espacés…"] },
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
      text: "Deux sortes de réglages : ceux du **conteneur flex** (le parent), qui rangent tous les éléments d’un coup, et ceux d’**un élément flex**, pour le régler tout seul.",
      lang: "css",
      code: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.rose {\n  order: -1;\n}`,
      pieces: [
        [".etang", "le **conteneur flex** : la boîte qui contient les lucioles. C’est elle qu’on règle"],
        ["display: flex", "« range tes enfants avec Flexbox ». Sans cette déclaration, rien d’autre ne marche"],
        ["justify-content", "place les éléments le long de l’**axe principal** (de gauche à droite par défaut) : au début, au centre, espacés…"],
        ["align-items", "place les éléments sur l’**axe secondaire**, l’autre direction : en haut, au milieu, en bas"],
        [".rose", "un **élément flex** en particulier : certaines propriétés se mettent sur un seul élément"],
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
      ["**Conteneur flex**", "la boîte « parent » sur laquelle on écrit `display: flex`. Ici : l’étang."],
      ["**Élément flex**", "chaque **enfant direct** du conteneur flex : c’est lui que Flexbox range. Ici : les lucioles."],
      ["**Axe principal**", "la direction dans laquelle les éléments se rangent : de gauche à droite par défaut. `justify-content` agit sur cet axe."],
      ["**Axe secondaire**", "la direction perpendiculaire, qui croise l’axe principal (de haut en bas par défaut). `align-items` agit sur cet axe."],
      ["**Espace libre**", "la place du conteneur qui n’est occupée par aucun élément. Flexbox sait la partager ou la donner à un élément."],
      ["**Retour à la ligne**", "quand il n’y a plus de place, les éléments continuent sur une nouvelle ligne (`flex-wrap: wrap`)."]
    ],
    traps: [
      "Écrire `display: flex` sur les éléments au lieu du conteneur. On l’écrit toujours sur la **boîte qui contient**.",
      "Inventer des valeurs comme `justify-content: right` ou `middle`. Les vraies : `flex-start`, `flex-end`, `center`, `space-between`…",
      "Mélanger les deux axes : `justify-content` suit l’axe principal, `align-items` l’axe secondaire. Et tout tourne quand on passe en colonne !",
      "Essayer de centrer en hauteur sans hauteur : si la boîte est juste assez haute pour son contenu, il n’y a pas de place pour bouger."
    ],
    tools: [
      "Un éditeur de code gratuit : **VS Code**, avec un fichier `index.html` et un fichier `style.css`.",
      "Dans Chrome ou Firefox : clic droit, puis **Inspecter**. Un petit badge `flex` apparaît à côté du conteneur : clique dessus pour voir les axes et les espaces.",
      "La documentation **MDN** (developer.mozilla.org, en français) explique chaque propriété avec des exemples."
    ],
    ctaTitle: "Prêt à guider les lucioles ?",
    ctaText: "21 missions t’attendent, de ta toute première ligne de Flexbox jusqu’à la grande fête de l’étang. Chaque atelier terminé allume une luciole autour de Kami."
  },

  /* ------------------------------------------------------------------
     LEXIQUE, BONNES PRATIQUES, PRÊT POUR LA SUITE ?
     ------------------------------------------------------------------ */
  glossary: [
    ["**Flexbox**", "la partie du CSS qui range des éléments dans **une seule direction** (une ligne ou une colonne). Son nom vient de *flexible box*, « boîte souple »."],
    ["**Conteneur flex**", "la boîte parent sur laquelle on écrit `display: flex`. Ses enfants directs deviennent des éléments flex.", ".etang {\n  display: flex;\n}"],
    ["**Élément flex**", "un **enfant direct** d’un conteneur flex. C’est lui que Flexbox range. Les petits-enfants, eux, ne sont pas concernés."],
    ["**Parent / enfant**", "dans le HTML, une boîte qui en contient une autre est son **parent** ; la boîte contenue est son **enfant**. Un enfant **direct** est juste un niveau en dessous."],
    ["**Axe principal**", "la direction dans laquelle les éléments flex se rangent. Par défaut, de gauche à droite (`row`). `justify-content` agit sur lui."],
    ["**Axe secondaire**", "aussi appelé **axe transversal** : la direction qui croise l’axe principal (de haut en bas par défaut). `align-items` agit sur lui."],
    ["**Début / fin de l’axe**", "les deux bouts d’un axe. Flexbox ne dit pas « gauche » ou « droite » mais `flex-start` (début) et `flex-end` (fin)."],
    ["**Sens**", "la direction d’un axe, choisie avec `flex-direction` : en ligne ou en colonne, à l’endroit ou à l’envers (`-reverse`)."],
    ["**Espace libre**", "la place du conteneur qui n’est occupée par aucun élément. `justify-content` la partage, `flex-grow` la donne à un élément."],
    ["**Ligne flex**", "une rangée d’éléments dans le conteneur. Avec `flex-wrap: wrap`, il peut y en avoir plusieurs."],
    ["**Retour à la ligne**", "quand la place manque, les éléments continuent sur une nouvelle ligne flex, comme les mots d’un texte. Se règle avec `flex-wrap`."],
    ["**Valeur par défaut**", "la valeur qu’a une propriété quand on n’écrit rien. Par exemple `flex-direction: row`, `flex-wrap: nowrap`, `order: 0`."],
    ["**display**", "la propriété qui choisit le mode d’affichage d’une boîte. Avec `flex`, la boîte devient un conteneur flex.", ".etang {\n  display: flex;\n}"],
    ["**justify-content**", "place les éléments flex sur l’**axe principal** : `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`.", ".menu {\n  display: flex;\n  justify-content: space-between;\n}"],
    ["**align-items**", "place les éléments flex sur l’**axe secondaire** : `stretch` (par défaut), `flex-start`, `flex-end`, `center`.", ".menu {\n  display: flex;\n  align-items: center;\n}"],
    ["**align-self**", "comme `align-items`, mais pour **un seul** élément flex : une exception à la règle du conteneur.", ".rose {\n  align-self: center;\n}"],
    ["**align-content**", "place **les lignes** dans le conteneur quand il y en a plusieurs (avec `flex-wrap: wrap`).", ".etang {\n  flex-wrap: wrap;\n  align-content: center;\n}"],
    ["**flex-direction**", "choisit l’axe principal : `row` (en ligne), `column` (en colonne), `row-reverse`, `column-reverse`.", ".etang {\n  flex-direction: column;\n}"],
    ["**flex-wrap**", "autorise ou non le retour à la ligne : `nowrap` (par défaut) ou `wrap`.", ".etang {\n  flex-wrap: wrap;\n}"],
    ["**gap**", "l’**écart** entre les éléments, et seulement entre eux (rien contre les bords). Se met sur le conteneur. Existe aussi dans CSS Grid.", ".etang {\n  gap: 20px;\n}"],
    ["**order**", "change la place d’affichage d’un élément flex. Par défaut `0` ; les plus petits nombres passent devant. Le HTML, lui, ne change pas.", ".verte {\n  order: -1;\n}"],
    ["**flex-grow**", "la **croissance** : la part d’espace libre qu’un élément flex prend pour grandir. Par défaut `0`.", ".jaune {\n  flex-grow: 1;\n}"],
    ["**flex-shrink**", "le **rétrécissement** : la capacité d’un élément à rétrécir quand la place manque. Par défaut `1` ; `0` l’en empêche."],
    ["**flex-basis**", "la **taille de base** d’un élément flex sur l’axe principal, avant qu’il grandisse ou rétrécisse.", ".jaune {\n  flex-basis: 120px;\n}"],
    ["**flex**", "la **propriété raccourcie** qui regroupe `flex-grow`, `flex-shrink` et `flex-basis`, dans cet ordre.", ".jaune {\n  flex: 0 0 120px;\n}\n.rose {\n  flex: 1;\n}"],
    ["**Propriété raccourcie**", "une propriété qui en règle plusieurs d’un coup, comme `flex`, `gap` ou `margin`."],
    ["**Marge automatique**", "une marge réglée sur `auto` : dans un conteneur flex, elle avale tout l’espace libre de son côté et pousse l’élément.", ".panier {\n  margin-left: auto;\n}"],
    ["**Imbrication**", "des boîtes dans des boîtes. Un élément flex peut être lui-même un conteneur flex pour ses propres enfants.", ".entete {\n  display: flex;\n}\n.liens {\n  display: flex;\n}"],
    ["**Règle**", "un sélecteur suivi d’un bloc de déclarations entre accolades `{ }`.", ".etang {\n  display: flex;\n}"],
    ["**Sélecteur**", "la partie d’une règle qui dit **quels éléments** on vise : `.etang` vise les éléments de classe `etang`."],
    ["**Déclaration**", "une ligne `propriété: valeur;` dans une règle. Le point-virgule la termine."],
    ["**Propriété / valeur**", "la **propriété** est le réglage (`justify-content`), la **valeur** est le choix qu’on lui donne (`center`)."],
    ["**Cascade**", "la façon dont le CSS choisit quand deux règles se contredisent : la plus précise gagne ; à égalité, la dernière écrite."],
    ["**Responsive**", "se dit d’une page qui s’adapte à toutes les tailles d’écran, du téléphone au grand écran."],
    ["**Media query**", "un bloc `@media` qui contient des règles appliquées **seulement** quand une condition est vraie, par exemple un écran étroit.", "@media (max-width: 600px) {\n  .etang {\n    flex-direction: column;\n  }\n}"],
    ["**Point de rupture**", "la largeur d’écran à partir de laquelle la mise en page change (ici `600px`). En anglais : *breakpoint*."],
    ["**Inspecteur**", "l’outil du navigateur (clic droit, **Inspecter**) qui montre le HTML et le CSS d’une page. Le badge `flex` y dessine les axes et les espaces."]
  ],
  practices: [
    "Écris `display: flex` sur le **parent** (le conteneur flex), jamais sur les éléments que tu veux ranger.",
    "Avant de choisir une propriété, repère l’axe : `justify-content` pour l’axe principal, `align-items` pour l’axe secondaire.",
    "Espace tes éléments avec `gap` sur le conteneur plutôt qu’avec des `margin` sur chaque élément.",
    "Laisse Flexbox calculer les tailles (`flex: 1`, `flex-basis`) au lieu de fixer des largeurs en pixels qui cassent sur petit écran.",
    "Commence par la règle générale sur le conteneur, puis traite les exceptions élément par élément (`align-self`, `order`, `flex`).",
    "Garde l’ordre du HTML logique : `order` et `row-reverse` ne changent que l’affichage, pas l’ordre suivi au clavier et par les lecteurs d’écran.",
    "Ajoute `flex-wrap: wrap` dès qu’une rangée peut manquer de place : cartes, photos, étiquettes.",
    "Nomme tes classes selon leur **rôle** (`.menu`, `.liens`, `.boutons`), pas selon leur apparence (`.jaune-a-droite`).",
    "Une déclaration par ligne, indentée de 2 espaces, et un commentaire `/* … */` pour expliquer les réglages qui ne sont pas évidents.",
    "Teste ta mise en page en largeur téléphone, et place tes media queries à la fin de ton fichier CSS.",
    "Utilise Flexbox pour ranger dans **une** direction (menu, barre de boutons, intérieur d’une carte) ; pour une mise en page en lignes **et** en colonnes, passe à Grid.",
    "Quand un élément ne se place pas comme prévu, ouvre l’inspecteur du navigateur et clique sur le badge `flex` pour voir les axes et l’espace libre."
  ],
  checklist: [
    { text: "Je sais ce qu’est un **conteneur flex** et un **élément flex**, et sur lequel des deux j’écris `display: flex`.", mission: "display-flex" },
    { text: "Je sais placer les éléments au début, au centre ou à la fin de l’**axe principal** avec `justify-content`.", mission: "justify-end" },
    { text: "Je sais partager l’**espace libre** avec `space-between`, `space-around` et `space-evenly`.", mission: "space-evenly" },
    { text: "Je sais aligner les éléments sur l’**axe secondaire** avec `align-items`.", mission: "align-end" },
    { text: "Je sais centrer un élément en largeur et en hauteur, de mémoire.", mission: "centrer" },
    { text: "Je sais faire une exception pour un seul élément avec `align-self`.", mission: "align-self" },
    { text: "Je sais passer en colonne avec `flex-direction` et dire ce que deviennent les deux axes.", mission: "column" },
    { text: "Je sais changer l’ordre d’affichage (`row-reverse`, `order`) sans toucher au HTML, et je connais la limite pour l’accessibilité.", mission: "order" },
    { text: "Je sais laisser les éléments passer à la ligne avec `flex-wrap` et placer les lignes avec `align-content`.", mission: "align-content" },
    { text: "Je sais espacer les éléments avec `gap` (on le retrouve tel quel dans Grid).", mission: "gap" },
    { text: "Je sais utiliser `flex: 1` pour un élément souple et `flex: 0 0 120px` pour un élément de taille fixe.", mission: "flex-basis" },
    { text: "Je sais pousser un élément au bout de la ligne avec `margin-left: auto` (le menu avec logo à gauche).", mission: "margin-auto" },
    { text: "Je sais faire d’un élément flex un nouveau conteneur flex (des boîtes dans des boîtes).", mission: "flex-imbrique" },
    { text: "Je sais écrire une media query `@media (max-width: 600px)` pour changer la mise en page sur téléphone.", mission: "responsive" },
    { text: "Je sais expliquer quand choisir Flexbox (une dimension) et quand choisir Grid (deux dimensions).", mission: "finale" }
  ],

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
      "Ajoute `gap: 30px` sur l’étang, puis `order: -1` sur la luciole verte.",
      "Mets `margin-left: auto` sur la luciole bleue : que devient la verte ?"
    ],
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    starter: `.etang {\n  display: flex;\n}\n\n.verte {\n  \n}\n`,
    hints: []
  },

  /* ------------------------------------------------------------------
     ATELIERS
     ------------------------------------------------------------------ */
  chapters: [
    { n: 1, title: "Le réveil", piece: "La luciole jaune", notions: ["display: flex", "conteneur et éléments flex", "justify-content", "axe principal"],
      skills: [
        "Je sais transformer une boîte en **conteneur flex** avec `display: flex`, écrit sur le parent.",
        "Je sais que les **éléments flex** sont les enfants directs du conteneur.",
        "Je sais ce qu’est l’**axe principal** et son sens par défaut : de gauche à droite.",
        "Je sais placer les éléments au début, au centre ou à la fin de l’axe principal avec `justify-content`."
      ] },
    { n: 2, title: "Se répartir", piece: "La luciole rose", notions: ["espace libre", "space-between", "space-around", "space-evenly"],
      skills: [
        "Je sais ce qu’est l’**espace libre** d’un conteneur flex.",
        "Je sais le partager entre les éléments avec `space-between`, `space-around` et `space-evenly`.",
        "Je sais reconnaître la bonne valeur en regardant l’espace contre les bords."
      ] },
    { n: 3, title: "Haut et bas", piece: "La luciole bleue", notions: ["axe secondaire", "align-items", "centrer", "align-self"],
      skills: [
        "Je sais ce qu’est l’**axe secondaire** et j’y place les éléments avec `align-items`.",
        "Je sais centrer un élément en largeur et en hauteur avec la recette des trois lignes.",
        "Je sais faire une exception pour un seul élément flex avec `align-self`."
      ] },
    { n: 4, title: "Direction et ordre", piece: "La luciole verte", notions: ["flex-direction", "column", "row-reverse", "order"],
      skills: [
        "Je sais changer le sens de l’axe principal avec `flex-direction` (`row`, `column`).",
        "Je sais expliquer ce que deviennent `justify-content` et `align-items` quand on passe en colonne.",
        "Je sais inverser l’ordre d’affichage avec `row-reverse`, ou déplacer un seul élément avec `order`.",
        "Je sais que le clavier et les lecteurs d’écran suivent toujours l’ordre du HTML."
      ] },
    { n: 5, title: "Plusieurs lignes", piece: "La luciole orange", notions: ["flex-wrap", "align-content", "gap"],
      skills: [
        "Je sais laisser les éléments passer à la ligne avec `flex-wrap: wrap`.",
        "Je sais placer les lignes dans le conteneur avec `align-content`, et je ne le confonds pas avec `align-items`.",
        "Je sais espacer les éléments avec `gap`, sans aucune marge."
      ] },
    { n: 6, title: "Des boîtes souples", piece: "La luciole violette", notions: ["flex-grow", "flex-basis, flex-shrink, flex", "margin-left: auto", "imbrication", "media query"],
      skills: [
        "Je sais faire grandir un élément avec `flex-grow` et utiliser le raccourci `flex` (`flex: 1`, `flex: 0 0 120px`).",
        "Je sais pousser un élément au bout de la ligne avec `margin-left: auto`.",
        "Je sais imbriquer un conteneur flex dans un autre, comme dans un vrai menu.",
        "Je sais changer la mise en page sur téléphone avec une **media query**.",
        "Je sais combiner les réglages du conteneur et des éléments pour construire une mise en page complète."
      ] }
  ],

  levels: [
  /* ------------------------------ ATELIER 1 ------------------------------ */
  {
    id: "display-flex", ch: 1, title: "Le réveil des lucioles", notion: "display: flex",
    say: "Psst ! Mes amies les lucioles dorment encore, empilées les unes sous les autres. Allume Flexbox sur l’étang : elles vont se ranger en ligne !",
    lesson: {
      what: ["Dans une page web, les éléments sont rangés dans des **boîtes**. Une boîte qui en contient d’autres est leur **parent** ; les boîtes qu’elle contient sont ses **enfants**.", "Quand on écrit `display: flex` sur un parent, il devient un **conteneur flex**, et chacun de ses **enfants directs** devient un **élément flex** : Flexbox les range alors **en ligne**, de gauche à droite.", "Ici, le conteneur flex est l’étang (`.etang`) et les éléments flex sont les lucioles."],
      why: "Sans Flexbox, chaque bloc prend toute la largeur et passe sous le précédent. Avec une seule déclaration, les blocs se mettent côte à côte : c’est la base de tous les menus, barres de boutons et rangées de cartes.",
      code: `.etang {\n  display: flex;\n}`,
      pieces: [[".etang", "le **sélecteur** : la boîte qu’on vise, ici le futur conteneur flex"], ["display", "la **propriété** : le mode d’affichage de la boîte"], ["flex", "la **valeur** : « range mes enfants avec Flexbox »"], ["display: flex;", "une **déclaration** complète : propriété, deux-points, valeur, point-virgule"], ["{ }", "les accolades entourent les déclarations : le tout forme une **règle**"]],
      example: { code: `.boite {\n  display: flex;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Écrire `display: flex` sur les lucioles (`.luciole`) au lieu de l’étang. On l’écrit toujours sur la **boîte qui contient** : ce sont ses enfants qui se rangent, pas elle.",
      good: "Écris `display: flex` en **première** déclaration de la règle du conteneur, une déclaration par ligne, indentée de 2 espaces. En relisant ton code, tu verras tout de suite quelle boîte est un conteneur flex."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Dans la règle `.etang`, sur la ligne vide, écris la déclaration `display: flex;`.", "Regarde les lucioles se ranger en ligne, chacune au-dessus de sa feuille.", "Clique sur **Vérifier**."],
    starter: `.etang {\n  \n}\n`,
    goals: [
      { label: "L’étang est un conteneur flex (`display: flex`)", test: isFlex },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Écris ta déclaration entre les accolades `{` et `}` de `.etang`.", "Une déclaration, c’est `propriété: valeur;`. La propriété ici est `display`.", "`display: flex;`"],
    solution: `.etang {\n  display: flex;\n}`,
    debrief: "Une seule déclaration, et les enfants passent de « empilés » à « en ligne ». L’étang est devenu un **conteneur flex** et les lucioles des **éléments flex**. Retiens la règle d’or : Flexbox s’allume **sur le parent**. Dans la vraie vie, c’est la première ligne qu’on écrit pour faire un menu horizontal."
  },
  {
    id: "justify-end", ch: 1, title: "Tout au bout de l’étang", notion: "justify-content",
    say: "Le courant a fait dériver les feuilles tout à droite ! Pousse les lucioles au bout de la ligne pour qu’elles se posent.",
    lesson: {
      what: ["Dans un conteneur flex, les éléments se rangent le long d’une ligne imaginaire : l’**axe principal**. Par défaut, il va de gauche à droite, comme quand on lit. Il a un **début** (à gauche) et une **fin** (à droite).", "La propriété `justify-content` (« justifier le contenu ») décide **où** les éléments flex se placent sur cet axe : au début, à la fin ou au centre. Si on n’écrit rien, elle garde sa **valeur par défaut**, `flex-start` : tout au début."],
      why: "Pousser des éléments à droite ou les centrer, c’est un besoin de tous les jours : les boutons d’un formulaire alignés à droite, un titre centré, un panier en haut à droite d’un site…",
      code: `.etang {\n  display: flex;\n  justify-content: flex-end;\n}`,
      pieces: [["flex-start", "au début de l’axe principal, à gauche (c’est la valeur par défaut)"], ["flex-end", "à la fin de l’axe principal, à droite"], ["center", "au centre de l’axe principal"]],
      example: { code: `.boite {\n  display: flex;\n  justify-content: center;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Écrire `justify-content: right` parce que c’est plus naturel. En Flexbox, on raisonne en **début** et **fin** de l’axe : la bonne valeur est `flex-end`.",
      good: "Pense « début » et « fin » de l’axe plutôt que « gauche » et « droite » : ce vocabulaire reste juste quand l’axe tourne (en colonne), ou sur un site dans une langue qui s’écrit de droite à gauche, comme l’arabe."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Garde `display: flex` : sans lui, `justify-content` ne fait rien.", "En dessous, ajoute `justify-content` avec la valeur qui envoie les lucioles **à la fin** de l’axe principal."],
    starter: `.etang {\n  display: flex;\n  \n}\n`,
    goals: [
      { label: "`justify-content` vaut `flex-end`", test: c => { const v = et(c, "justify-content"); return v === "flex-end" || v === "end" || (v === "right" ? "Ça marche à l’écran, mais en Flexbox la valeur à retenir est `flex-end`." : (v === "center" ? "Au centre, c’est presque ça : il faut aller jusqu’au bout de la ligne." : false)); } },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété à ajouter : `justify-content`.", "« À la fin » se dit `end` en anglais, et Flexbox ajoute `flex-` devant.", "`justify-content: flex-end;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: flex-end;\n}`,
    debrief: "`justify-content` agit sur l’**axe principal** : en ligne, c’est l’horizontale. `flex-start` au début, `flex-end` à la fin, `center` au milieu. Remarque que l’ordre des lucioles ne change pas : elles glissent ensemble, comme un train. Sur un vrai site, c’est ce qui aligne à droite les boutons « Annuler » et « Valider » d’un formulaire."
  },

  /* ------------------------------ ATELIER 2 ------------------------------ */
  {
    id: "space-between", ch: 2, title: "Chacune sa place", notion: "justify-content: space-between",
    say: "Les lucioles se serrent toutes au milieu, elles vont se marcher sur les ailes ! Écarte-les : une à chaque bord, les autres bien réparties entre elles.",
    lesson: {
      what: ["La place du conteneur qui n’est occupée par aucun élément s’appelle l’**espace libre**. Ici : la largeur de l’étang, moins la largeur des lucioles.", "`justify-content` ne sert pas qu’à pousser le groupe : il peut aussi **partager l’espace libre** entre les éléments flex. Avec `space-between` (« espace entre »), le premier élément se colle au début, le dernier à la fin, et l’espace libre est partagé à parts égales **entre** eux."],
      why: "C’est la valeur des barres de navigation : le logo tout à gauche, le menu tout à droite. Ou d’une barre d’onglets en bas d’une appli, où les icônes sont réparties sur toute la largeur.",
      code: `.etang {\n  display: flex;\n  justify-content: space-between;\n}`,
      pieces: [["space-between", "le premier au début, le dernier à la fin, le même espace entre chacun"], ["l’espace libre", "la largeur du conteneur moins celle des éléments : c’est lui qui est partagé"]],
      example: { code: `.boite {\n  display: flex;\n  justify-content: space-between;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Ajouter des marges (`margin`) à la main pour écarter les éléments. Si l’écran change de taille, tout se décale. `space-between` recalcule l’espace tout seul.",
      good: "Laisse Flexbox partager l’espace libre au lieu de calculer des marges en pixels : ta mise en page restera juste sur tous les écrans, sans que tu aies à refaire le calcul."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Pour l’instant, `justify-content` vaut `center` : les lucioles sont serrées au milieu.", "Change cette valeur pour que l’espace libre se partage **entre** les lucioles, avec une luciole à chaque bord."],
    starter: `.etang {\n  display: flex;\n  justify-content: center;\n}\n`,
    goals: [
      { label: "`justify-content` vaut `space-between`", test: c => { const v = et(c, "justify-content"); return v === "space-between" || (/space-(around|evenly)/.test(v) ? "Presque ! Avec cette valeur, il reste de l’espace aux bords. Il faut que la première et la dernière luciole touchent les bords." : false); } },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Ne rajoute pas de ligne : modifie seulement la valeur `center`.", "« Espace entre » se dit *space between* en anglais.", "`justify-content: space-between;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: space-between;\n}`,
    debrief: "Avec `space-between`, tu ne choisis pas la taille des espaces : Flexbox mesure l’**espace libre** et le partage. Sur un écran plus large, les lucioles resteraient collées aux bords, avec des espaces plus grands. C’est ça, la **souplesse** de Flexbox, et c’est la valeur de presque toutes les barres de navigation."
  },
  {
    id: "space-evenly", ch: 2, title: "Des espaces bien égaux", notion: "space-around, space-evenly",
    say: "Les feuilles du bord ont dérivé vers le milieu. Cette fois, je veux exactement le même espace partout : entre les lucioles, et aussi contre les bords de l’étang.",
    lesson: {
      what: ["Deux autres valeurs de `justify-content` partagent aussi l’espace libre, mais en en mettant **aux bords** :", "Avec `space-around` (« espace autour »), chaque élément flex reçoit le même espace à sa gauche et à sa droite. Résultat : entre deux éléments, les espaces s’additionnent, donc les bords ont **moitié moins** d’espace.", "Avec `space-evenly` (« espace égal »), **tous** les espaces sont identiques, bords compris."],
      why: "Pour une rangée d’icônes, de logos de partenaires ou de cartes, on veut souvent que rien ne colle aux bords. `space-evenly` donne le rendu le plus régulier à l’œil.",
      code: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n}`,
      pieces: [["space-between", "rien aux bords, tout l’espace libre entre les éléments"], ["space-around", "un demi-espace aux bords, un espace entier entre les éléments"], ["space-evenly", "exactement le même espace partout"]],
      example: { code: `.boite {\n  display: flex;\n  justify-content: space-around;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Confondre `space-around` et `space-evenly`. Regarde les bords : s’ils ont **moins** d’espace qu’entre les éléments, c’est `space-around`.",
      good: "Choisis la valeur d’après la maquette, puis vérifie en largeur téléphone : avec peu de place, l’espace libre fond et les éléments peuvent se toucher. Si ça arrive, ajoute un `gap` (tu le verras à l’atelier 5) pour garantir un écart minimum."
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
    debrief: "Tu connais maintenant toute la famille `space-` : `between` (rien aux bords), `around` (un demi-espace aux bords), `evenly` (tout pareil). Les trois partagent l’espace libre automatiquement : sur un téléphone, les espaces rétrécissent, sur un grand écran, ils grandissent. Pense à `space-evenly` pour une rangée de logos de partenaires en bas d’un site."
  },
  {
    id: "quiz1", ch: 2, quiz: true, title: "Le contrôle de la nuit", notion: "quiz",
    say: "Avant d’aller plus loin, vérifions que tu as bien compris comment ranger les lucioles sur l’axe principal. Tout juste, et la luciole rose s’allume !",
    questions: [
      { q: "Pour ranger les lucioles avec Flexbox, sur quelle boîte écrit-on `display: flex` ?", opts: ["Sur chaque luciole", "Sur l’étang, le conteneur qui les contient", "Dans le HTML, avec une balise `<flex>`"], a: 1, why: "Flexbox s’allume toujours sur le **parent**, qui devient un **conteneur flex**. Ses enfants directs, les **éléments flex**, se rangent ensuite." },
      { q: "Où vont les liens de ce menu ?", code: `.menu {\n  display: flex;\n  justify-content: flex-end;\n}`, lang: "css", opts: ["À gauche", "Au centre", "À droite, à la fin de l’axe principal"], a: 2, why: "`flex-end` envoie les éléments à la fin de l’axe principal : en ligne, c’est à droite." },
      { q: "Quelle valeur met **exactement le même espace** entre les éléments et contre les bords ?", opts: ["`space-evenly`", "`space-between`", "`space-around`"], a: 0, why: "`space-evenly` : tous les espaces sont égaux. `space-between` ne laisse rien aux bords, `space-around` en laisse moitié moins." },
      { q: "Avec `justify-content: space-between`, où sont le premier et le dernier élément ?", opts: ["Tous les deux au centre", "Collés aux bords, au début et à la fin", "À un demi-espace des bords"], a: 1, why: "Avec `space-between`, tout l’**espace libre** va **entre** les éléments : le premier et le dernier touchent les bords." }
    ],
    debrief: "Tu sais allumer Flexbox et répartir les éléments sur l’axe principal. C’est déjà ce qu’il faut pour la plupart des menus du web !"
  },

  /* ------------------------------ ATELIER 3 ------------------------------ */
  {
    id: "align-end", ch: 3, title: "Au ras de l’eau", notion: "align-items",
    say: "Les nénuphars flottent tout en bas de l’étang, près de l’eau. Mais les lucioles restent collées en haut ! Fais-les descendre.",
    lesson: {
      what: ["`justify-content` place les éléments flex **le long** de l’axe principal. Pour les placer dans l’autre direction, de haut en bas, on utilise `align-items` (« aligner les éléments »).", "Cette deuxième direction s’appelle l’**axe secondaire** (on dit aussi **axe transversal**) : il croise l’axe principal, comme les deux branches d’une croix."],
      why: "Dans une barre de menu, le logo est souvent plus grand que les liens. `align-items` permet d’aligner tout le monde en haut, en bas ou au milieu, pour que la barre ait l’air bien rangée.",
      code: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n}`,
      pieces: [["align-items", "place les éléments sur l’axe secondaire : en ligne, c’est la verticale"], ["flex-start", "au début de l’axe secondaire : en haut"], ["flex-end", "à la fin de l’axe secondaire : en bas"], ["center", "au milieu"], ["stretch", "étirés sur toute la hauteur : c’est la valeur par défaut, visible seulement si les éléments n’ont pas de hauteur fixée"]],
      example: { code: `.boite {\n  display: flex;\n  height: 90px;\n  align-items: flex-end;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Utiliser `justify-content` pour descendre les éléments. En ligne, `justify-content` ne bouge qu’à l’horizontale : pour la hauteur, c’est `align-items`.",
      good: "Avant d’écrire une propriété d’alignement, pose-toi la question : « dans quel axe je veux bouger ? ». Axe principal : `justify-content`. Axe secondaire : `align-items`. Ce réflexe évite de tester les valeurs au hasard."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Garde les deux déclarations déjà écrites : les lucioles sont bien centrées sur l’axe principal.", "Ajoute `align-items` pour les envoyer **en bas** de l’étang, à la fin de l’axe secondaire."],
    starter: `.etang {\n  display: flex;\n  justify-content: center;\n  \n}\n`,
    goals: [
      { label: "`align-items` vaut `flex-end`", test: c => { const v = et(c, "align-items"); return v === "flex-end" || v === "end" || (v === "center" ? "Au milieu, c’est un bon début : il faut descendre jusqu’en bas." : (v === "bottom" ? "La valeur `bottom` n’existe pas ici : en Flexbox, on dit `flex-end`." : false)); } },
      { label: "Elles restent centrées en largeur", test: c => et(c, "justify-content") === "center" || "Ne touche pas à `justify-content: center`." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété pour l’axe secondaire : `align-items`.", "Les valeurs sont les mêmes que pour `justify-content` : début, fin, centre.", "`align-items: flex-end;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n}`,
    debrief: "Tu as utilisé les **deux axes** en même temps : `justify-content` pour l’axe principal, `align-items` pour l’axe secondaire. Ça marche ici parce que l’étang est plus haut que les lucioles : s’il n’y a pas de place en hauteur, `align-items` n’a rien à faire. Sur un site, c’est ce qui aligne proprement un grand logo et des petits liens dans un en-tête."
  },
  {
    id: "centrer", ch: 3, title: "Le cœur de l’étang", notion: "centrer parfaitement",
    say: "La luciole bleue est la reine de l’étang. Sa feuille est pile au milieu, en largeur et en hauteur. Montre-lui le chemin !",
    lesson: {
      what: "Pour centrer un élément **parfaitement**, on combine les deux axes sur son conteneur flex : `justify-content: center` le centre sur l’axe principal (la largeur), `align-items: center` le centre sur l’axe secondaire (la hauteur).",
      why: "Pendant des années, centrer un élément en hauteur était un vrai casse-tête en CSS. Avec Flexbox, trois déclarations suffisent. On s’en sert partout : fenêtre de connexion, icône dans un bouton rond, message « page introuvable »…",
      code: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
      pieces: [["justify-content: center", "au centre sur l’axe principal (la largeur)"], ["align-items: center", "au centre sur l’axe secondaire (la hauteur)"], ["les trois déclarations", "la recette à retenir par cœur pour centrer n’importe quoi"]],
      example: { code: `.boite {\n  display: flex;\n  height: 90px;\n  justify-content: center;\n  align-items: center;\n}`, base: EX_BASE, html: `<div class="boite"><div>Au centre !</div></div>` },
      trap: "Essayer de centrer avec `text-align: center` ou des marges calculées à la main. `text-align` ne centre que du texte, et seulement en largeur.",
      good: "Écris la recette sur le **parent** de l’élément à centrer, jamais sur l’élément lui-même. Et garde `text-align: center` pour ce qu’il sait faire : centrer les lignes de texte à l’intérieur d’une boîte."
    },
    boardHTML: pond("bleue"),
    steps: ["Centre la luciole sur l’axe principal (**en largeur**) avec `justify-content`.", "Centre-la sur l’axe secondaire (**en hauteur**) avec `align-items`."],
    starter: `.etang {\n  display: flex;\n  \n}\n`,
    goals: [
      { label: "`justify-content` vaut `center`", test: c => et(c, "justify-content") === "center" },
      { label: "`align-items` vaut `center`", test: c => et(c, "align-items") === "center" || (et(c, "justify-content") === "center" ? "En largeur, c’est bon. Il reste la hauteur." : false) },
      { label: "La luciole est sur sa feuille", test: boardOK }
    ],
    hints: ["Il faut deux déclarations : une par axe.", "Les deux propriétés ont la même valeur : `center`.", "`justify-content: center;` puis `align-items: center;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    debrief: "`display: flex` + `justify-content: center` + `align-items: center` : c’est **la** recette pour centrer, à garder dans ta poche. Tu la réécriras des dizaines de fois : une fenêtre de connexion, une icône dans un bouton rond, un message au milieu de l’écran."
  },
  {
    id: "align-self", ch: 3, title: "La rose n’en fait qu’à sa tête", notion: "align-self",
    say: "Toutes les lucioles se posent en bas, au ras de l’eau… sauf la rose, qui adore rester au milieu de l’étang pour admirer la lune.",
    lesson: {
      what: ["Jusqu’ici, toutes les propriétés s’écrivaient sur le **conteneur flex** et réglaient tous les éléments d’un coup. Certaines s’écrivent sur **un seul élément flex**, pour le régler à part.", "`align-self` (« s’aligner soi-même ») est la version **pour un seul élément** de `align-items`. Le conteneur donne la règle générale avec `align-items`, et un élément peut faire une exception avec `align-self`. Il accepte les mêmes valeurs : `flex-start`, `flex-end`, `center`, `stretch`."],
      why: "Dans une carte produit, tous les éléments sont alignés en haut, sauf le badge « Promo » qu’on veut en bas. Ou dans un menu, un seul bouton qui doit se démarquer. Inutile de tout changer : on règle juste l’exception.",
      code: `.etang {\n  display: flex;\n  align-items: flex-end;\n}\n\n.rose {\n  align-self: center;\n}`,
      pieces: [["align-items", "sur le conteneur flex : la règle pour **tous** les éléments"], [".rose", "le sélecteur d’**un seul** élément flex, grâce à sa classe de couleur"], ["align-self", "sur cet élément : l’exception, rien que pour lui"], ["l’axe", "comme `align-items`, il agit sur l’axe secondaire (la hauteur, en ligne)"]],
      example: { code: `.boite {\n  display: flex;\n  height: 90px;\n  align-items: flex-start;\n}\n.deux {\n  align-self: flex-end;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div class="deux">2</div><div>3</div></div>` },
      trap: "Chercher un `justify-self` pour déplacer un seul élément sur l’axe principal : en Flexbox, il n’existe pas. Pour ça, tu découvriras plus loin `order` et les marges automatiques (`margin-left: auto`).",
      good: "Mets la règle générale sur le conteneur et seulement les exceptions sur les éléments. Si tu te retrouves à écrire `align-self` sur tous les éléments, c’est qu’il fallait un `align-items` sur le parent."
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
    debrief: "La règle générale sur le parent, l’exception sur l’enfant : c’est une logique qu’on retrouve partout en CSS. `align-self` gagne toujours sur `align-items` pour l’élément qui le porte. Sur un site, c’est le badge « Nouveau » qui se place autrement que le reste de la carte."
  },

  /* ------------------------------ ATELIER 4 ------------------------------ */
  {
    id: "column", ch: 4, title: "Les axes tournent", notion: "flex-direction: column",
    say: "Les lucioles volent vers la droite, mais ce soir elles veulent faire une tour, les unes sous les autres ! Change juste leur direction… et regarde bien ce qui se passe.",
    lesson: {
      what: ["`flex-direction` choisit le **sens** de l’**axe principal**, c’est-à-dire la direction dans laquelle les éléments flex se rangent. Par défaut, c’est `row` (« rangée ») : de gauche à droite.", "Avec `column` (« colonne »), les éléments se rangent **de haut en bas**. Et attention : les deux axes tournent avec ! L’axe principal devient vertical, l’axe secondaire horizontal. `justify-content` agit alors sur la **hauteur**, et `align-items` sur la **largeur**."],
      why: "Sur téléphone, on empile souvent ce qui était côte à côte sur ordinateur : un menu, des cartes, un formulaire. On passe simplement de `row` à `column`, sans changer le reste.",
      code: `.etang {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n}`,
      pieces: [["flex-direction: row", "axe principal horizontal, de gauche à droite (par défaut)"], ["flex-direction: column", "axe principal vertical, de haut en bas"], ["justify-content", "suit **toujours** l’axe principal : en colonne, c’est la hauteur"], ["align-items", "suit **toujours** l’axe secondaire : en colonne, c’est la largeur"]],
      example: { code: `.boite {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Croire que `justify-content` veut dire « horizontal ». Il veut dire « **le long de l’axe principal** ». Quand on passe en colonne, il devient vertical.",
      good: "Quand tu changes `flex-direction`, relis tes `justify-content` et `align-items` : ils gardent leur valeur mais changent d’axe. Un petit commentaire comme `/* axe principal : vertical */` aide à s’y retrouver en relisant."
    },
    boardHTML: pond("jaune", "rose", "verte"),
    steps: ["Les lucioles sont en ligne, à droite (`flex-end`), centrées en hauteur (`center`).", "Ajoute **seulement** `flex-direction: column;`, sans toucher aux autres déclarations.", "Observe : elles vont en bas et au centre. Les axes ont tourné !"],
    starter: `.etang {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  \n}\n`,
    goals: [
      { label: "`flex-direction` vaut `column`", test: c => et(c, "flex-direction") === "column" || (et(c, "flex-direction") === "column-reverse" ? "Pas à l’envers : juste `column`." : false) },
      { label: "`justify-content` et `align-items` n’ont pas changé", test: c => (["flex-end", "end"].includes(et(c, "justify-content")) && et(c, "align-items") === "center") || "Garde `justify-content: flex-end` et `align-items: center` : c’est la direction qui fait tout le travail." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété qui change la direction : `flex-direction`.", "« Colonne » se dit *column* en anglais.", "Sur la ligne vide : `flex-direction: column;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-direction: column;\n}`,
    debrief: "Une seule déclaration ajoutée, et `flex-end` qui voulait dire « à droite » veut maintenant dire « en bas ». Retiens : `justify-content` suit l’**axe principal**, `align-items` l’**axe secondaire**, et `flex-direction` décide lequel est lequel. C’est le point le plus important de tout Flexbox ! Sur un site, c’est la colonne de liens d’un pied de page, ou un menu qui s’empile sur téléphone."
  },
  {
    id: "reverse", ch: 4, title: "La file à l’envers", notion: "row-reverse, column-reverse",
    say: "Ce soir, c’est la verte qui mène la danse ! Les lucioles veulent voler dans l’autre sens : la verte en tête à gauche, la jaune en dernier, tout à droite.",
    lesson: {
      what: ["`flex-direction` a deux valeurs qui inversent le **sens** de l’axe principal :", "`row-reverse` range les éléments **de droite à gauche** : le premier enfant du HTML se retrouve tout à droite.", "`column-reverse` range les éléments **de bas en haut** : le premier enfant se retrouve tout en bas."],
      why: "On change l’ordre d’affichage **sans toucher au HTML**. Par exemple, sur une page qui alterne « image à gauche, texte à droite » puis « texte à gauche, image à droite », une rangée sur deux passe en `row-reverse`.",
      code: `.etang {\n  display: flex;\n  flex-direction: row-reverse;\n}`,
      pieces: [["row-reverse", "en ligne, de droite à gauche"], ["column-reverse", "en colonne, de bas en haut"], ["le début de l’axe", "s’inverse aussi : en `row-reverse`, le début (`flex-start`) est à droite"]],
      example: { code: `.boite {\n  display: flex;\n  flex-direction: row-reverse;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Utiliser `justify-content: flex-end` pour « inverser ». Les éléments vont bien à droite, mais **dans le même ordre**. Regarde les couleurs !",
      good: "Écris ton HTML dans l’ordre logique de lecture : c’est celui que suivent le clavier (touche Tab) et les lecteurs d’écran. Réserve `row-reverse` aux effets purement visuels."
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
  {
    id: "order", ch: 4, title: "Qui passe devant ?", notion: "order",
    say: "La verte veut ouvrir le bal, et la jaune préfère fermer la marche. Change leur place dans la file, sans toucher au HTML !",
    lesson: {
      what: ["`row-reverse` retourne toute la file. Pour déplacer **un seul** élément flex, on utilise `order` (« ordre »). Comme `align-self`, il s’écrit sur l’élément, pas sur le conteneur.", "Chaque élément flex a `order: 0` par défaut. Flexbox range les plus **petits** nombres en premier : un élément avec `order: -1` passe devant tout le monde, un élément avec `order: 1` passe derrière."],
      why: "On peut réorganiser l’affichage sans réécrire le HTML. Par exemple, sur téléphone, faire passer le bouton « Acheter » au-dessus de la description du produit.",
      code: `.verte {\n  order: -1;\n}\n\n.jaune {\n  order: 1;\n}`,
      pieces: [[".verte", "on vise **un** élément flex grâce à sa classe de couleur"], ["order: 0", "la valeur de tout le monde par défaut"], ["order: -1", "plus petit que 0 : passe devant les autres"], ["order: 1", "plus grand que 0 : passe derrière les autres"]],
      example: { code: `.boite {\n  display: flex;\n}\n.trois {\n  order: -1;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div>2</div><div class="trois">3</div></div>` },
      trap: "Écrire `order` sur le conteneur `.etang`. Ça ne fait rien : `order` s’écrit sur l’**élément** qu’on veut déplacer.",
      good: "Utilise `order` avec parcimonie et de petites valeurs (`-1`, `1`). Si tu dois réordonner presque tous les éléments, c’est l’ordre du HTML qu’il faut revoir."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["L’étang est déjà réglé : ne touche pas à sa règle.", "Dans la règle `.verte`, donne-lui un `order` qui la fait passer **devant** toutes les autres.", "Dans la règle `.jaune`, donne-lui un `order` qui la fait passer **derrière** toutes les autres."],
    starter: `.etang {\n  display: flex;\n  justify-content: center;\n}\n\n.verte {\n  \n}\n\n.jaune {\n  \n}\n`,
    goals: [
      { label: "La luciole verte passe devant avec un `order` négatif", test: c => { const o = parseInt(cs(c, ".verte", "order"), 10); return o < 0 || (o > 0 ? "Un nombre positif l’envoie à la fin. Pour passer devant les autres (qui ont 0), il faut un nombre plus petit que 0." : (parseInt(et(c, "order"), 10) ? "`order` ne fait rien sur le conteneur : écris-le dans `.verte`." : false)); } },
      { label: "La luciole jaune passe derrière avec un `order` positif", test: c => parseInt(cs(c, ".jaune", "order"), 10) > 0 },
      { label: "Sans `row-reverse`", test: c => !/reverse/.test(et(c, "flex-direction")) || "Ici, on ne retourne pas toute la file : seules deux lucioles changent de place." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Tout le monde a `order: 0` par défaut.", "Pour passer devant 0 : un nombre négatif. Pour passer derrière : un nombre positif.", "Dans `.verte` : `order: -1;` et dans `.jaune` : `order: 1;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: center;\n}\n\n.verte {\n  order: -1;\n}\n\n.jaune {\n  order: 1;\n}`,
    debrief: "`order` déplace une seule luciole, sans toucher aux autres. Les éléments de même `order` gardent l’ordre du HTML : c’est pour ça que la rose reste devant la bleue. Comme pour `row-reverse`, n’oublie pas que le clavier et les lecteurs d’écran suivent l’ordre du HTML."
  },

  /* ------------------------------ ATELIER 5 ------------------------------ */
  {
    id: "wrap", ch: 5, title: "Trop de monde sur la ligne", notion: "flex-wrap: wrap",
    say: "Six lucioles sur une seule ligne, dans ce petit coin d’étang ? Elles sont toutes écrasées ! Laisse-les passer à la ligne.",
    boardBase: NARROW, boardHeight: 220,
    lesson: {
      what: ["Par défaut, Flexbox garde tous les éléments sur **une seule ligne flex**, quitte à les **écraser** quand la place manque.", "Avec `flex-wrap: wrap` (« envelopper »), on autorise le **retour à la ligne** : les éléments qui ne tiennent plus continuent sur une nouvelle ligne flex, comme les mots d’un texte."],
      why: "C’est indispensable pour le **responsive**, c’est-à-dire les pages qui s’adaptent à toutes les tailles d’écran. Une galerie de photos montre 4 images par ligne sur ordinateur et 2 sur téléphone, sans changer une ligne de code.",
      code: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n}`,
      pieces: [["nowrap", "tout sur une seule ligne, quitte à écraser les éléments (par défaut)"], ["wrap", "les éléments passent à la ligne quand il n’y a plus de place"], ["la ligne pointillée", "le bord droit de l’étang : ici, il est plus étroit que d’habitude"]],
      example: { code: `.boite {\n  display: flex;\n  flex-wrap: wrap;\n  width: 150px;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>` },
      trap: "Oublier `flex-wrap` et se demander pourquoi les images sont toutes petites sur téléphone. Sans `wrap`, Flexbox préfère rétrécir les éléments plutôt que de passer à la ligne.",
      good: "Dès qu’une rangée peut contenir beaucoup d’éléments (cartes, photos, étiquettes), ajoute `flex-wrap: wrap` par réflexe : sur un téléphone, ça évite les éléments écrasés ou qui dépassent de l’écran."
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
    debrief: "Quatre lucioles tiennent sur la première ligne, les deux autres passent à la suivante. Si l’étang était plus large, elles tiendraient toutes sur une ligne : Flexbox décide tout seul. Remarque aussi que les deux lignes se partagent la hauteur de l’étang : c’est le comportement par défaut, et la prochaine mission va le changer."
  },
  {
    id: "align-content", ch: 5, title: "Les lignes se rapprochent", notion: "align-content",
    say: "Deux lignes de lucioles, c’est joli… mais elles sont trop loin l’une de l’autre ! Rassemble les deux lignes au milieu de l’étang.",
    boardBase: NARROW,
    lesson: {
      what: ["Avec `flex-wrap: wrap`, le conteneur peut avoir **plusieurs lignes flex**. Par défaut, ces lignes se partagent toute la hauteur du conteneur : elles s’étirent, et laissent de grands trous.", "`align-content` (« aligner le contenu ») place **les lignes elles-mêmes** sur l’axe secondaire : toutes au début, au centre, à la fin, ou espacées. Il accepte les mêmes valeurs que `justify-content`."],
      why: "Dans une liste de cartes ou d’étiquettes qui passe à la ligne, on veut souvent que les lignes restent groupées en haut, ou bien centrées dans un bloc, au lieu de flotter avec des trous.",
      code: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n}`,
      pieces: [["align-content", "place les **lignes** sur l’axe secondaire"], ["flex-start / center / flex-end", "toutes les lignes groupées au début, au centre ou à la fin"], ["space-between", "la première ligne au début, la dernière à la fin"], ["align-items", "à ne pas confondre : il place les éléments **à l’intérieur** de chaque ligne"]],
      example: { code: `.boite {\n  display: flex;\n  flex-wrap: wrap;\n  width: 150px;\n  height: 150px;\n  align-content: flex-start;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>` },
      trap: "Écrire `align-items: center` : chaque luciole se centre **dans sa ligne**, mais les lignes restent éloignées. Pour bouger les lignes entières, c’est `align-content`. Et sans `flex-wrap: wrap`, il ne fait rien du tout.",
      good: "Retiens le duo : `align-items` place les éléments **dans** chaque ligne, `align-content` place **les lignes** dans le conteneur. Écris `align-content` juste sous `flex-wrap`, pour montrer qu’ils vont ensemble."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte", "orange", "violette"),
    steps: ["Les lucioles passent déjà à la ligne : garde `flex-wrap: wrap`.", "Regarde les feuilles : les deux lignes sont serrées l’une contre l’autre, au milieu de l’étang.", "Ajoute `align-content` avec la valeur qui **centre les lignes**."],
    starter: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  \n}\n`,
    goals: [
      { label: "`align-content` vaut `center`", test: c => { const v = et(c, "align-content"); return v === "center" || (et(c, "align-items") === "center" ? "Avec `align-items`, chaque luciole se centre dans **sa** ligne, mais les lignes restent loin l’une de l’autre. C’est `align-content` qui déplace les lignes." : (/space|start|end/.test(v) ? "Les lignes bougent, bravo ! Mais pas au bon endroit : regarde où sont les feuilles." : false)); } },
      { label: "Les lucioles passent toujours à la ligne", test: c => et(c, "flex-wrap") === "wrap" || "Garde `flex-wrap: wrap` : sans plusieurs lignes, `align-content` ne fait rien." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété qui place les lignes : `align-content`.", "On veut les lignes groupées au milieu : la même valeur que pour centrer.", "`align-content: center;`"],
    solution: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n}`,
    debrief: "`align-content` travaille sur les **lignes**, `align-items` sur les **éléments** dans chaque ligne. Tu retrouveras exactement le même `align-content` dans CSS Grid, pour placer les rangées de la grille. Sur un site, c’est ce qui garde un nuage d’étiquettes bien groupé au centre de son bloc."
  },
  {
    id: "gap", ch: 5, title: "Un peu d’air entre les ailes", notion: "gap",
    say: "Les lucioles passent bien à la ligne, mais elles se touchent du bout des ailes. Laisse 20 pixels d’air entre elles, dans tous les sens !",
    boardBase: NARROW, boardHeight: 220,
    lesson: {
      what: "`gap` (« écart ») ajoute un espace **entre** les éléments flex, et seulement entre eux : rien contre les bords du conteneur. Il s’écrit sur le **conteneur flex**, et marche à la fois entre les colonnes et entre les lignes.",
      why: "Avant `gap`, on ajoutait des marges à chaque élément, puis on retirait celle du dernier… Avec `gap`, une seule déclaration suffit, et les espaces sont toujours parfaitement réguliers : boutons, cartes, galeries.",
      code: `.etang {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}`,
      pieces: [["gap: 20px", "20 pixels entre les éléments, à l’horizontale et à la verticale"], ["gap: 10px 30px", "deux valeurs : 10px entre les lignes, puis 30px entre les colonnes"], ["row-gap / column-gap", "pour régler un seul des deux sens"]],
      example: { code: `.boite {\n  display: flex;\n  gap: 20px;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Mettre le `gap` sur les lucioles. Comme `display: flex`, il s’écrit sur le **parent**, celui qui contient les éléments.",
      good: "Espace toujours avec `gap` sur le conteneur plutôt qu’avec des `margin` sur chaque élément : un seul réglage, des espaces réguliers, rien en trop aux bords. Tu retrouveras exactement le même `gap` dans CSS Grid."
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
      { q: "Dans un conteneur flex en ligne (`row`), `align-items` agit sur…", opts: ["la largeur (l’axe principal)", "la hauteur (l’axe secondaire)", "l’ordre des éléments"], a: 1, why: "`align-items` agit toujours sur l’**axe secondaire**. En ligne, c’est la hauteur." },
      { q: "Que fait `justify-content: center` dans ce conteneur ?", code: `.liste {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}`, lang: "css", opts: ["Il centre les éléments en hauteur", "Il centre les éléments en largeur", "Rien, il ne marche pas en colonne"], a: 0, why: "En colonne, l’axe principal est vertical : `justify-content` agit donc sur la hauteur." },
      { q: "Tes cartes sont toutes écrasées sur une ligne, sur téléphone. Que faut-il ajouter au conteneur ?", opts: ["`flex-direction: row`", "`gap: 20px`", "`flex-wrap: wrap`"], a: 2, why: "Par défaut, Flexbox garde tout sur une ligne. `flex-wrap: wrap` laisse les éléments passer à la ligne suivante." },
      { q: "Tes cartes passent sur trois lignes, mais il y a de grands trous entre les lignes. Quelle propriété les regroupe en haut du conteneur ?", opts: ["`align-items: flex-start`", "`justify-content: flex-start`", "`align-content: flex-start`"], a: 2, why: "`align-content` place **les lignes** dans le conteneur. `align-items` ne place les éléments qu’à l’intérieur de chaque ligne." },
      { q: "`gap: 20px` sur le conteneur, ça donne…", opts: ["20px autour de chaque élément, bords compris", "20px **entre** les éléments, rien contre les bords", "des éléments 20px plus larges"], a: 1, why: "`gap` met de l’espace uniquement **entre** les éléments flex, jamais contre les bords du conteneur." }
    ],
    debrief: "Les deux axes, la direction, les lignes multiples et les espaces : tu maîtrises tout ce qui se règle sur le **conteneur flex**. Dernier atelier : la taille des éléments, et de vraies mises en page !"
  },

  /* ------------------------------ ATELIER 6 ------------------------------ */
  {
    id: "flex-grow", ch: 6, title: "La jaune prend ses aises", notion: "flex-grow",
    say: "La luciole jaune fait une longue traînée de lumière : elle veut prendre toute la place libre et pousser les autres au bout de l’étang !",
    boardBase: HALO,
    lesson: {
      what: ["Jusqu’ici, les lucioles gardaient leur taille. `flex-grow` règle la **croissance** d’un élément flex : sa capacité à **s’étirer** pour prendre l’espace libre du conteneur.", "Par défaut, `flex-grow` vaut `0` : l’élément garde sa taille. Avec `flex-grow: 1`, il grandit jusqu’à remplir toute la place qui reste. Si plusieurs éléments ont `flex-grow: 1`, ils se partagent l’espace libre à parts égales."],
      why: "C’est ce qui fait qu’une barre de recherche s’allonge pour remplir l’espace entre le logo et le bouton « Connexion ». Ou que les boutons d’une barre d’outils font tous la même largeur.",
      code: `.jaune {\n  flex-grow: 1;\n}`,
      pieces: [["flex-grow: 0", "ne grandit pas (par défaut)"], ["flex-grow: 1", "prend toute la place libre"], ["flex-grow: 2", "si un autre a 1, celui-ci reçoit deux fois plus d’espace libre que lui"], ["le halo", "ici, chaque luciole a un halo clair qui montre la vraie taille de sa boîte"]],
      example: { code: `.boite {\n  display: flex;\n}\n.deux {\n  flex-grow: 1;\n}`, base: EX_BASE, html: `<div class="boite"><div>1</div><div class="deux">2</div><div>3</div></div>` },
      trap: "Donner une largeur fixe (`width: 500px`) pour remplir l’espace. Sur un autre écran, ce sera trop grand ou trop petit. `flex-grow` s’adapte toujours.",
      good: "Pour un élément qui doit remplir la place restante, préfère `flex-grow` à une largeur en pixels : la mise en page s’adapte toute seule à la taille de l’écran, sans aucun calcul."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Regarde la feuille jaune : sa boîte s’étire sur presque toute la largeur.", "Dans la règle `.jaune`, ajoute `flex-grow` pour qu’elle prenne **toute la place libre**."],
    starter: `.etang {\n  display: flex;\n}\n\n.jaune {\n  \n}\n`,
    goals: [
      { label: "La luciole jaune a un `flex-grow` positif", test: c => parseFloat(cs(c, ".jaune", "flex-grow")) > 0 || ((decl(c, ".jaune", "width") || decl(c, ".jaune", "min-width")) ? "Pas de largeur fixée à la main : utilise `flex-grow`." : (parseFloat(cs(c, ".rose", "flex-grow")) > 0 || parseFloat(cs(c, ".bleue", "flex-grow")) > 0 ? "C’est la jaune qui doit grandir, pas une autre." : false)) },
      { label: "Les autres lucioles gardent leur taille", test: c => (parseFloat(cs(c, ".rose", "flex-grow")) === 0 && parseFloat(cs(c, ".bleue", "flex-grow")) === 0) || "Seule la jaune grandit : retire le `flex-grow` des autres." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["C’est une propriété d’élément : elle s’écrit dans `.jaune`.", "La valeur est un simple nombre, sans unité.", "Dans `.jaune` : `flex-grow: 1;`"],
    solution: `.etang {\n  display: flex;\n}\n\n.jaune {\n  flex-grow: 1;\n}`,
    debrief: "Avec `flex-grow: 1`, la boîte jaune mange toute la place libre, et les deux autres sont poussées au bout. Pas besoin de calculer une largeur : Flexbox le fait pour toi, sur tous les écrans. C’est le « flex » de Flexbox : des boîtes **souples**."
  },
  {
    id: "flex-basis", ch: 6, title: "Des tailles sur mesure", notion: "flex-basis, flex-shrink, flex",
    say: "La jaune veut une feuille bien à elle, toujours large de 120 pixels, ni plus ni moins. Les deux autres se partagent le reste de l’étang !",
    boardBase: HALO,
    lesson: {
      what: ["Un élément flex a trois réglages de taille :", "`flex-basis` : la **taille de base**, celle de départ sur l’axe principal (sa largeur, en ligne). `flex-grow` : la **croissance**, s’il prend de l’espace libre. `flex-shrink` : le **rétrécissement**, s’il accepte de rapetisser quand la place manque (`1` par défaut : oui ; `0` : jamais).", "On les écrit presque toujours avec la **propriété raccourcie** `flex`, qui les regroupe dans cet ordre : `flex: grandir rétrécir base`."],
      why: "C’est le motif de beaucoup de mises en page : une colonne de taille fixe (un menu latéral, une photo de profil, un logo) à côté d’une zone souple qui prend le reste. Ou une rangée de boutons tous de la même largeur, avec `flex: 1`.",
      code: `.luciole {\n  flex: 1;\n}\n\n.jaune {\n  flex: 0 0 120px;\n}`,
      pieces: [["flex-basis: 120px", "la taille de base : 120px sur l’axe principal, avant de grandir ou de rétrécir"], ["flex-shrink: 0", "interdit de rétrécir, même si la place manque"], ["flex: 0 0 120px", "le raccourci : ne grandit pas (0), ne rétrécit pas (0), mesure 120px"], ["flex: 1", "le raccourci de « grandis et partage l’espace libre à parts égales »"], [".luciole puis .jaune", "la **cascade** : `.jaune` est écrite après, elle gagne pour la luciole jaune"]],
      example: { code: `.boite {\n  display: flex;\n  gap: 6px;\n}\n.fixe {\n  flex: 0 0 90px;\n}\n.souple {\n  flex: 1;\n}`, base: EX_BASE, html: `<div class="boite"><div class="fixe">90px</div><div class="souple">flex: 1</div><div class="souple">flex: 1</div></div>` },
      trap: "Donner `width: 120px` à un élément flex et croire que c’est réglé : Flexbox peut quand même le rétrécir quand la place manque. Avec `flex: 0 0 120px`, la taille est vraiment bloquée.",
      good: "Utilise le raccourci `flex` plutôt que les trois propriétés séparées : `flex: 1` pour un élément souple, `flex: 0 0 120px` pour un élément de taille fixe. C’est ce que tu liras dans le code des pros."
    },
    boardHTML: pond("jaune", "rose", "bleue"),
    steps: ["Dans la règle `.luciole`, donne à **toutes** les lucioles `flex: 1` : elles se partagent l’étang.", "Dans la règle `.jaune`, écrite après, bloque la jaune à `120px` : elle ne doit **ni grandir ni rétrécir**.", "Regarde les halos : la jaune est étroite, la rose et la bleue se partagent le reste."],
    starter: `.etang {\n  display: flex;\n  gap: 16px;\n}\n\n.luciole {\n  \n}\n\n.jaune {\n  \n}\n`,
    goals: [
      { label: "La rose et la bleue grandissent (`flex: 1`)", test: c => (parseFloat(cs(c, ".rose", "flex-grow")) > 0 && parseFloat(cs(c, ".bleue", "flex-grow")) > 0) || "Dans la règle `.luciole`, écris `flex: 1;` pour que les lucioles se partagent l’espace libre." },
      { label: "La jaune a une taille de base de `120px`", test: c => cs(c, ".jaune", "flex-basis") === "120px" || (decl(c, ".jaune", "width") ? "En Flexbox, la taille de base se donne avec `flex-basis` (ou le raccourci `flex`), pas avec `width`." : (parseFloat(cs(c, ".jaune", "flex-grow")) > 0 ? "La jaune grandit encore à cause de `flex: 1` dans `.luciole`. Dans `.jaune`, écrite après, donne-lui `flex: 0 0 120px;`." : false)) },
      { label: "La jaune ne grandit ni ne rétrécit (`flex: 0 0 120px`)", test: c => (cs(c, ".jaune", "flex-grow") === "0" && cs(c, ".jaune", "flex-shrink") === "0") || (cs(c, ".jaune", "flex-basis") !== "120px" ? false : cs(c, ".jaune", "flex-grow") === "0" ?"Elle ne grandit plus. Il reste à l’empêcher de rétrécir : le deuxième nombre du raccourci (`flex-shrink`) doit être `0`." : "Elle grandit encore : le premier nombre du raccourci (`flex-grow`) doit être `0`.") },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Deux règles à remplir : `.luciole` pour tout le monde, puis `.jaune` pour l’exception.", "Dans `.luciole` : `flex: 1;`. Le raccourci de la jaune s’écrit avec trois valeurs : grandir, rétrécir, base.", "Dans `.jaune` : `flex: 0 0 120px;`"],
    solution: `.etang {\n  display: flex;\n  gap: 16px;\n}\n\n.luciole {\n  flex: 1;\n}\n\n.jaune {\n  flex: 0 0 120px;\n}`,
    debrief: "`flex: 1` pour ce qui est souple, `flex: 0 0 120px` pour ce qui est fixe : avec ces deux raccourcis, tu construis la plupart des barres et des colonnes du web. Et tu as utilisé la **cascade** : la règle `.jaune`, écrite après `.luciole`, gagne pour la jaune. Sur un site, c’est une photo de profil de taille fixe à côté d’un texte qui prend le reste."
  },
  {
    id: "margin-auto", ch: 6, title: "Le logo à gauche, le reste à droite", notion: "margin-left: auto",
    say: "La grosse luciole jaune, c’est le logo de l’étang : elle reste à gauche. Les trois autres sont les liens du menu, et vont se poser tout à droite !",
    boardBase: `.luciole.jaune{width:96px;height:96px}`,
    lesson: {
      what: ["Dans un conteneur flex, une marge réglée sur `auto` (une **marge automatique**) avale **tout l’espace libre** de son côté. L’élément est poussé au bout, et ceux qui le suivent aussi.", "Avec `margin-left: auto` sur un élément, tout l’espace libre se met à sa gauche : il part à droite, et entraîne les éléments qui sont après lui."],
      why: "C’est **le** motif des en-têtes de site : le logo à gauche, les liens du menu (ou le bouton « Panier ») poussés à droite. `justify-content` ne sait pas faire ça : il déplace tout le monde, alors qu’ici on coupe la file en deux.",
      code: `.etang {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.rose {\n  margin-left: auto;\n}`,
      pieces: [["margin-left: auto", "une marge automatique : tout l’espace libre se met à gauche de la rose"], [".rose", "le **premier** élément du groupe à pousser : ceux qui le suivent partent avec lui"], ["gap: 16px", "garde les petits espaces réguliers entre les lucioles"], ["margin-right: auto", "l’inverse : pousse les éléments qui suivent vers la droite, et garde celui-ci à gauche"]],
      example: { code: `.boite {\n  display: flex;\n  gap: 6px;\n}\n.deux {\n  margin-left: auto;\n}`, base: EX_BASE, html: EX_HTML },
      trap: "Écrire `justify-content: space-between` : le logo est bien à gauche, mais les liens s’éparpillent sur toute la ligne au lieu de rester groupés à droite.",
      good: "Pour pousser un groupe au bout, mets `margin-left: auto` sur le **premier** élément du groupe, et garde `gap` pour les petits espaces. Ajoute un commentaire (`/* pousse le menu à droite */`) : sans lui, ce `auto` est mystérieux à la relecture."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["L’étang est déjà réglé : en ligne, centré en hauteur, avec un `gap`.", "Dans la règle `.rose`, ajoute une marge **automatique à gauche** : la rose part à droite, et la bleue et la verte la suivent."],
    starter: `.etang {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.rose {\n  \n}\n`,
    goals: [
      { label: "La rose a une marge automatique à gauche (`margin-left: auto`)", test: c => decl(c, ".rose", "margin-left") === "auto" || /^\S+ \S+ \S+ auto$|^\S+ auto$/.test((decl(c, ".rose", "margin") || "").trim()) || (et(c, "justify-content") !== "normal" && et(c, "justify-content") !== "flex-start" ? "`justify-content` déplace toutes les lucioles, logo compris. Retire-le, et pousse seulement le groupe de droite avec une marge automatique." : (decl(c, ".rose", "margin-left") ? "Une marge en pixels ne marchera que sur cet écran-là. Avec la valeur `auto`, elle s’adapte toute seule." : false)) },
      { label: "Le logo (la jaune) reste à gauche", test: c => !decl(c, ".jaune", "margin-left") || "Ne touche pas à la jaune : c’est la rose qu’on pousse." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["La propriété : `margin-left`, dans la règle `.rose`.", "La valeur n’est pas un nombre : c’est un mot qui veut dire « tout l’espace libre ».", "Dans `.rose` : `margin-left: auto;`"],
    solution: `.etang {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.rose {\n  margin-left: auto;\n}`,
    debrief: "Une seule déclaration coupe la file en deux : le logo à gauche, le menu à droite. Tu viens de coder l’en-tête de presque tous les sites du web ! Retiens : `justify-content` déplace **tout le monde**, une marge automatique ne déplace qu’**un groupe**."
  },
  {
    id: "flex-imbrique", ch: 6, title: "Des boîtes dans des boîtes", notion: "conteneurs flex imbriqués",
    say: "Deux petits groupes de lucioles se sont formés sur l’étang. Chaque groupe doit voler en ligne, avec un peu d’air entre ses lucioles. Range l’intérieur des groupes !",
    board: { items: ".luciole" },
    boardBase: `.groupe{border:2px dashed rgba(255,255,255,.4);border-radius:18px;padding:8px}`,
    lesson: {
      what: ["Flexbox ne range que les **enfants directs** du conteneur flex. Ici, les enfants de l’étang sont deux boîtes `.groupe` (les cadres en pointillés), et les lucioles sont rangées **dans** ces groupes : ce sont des petits-enfants, Flexbox ne les touche pas.", "La solution : l’**imbrication**. Un élément flex peut **lui-même** devenir un conteneur flex pour ses propres enfants. Le groupe est à la fois un élément flex (de l’étang) et un conteneur flex (de ses lucioles)."],
      why: "Une vraie page, ce sont des boîtes dans des boîtes. Dans un en-tête, le conteneur flex range le logo et le menu ; et le menu est à son tour un conteneur flex qui range ses liens. Même chose pour une carte : son contenu est souvent rangé en colonne avec Flexbox.",
      code: `.etang {\n  display: flex;\n  justify-content: space-between;\n}\n\n.groupe {\n  display: flex;\n  gap: 10px;\n}`,
      pieces: [[".etang", "le premier conteneur flex : il range les deux groupes"], [".groupe", "un élément flex de l’étang… qui devient conteneur flex à son tour"], ["display: flex", "écrit dans `.groupe` : ses lucioles se rangent en ligne"], ["gap: 10px", "l’espace entre les lucioles d’un même groupe"]],
      example: { code: `.entete {\n  display: flex;\n  justify-content: space-between;\n}\n.liens {\n  display: flex;\n  gap: 6px;\n}`, base: EX_NEST, html: `<header class="entete"><div class="logo">Kami</div><nav class="liens"><div>Accueil</div><div>Lucioles</div><div>Contact</div></nav></header>` },
      trap: "Croire que `display: flex` sur l’étang range aussi les lucioles des groupes. Flexbox n’agit que sur un niveau : les **enfants directs**. Pour le niveau suivant, il faut un nouveau `display: flex`.",
      good: "Regroupe les éléments qui vont ensemble dans une boîte au nom clair (`.liens`, `.boutons`) et fais-en un conteneur flex à son tour. Un conteneur flex par niveau, chacun avec son rôle : c’est lisible et facile à modifier."
    },
    boardHTML: `<div class="etang">\n  <div class="groupe">\n    <div class="luciole jaune"></div>\n    <div class="luciole rose"></div>\n  </div>\n  <div class="groupe">\n    <div class="luciole bleue"></div>\n    <div class="luciole verte"></div>\n    <div class="luciole orange"></div>\n  </div>\n</div>`,
    showHTML: true,
    steps: ["Ouvre le HTML sous le plateau : l’étang contient deux `.groupe`, et chaque groupe contient des lucioles.", "L’étang range déjà les deux groupes. Dans la règle `.groupe`, fais de chaque groupe un **conteneur flex**.", "Ajoute un `gap` de `10px` entre les lucioles d’un groupe."],
    starter: `.etang {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.groupe {\n  \n}\n`,
    goals: [
      { label: "Chaque `.groupe` est un conteneur flex", test: c => qa(c, ".groupe").every(g => cs(c, g, "display") === "flex") || (decl(c, ".luciole", "display") ? "`display: flex` se met sur le parent des lucioles, c’est-à-dire `.groupe`." : false) },
      { label: "`gap: 10px` entre les lucioles d’un groupe", test: c => (px(cs(c, ".groupe", "column-gap")) === 10) || (declAny(c, "margin") ? "Pas de marges : un `gap` sur `.groupe`." : false) },
      { label: "L’étang range toujours les groupes (`space-between`)", test: c => (isFlex(c) === true && et(c, "justify-content") === "space-between") || "Ne touche pas à la règle `.etang`." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Les lucioles sont les enfants de `.groupe` : c’est donc `.groupe` qui doit devenir un conteneur flex.", "Dans `.groupe` : `display: flex;`, puis l’espace entre les lucioles avec `gap`.", "Dans `.groupe` : `display: flex;` et `gap: 10px;`"],
    solution: `.etang {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.groupe {\n  display: flex;\n  gap: 10px;\n}`,
    debrief: "Deux niveaux, deux conteneurs flex : l’étang range les groupes, chaque groupe range ses lucioles. C’est exactement la structure d’un en-tête de site (logo + menu, et dans le menu, les liens). Dans le jeu Grid, tu feras pareil : une grille pour la page, et du Flexbox à l’intérieur des cases."
  },
  {
    id: "responsive", ch: 6, title: "L’étang sur téléphone", notion: "media query",
    say: "Les lucioles ont un petit étang de poche, sur téléphone ! Sur un écran étroit, elles doivent voler en colonne. Clique sur « Téléphone » au-dessus du plateau pour voir.",
    devices: true,
    lesson: {
      what: ["Une **media query** est un bloc `@media` qui contient des règles CSS appliquées **seulement** quand une condition est vraie. Avec `(max-width: 600px)`, la condition est : « l’écran fait 600 pixels de large **ou moins** ».", "La largeur où la mise en page change s’appelle le **point de rupture** (ici `600px`). Au-dessus, seules les règles normales s’appliquent ; en dessous, celles de la media query s’ajoutent et gagnent, car elles sont écrites après."],
      why: "C’est le cœur du **responsive** : un seul fichier CSS pour tous les écrans. Sur ordinateur, un menu en ligne ; sur téléphone, le même menu empilé en colonne. Plus de la moitié des visites d’un site se font sur téléphone.",
      code: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n@media (max-width: 600px) {\n  .etang {\n    flex-direction: column;\n  }\n}`,
      pieces: [["@media", "le début d’une media query"], ["(max-width: 600px)", "la condition : écran de 600px de large ou moins"], ["{ … }", "les accolades de la media query contiennent des **règles** complètes, avec leurs propres accolades"], [".etang { flex-direction: column; }", "on ne réécrit que ce qui change : le reste vient de la règle du dessus"], ["Ordinateur / Téléphone", "les boutons au-dessus du plateau : le mode téléphone le rétrécit à 390px"]],
      trap: "Oublier les accolades de la règle à l’intérieur de la media query, en écrivant directement `flex-direction: column;` après `@media (…) {`. Une media query contient des **règles**, pas des déclarations seules.",
      good: "Écris d’abord le CSS commun à tous les écrans, puis tes media queries à la **fin** du fichier, en ne réécrivant que ce qui change. Et teste ta page en largeur téléphone à chaque étape, pas seulement à la fin."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte"),
    steps: ["Sur **Ordinateur**, tout va bien : les lucioles sont en ligne. Clique sur **Téléphone** : les feuilles sont en colonne, les lucioles non.", "Sous le commentaire, écris une media query `@media (max-width: 600px) { }`.", "Dedans, écris une règle `.etang` qui passe en `flex-direction: column;`.", "Vérifie en mode **Téléphone**, puis en mode **Ordinateur** : les deux doivent être justes."],
    starter: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n/* Sur les écrans de 600px de large ou moins : */\n\n`,
    goals: [
      { label: "Une media query `@media (max-width: 600px)`", test: c => MQ600(c).length > 0 || ((c.rules || []).some(r => r.media) ? "Ta media query doit viser les écrans de 600px ou moins : `@media (max-width: 600px)`." : (hasCode(c, /@media/) ? "Ta media query est vide, ou il manque une règle dedans : `.etang { … }` entre ses accolades." : false)) },
      { label: "Dedans, `.etang` passe en `flex-direction: column`", test: c => MQ600(c).some(r => selHas(r, ".etang") && r.decls.some(d => d.prop === "flex-direction" && d.value === "column")) || (MQ600(c).some(r => r.decls.some(d => d.prop === "flex-direction")) ? "Presque : la règle de la media query doit viser `.etang` et contenir `flex-direction: column;`." : false) },
      { label: "Sur ordinateur, l’étang reste en ligne", test: c => !(c.rules || []).some(r => !r.media && r.decls.some(d => d.prop === "flex-direction" && /column/.test(d.value))) || "Le `flex-direction: column` doit être **dans** la media query, sinon les lucioles passent en colonne sur tous les écrans." },
      { label: "Les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Une media query s’écrit `@media (condition) { … }` et contient des règles complètes.", "La condition : `max-width: 600px`. Dedans, une règle `.etang { … }`.", "`@media (max-width: 600px) {` puis `.etang { flex-direction: column; }` puis `}`"],
    solution: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n/* Sur les écrans de 600px de large ou moins : */\n@media (max-width: 600px) {\n  .etang {\n    flex-direction: column;\n  }\n}`,
    debrief: "Une seule déclaration dans une media query, et ta mise en page s’adapte au téléphone. Remarque que `justify-content` et `align-items` ont suivi les axes : en colonne, les lucioles sont réparties en hauteur et centrées en largeur. C’est ainsi qu’un menu horizontal devient une liste verticale sur mobile."
  },
  {
    id: "finale", ch: 6, boss: true, title: "La grande fête de l’étang", notion: "mission finale",
    say: "C’est la nuit de la grande fête ! Les six lucioles sont là. Range-les toutes sur leurs feuilles avec tout ce que tu as appris, et l’étang brillera de mille feux.",
    lesson: {
      what: "Cette mission réunit les réglages du **conteneur flex** et ceux des **éléments flex**. Avance pas à pas : d’abord l’étang, ensuite les lucioles une par une. Les objectifs te disent ce qui manque.",
      why: "C’est exactement comme ça qu’on travaille sur un vrai site : d’abord on règle la boîte qui contient (direction, répartition, alignement), puis on traite les exceptions, élément par élément. Et quand la mise en page doit ranger en lignes **et** en colonnes à la fois, on passe à CSS Grid.",
      code: `.etang {\n  display: flex;\n  justify-content: …;\n  align-items: …;\n}\n\n.violette {\n  order: …;\n  align-self: …;\n}`,
      pieces: [["le conteneur flex", "`display`, `justify-content`, `align-items` : la règle pour tout le monde"], ["les éléments flex", "`order`, `align-self` : les exceptions"], ["les feuilles", "observe-les bien : leur place te dit quelles valeurs choisir"]],
      trap: "Tout écrire d’un coup, puis chercher ce qui ne va pas. Ajoute une déclaration, regarde le plateau, puis passe à la suivante.",
      good: "Avance par petites étapes : une déclaration, un coup d’œil au résultat, puis la suivante. Et quand rien ne marche, ouvre l’inspecteur du navigateur : le badge `flex` y dessine les axes et l’espace libre."
    },
    boardHTML: pond("jaune", "rose", "bleue", "verte", "orange", "violette"),
    steps: [
      "Allume Flexbox sur l’étang.",
      "Répartis les lucioles avec **le même espace partout**, bords compris.",
      "Centre-les sur l’axe secondaire (**en hauteur**).",
      "La violette passe **devant** toutes les autres, et se pose **en haut**.",
      "L’orange se pose **en bas**."
    ],
    starter: `.etang {\n  \n}\n\n.violette {\n  \n}\n\n.orange {\n  \n}\n`,
    goals: [
      { label: "L’étang est un conteneur flex (`display: flex`)", test: isFlex },
      { label: "Le même espace partout : `justify-content: space-evenly`", test: c => { const v = et(c, "justify-content"); return v === "space-evenly" || (/space-(around|between)/.test(v) ? "Presque : regarde l’espace contre les bords, il doit être le même qu’entre les lucioles." : false); } },
      { label: "Les lucioles sont centrées en hauteur : `align-items: center`", test: c => et(c, "align-items") === "center" },
      { label: "La violette passe devant (`order`) et se pose en haut (`align-self`)", test: c => (parseInt(cs(c, ".violette", "order"), 10) < 0 && ["flex-start", "start"].includes(cs(c, ".violette", "align-self"))) || (parseInt(cs(c, ".violette", "order"), 10) < 0 ? "Elle passe bien devant. Il reste à la poser en haut avec `align-self`." : false) },
      { label: "L’orange se pose en bas (`align-self`)", test: c => ["flex-end", "end"].includes(cs(c, ".orange", "align-self")) },
      { label: "Toutes les lucioles sont sur leurs feuilles", test: boardOK }
    ],
    hints: ["Commence par l’étang : `display: flex;`, puis `justify-content: space-evenly;` et `align-items: center;`.", "Pour la violette : un `order` négatif pour passer devant, et `align-self: flex-start;` pour monter.", "Pour l’orange : `align-self: flex-end;`."],
    solution: `.etang {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.violette {\n  order: -1;\n  align-self: flex-start;\n}\n\n.orange {\n  align-self: flex-end;\n}`,
    debrief: "Bravo ! Tu as réglé un conteneur flex complet **et** ses exceptions. Avec `display`, `justify-content`, `align-items`, `align-self`, `flex-direction`, `order`, `flex-wrap`, `align-content`, `gap`, `flex`, les marges automatiques et les media queries, tu connais tout ce qu’on utilise vraiment au quotidien : menus, barres de boutons, cartes, blocs centrés. Retiens enfin : Flexbox pour **une** direction, Grid pour les lignes **et** les colonnes. Prochaine étape : le potager de Kami !"
  }
  ]
};
