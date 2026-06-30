export type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "cta"; label: string; href: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  image?: string;
  metaTitle: string;
  metaDescription: string;
  content: ContentBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "wacker-neuson-gamme-zero-emission-2026",
    image: "/images/photo-wacker-catalogue.jpg",
    title: "WACKER NEUSON lance sa nouvelle gamme zéro émission 2026",
    category: "Nouveautés",
    summary:
      "Découvrez la révolution électrique avec les nouvelles mini-pelles et compacteurs 100% électriques. Performance maximale, zéro émission, pour des chantiers urbains plus propres.",
    date: "15 mai 2026",
    readTime: "4 min",
    gradientFrom: "#34d399",
    gradientTo: "#0f766e",
    icon: "⚡",
    metaTitle: "WACKER NEUSON gamme zéro émission 2026",
    metaDescription:
      "Découvrez la nouvelle gamme électrique WACKER NEUSON 2026 : mini-pelles EZ17e, EZ26e et compacteurs zéro émission. Disponible chez AMC en Savoie.",
    content: [
      {
        type: "intro",
        text: "Le secteur du BTP vit une mutation profonde. Face aux restrictions croissantes sur les émissions dans les centres-villes et aux zones à faibles émissions (ZFE), les constructeurs accélèrent leur transition électrique. WACKER NEUSON, pionnier de l'électrification des engins compacts, franchit une nouvelle étape avec sa gamme zéro émission 2026, désormais disponible chez AMC Alpes Matériel Compact.",
      },
      {
        type: "h2",
        text: "La révolution électrique dans le BTP",
      },
      {
        type: "p",
        text: "En Europe, les zones à faibles émissions se multiplient. Paris, Lyon, Grenoble, et bientôt de nombreuses agglomérations imposent des restrictions strictes aux engins thermiques dans leurs centres. Pour les entreprises de BTP, cela représente un défi majeur : continuer à travailler en milieu urbain sans enfreindre les réglementations environnementales. La réponse de WACKER NEUSON est claire : des machines 100 % électriques aussi performantes que leurs homologues diesel.",
      },
      {
        type: "h2",
        text: "La gamme zéro émission WACKER NEUSON 2026",
      },
      {
        type: "p",
        text: "WACKER NEUSON développe sa gamme « zero emission » depuis plusieurs années. La version 2026 marque une rupture technologique significative, avec des batteries lithium-ion de nouvelle génération offrant une densité énergétique améliorée de 30 % par rapport à la génération précédente. Le résultat : des machines plus légères, plus puissantes et disposant d'une autonomie suffisante pour une journée de chantier complète.",
      },
      {
        type: "h2",
        text: "Mini-pelles électriques : les modèles EZ17e et EZ26e",
      },
      {
        type: "p",
        text: "Les deux fleurons de la gamme électrique 2026 sont les mini-pelles EZ17e et EZ26e. Conçues spécifiquement pour les chantiers urbains et les espaces contraints, elles reprennent exactement les dimensions et performances de leurs équivalentes thermiques, sans les inconvénients liés aux émissions de gaz.",
      },
      {
        type: "ul",
        items: [
          "EZ17e — 1,7 tonne : moteur électrique 15 kW, autonomie 4 à 6 heures selon l'intensité du travail, charge rapide DC 80 % en 1h30, largeur de chenille réductible à 990 mm pour les accès étroits",
          "EZ26e — 2,7 tonnes : moteur 22 kW, autonomie 5 à 7 heures, poids opérationnel 2 680 kg, force d'arrachement 24 kN, compatible avec les équipements hydrauliques standards",
          "Les deux modèles acceptent indifféremment les équipements BWT (Bucket Wedge Technology) de la gamme thermique",
          "Niveau sonore inférieur à 75 dB(A) : travaux possibles en zone résidentielle en horaires élargis",
          "Zéro émission locale, conformes aux réglementations ZFE de toutes les grandes agglomérations françaises",
        ],
      },
      {
        type: "h2",
        text: "Compacteurs électriques pour chantiers urbains",
      },
      {
        type: "p",
        text: "La gamme de compacteurs électriques WACKER NEUSON couvre plaques vibrantes, pilonneuses et rouleaux tandem. Ces machines silencieuses sont particulièrement adaptées aux travaux de nuit, aux chantiers de proximité et aux rénovations en milieu occupé. La plaque vibrante VP1550e, par exemple, offre une force centrifuge de 15 kN avec une autonomie de 4 heures, sans aucune émission ni huile à changer.",
      },
      {
        type: "quote",
        text: "Depuis que nous avons intégré les compacteurs électriques WACKER NEUSON sur nos chantiers lyonnais, nos équipes travaillent dans de meilleures conditions. Plus de bruit, plus d'odeurs de carburant, et nous avons accès aux ZFE sans restriction. C'est un vrai gain opérationnel.",
        author: "Thomas D.",
        role: "Chef de chantier, entreprise VRD Rhône-Alpes",
      },
      {
        type: "h2",
        text: "Avantages concrets sur le chantier",
      },
      {
        type: "ul",
        items: [
          "Réduction des émissions de CO₂ : entre 70 % et 100 % selon la source d'électricité utilisée",
          "Accès garanti aux zones à faibles émissions dans toute la France",
          "Coût d'exploitation réduit : l'électricité représente environ 20 à 30 % du coût d'un plein de gazole pour une énergie équivalente",
          "Maintenance simplifiée : pas de vidange d'huile moteur, pas de filtre à gasoil, moins de pièces d'usure",
          "Confort opérateur amélioré : vibrations réduites, pas de chaleur moteur, commandes plus fluides",
          "Image de marque : répondre aux exigences environnementales des donneurs d'ordre publics",
        ],
      },
      {
        type: "h2",
        text: "Disponibilité chez AMC et solutions de financement",
      },
      {
        type: "p",
        text: "En tant que distributeur officiel WACKER NEUSON pour la Haute-Savoie et la Savoie, AMC propose l'intégralité de la gamme zéro émission 2026 en démonstration et en stock. Nos conseillers techniques peuvent vous accompagner dans la transition électrique de votre parc : analyse des besoins, essais sur vos chantiers, calcul du retour sur investissement. Des solutions de financement adaptées (leasing, location longue durée) sont disponibles pour faciliter l'acquisition.",
      },
      {
        type: "callout",
        title: "Essai gratuit sur votre chantier",
        body: "AMC propose des démonstrations gratuites des machines électriques WACKER NEUSON directement sur vos chantiers. Contactez-nous pour planifier un essai sans engagement.",
      },
      { type: "cta", label: "Demander un devis", href: "/contact?type=devis" },
    ],
  },

  {
    slug: "5-conseils-maintenance-engins-chantier",
    image: "/images/Slide-3.jpg",
    title: "5 conseils pour optimiser la maintenance de vos engins de chantier",
    category: "Conseils",
    summary:
      "Prolongez la durée de vie de votre matériel et réduisez vos coûts d'exploitation grâce à ces bonnes pratiques d'entretien préventif recommandées par nos experts.",
    date: "10 mai 2026",
    readTime: "5 min",
    gradientFrom: "#60a5fa",
    gradientTo: "#1d4ed8",
    icon: "🔧",
    metaTitle: "5 conseils maintenance engins de chantier",
    metaDescription:
      "Nos experts AMC partagent 5 conseils essentiels pour optimiser la maintenance préventive de vos engins de chantier WACKER NEUSON, Magni et Promove Demolition.",
    content: [
      {
        type: "intro",
        text: "Un engin de chantier bien entretenu, c'est une machine qui dure deux fois plus longtemps, qui tombe en panne deux fois moins souvent et qui conserve une valeur de revente significativement supérieure. Pourtant, la maintenance préventive reste le parent pauvre des entreprises de BTP, souvent sacrifiée sur l'autel de la rentabilité immédiate. Voici les 5 conseils de nos techniciens certifiés pour changer la donne.",
      },
      {
        type: "h2",
        text: "Pourquoi la maintenance préventive est-elle essentielle ?",
      },
      {
        type: "p",
        text: "Les engins de chantier représentent des investissements de plusieurs dizaines, voire centaines de milliers d'euros. Une panne en cours de chantier ne coûte pas seulement la réparation : elle engendre des pénalités de retard, l'immobilisation d'une équipe, la location d'un matériel de remplacement en urgence. Selon nos données d'atelier, 70 % des pannes majeures auraient pu être évitées par un entretien préventif régulier.",
      },
      {
        type: "h2",
        text: "Conseil 1 — Effectuez des vérifications quotidiennes avant mise en route",
      },
      {
        type: "p",
        text: "Consacrer 10 minutes chaque matin à une inspection visuelle de votre machine peut vous éviter des heures d'immobilisation. Ces vérifications doivent être systématiques et documentées, idéalement via une checklist signée par l'opérateur.",
      },
      {
        type: "ul",
        items: [
          "Niveau d'huile moteur et d'huile hydraulique (avant premier démarrage)",
          "Niveau de liquide de refroidissement et d'eau de batterie sur les modèles adaptés",
          "Pression des pneumatiques ou état des chenilles (tensions, usure des patins)",
          "Absence de fuites visibles sous l'engin (huile, carburant, liquide de frein)",
          "État des flexibles hydrauliques : fissures, abrasion, déformations",
          "Fonctionnement des dispositifs de sécurité : alarme de recul, stop d'urgence, ceinture",
        ],
      },
      {
        type: "h2",
        text: "Conseil 2 — Respectez scrupuleusement le calendrier d'entretien constructeur",
      },
      {
        type: "p",
        text: "WACKER NEUSON, Magni et Promove Demolition définissent des intervalles de maintenance précis dans leurs manuels d'entretien : 250h, 500h, 1 000h et 2 000h selon les opérations. Ces intervalles ne sont pas des suggestions : ils sont calculés pour garantir la fiabilité des composants et maintenir la garantie constructeur. Tenir un carnet d'entretien à jour est indispensable, notamment en cas de revente ou de sinistre.",
      },
      {
        type: "h2",
        text: "Conseil 3 — Utilisez exclusivement des pièces d'origine",
      },
      {
        type: "p",
        text: "Les pièces de remplacement génériques peuvent sembler économiques à l'achat. En réalité, elles engendrent souvent des surcoûts importants : usure prématurée des composants adjacents, non-conformité aux tolérances constructeur, incompatibilité avec les systèmes électroniques. Les pièces d'origine WACKER NEUSON et Magni garantissent les mêmes spécifications que les composants d'origine, préservent la garantie et assurent la traçabilité des interventions.",
      },
      {
        type: "h2",
        text: "Conseil 4 — Formez vos opérateurs aux bonnes pratiques",
      },
      {
        type: "p",
        text: "L'erreur humaine et la mauvaise utilisation sont responsables d'une part importante de l'usure prématurée des engins. Une formation aux bonnes pratiques opérateur — démarrage à froid, montée en température, cycles hydrauliques, stationnement — peut considérablement allonger la durée de vie des composants. WACKER NEUSON propose des programmes de formation opérateur que nos équipes AMC peuvent organiser sur site.",
      },
      {
        type: "h2",
        text: "Conseil 5 — Confiez vos révisions à un atelier certifié",
      },
      {
        type: "p",
        text: "Toutes les révisions ne se valent pas. Un atelier certifié dispose des outils de diagnostic spécifiques au constructeur, emploie des techniciens formés et certifiés, et utilise des procédures validées par le fabricant. Faire réaliser les grandes révisions par un atelier certifié, c'est garantir que le travail est fait dans les règles de l'art et que votre garantie constructeur est préservée.",
      },
      {
        type: "callout",
        title: "L'atelier AMC : certifié par WACKER NEUSON",
        body: "Notre atelier de Saint-Félix dispose de 3 techniciens certifiés WACKER NEUSON, Magni et Promove Demolition. Stock de pièces détachées d'origine disponible immédiatement. Diagnostic électronique constructeur. Délai d'intervention sous 48h ouvrées.",
      },
      {
        type: "h2",
        text: "Les bénéfices mesurables d'une maintenance rigoureuse",
      },
      {
        type: "ul",
        items: [
          "Durée de vie prolongée de 30 à 50 % par rapport à un entretien négligé",
          "Réduction des pannes imprévues : moins d'immobilisations non planifiées",
          "Valeur de revente jusqu'à 25 % supérieure avec un carnet d'entretien complet",
          "Consommation de carburant optimisée : un moteur bien entretenu consomme 10 à 15 % de moins",
          "Sécurité des opérateurs garantie : pas de défaillance liée à un composant négligé",
          "Conformité aux audits qualité des grands donneurs d'ordre",
        ],
      },
      { type: "cta", label: "Prendre rendez-vous pour une révision", href: "/contact?type=sav" },
    ],
  },

  {
    slug: "amc-certification-se-plus-atelier-saint-felix",
    image: "/images/Slide-3.jpg",
    title: "AMC obtient la certification SAV pour son atelier de Saint-Félix",
    category: "Actualités",
    summary:
      "Notre atelier est désormais certifié par WACKER NEUSON, garantissant un service après-vente d'excellence avec des techniciens qualifiés et un stock de pièces détachées optimal.",
    date: "3 mai 2026",
    readTime: "4 min",
    gradientFrom: "#fbbf24",
    gradientTo: "#d97706",
    icon: "🏆",
    metaTitle: "AMC certifié — Atelier SAV Saint-Félix Haute-Savoie",
    metaDescription:
      "L'atelier AMC de Saint-Félix obtient la certification SAV WACKER NEUSON. Découvrez ce que ce label d'excellence garantit pour vos interventions SAV.",
    content: [
      {
        type: "intro",
        text: "C'est avec fierté qu'AMC Alpes Matériel Compact annonce l'obtention de la certification SAV (Service Excellence Plus) par WACKER NEUSON pour son atelier de Saint-Félix, en Haute-Savoie. Cette accréditation, la plus exigeante du secteur des équipements compacts de chantier, récompense plusieurs années d'investissement dans la formation de nos techniciens et dans nos équipements de diagnostic.",
      },
      {
        type: "h2",
        text: "La certification SAV : qu'est-ce que c'est ?",
      },
      {
        type: "p",
        text: "Créée par WACKER NEUSON, la certification SAV (Service Excellence Plus) est le label de référence pour les ateliers SAV spécialisés dans les équipements compacts de chantier. Elle distingue les centres de service qui répondent aux critères les plus stricts en matière de compétences techniques, d'équipements et de réactivité. En France, seule une poignée de distributeurs disposent de ce label sur l'ensemble du territoire.",
      },
      {
        type: "ul",
        items: [
          "Techniciens formés et certifiés directement par WACKER NEUSON, avec recyclage annuel obligatoire",
          "Outillage spécifique agréé par le constructeur pour chaque type d'intervention",
          "Stock de pièces détachées d'origine dimensionné pour garantir une disponibilité immédiate",
          "Délai d'intervention maximum garanti contractuellement (48h ouvrées)",
          "Traçabilité complète de chaque intervention via le système constructeur",
          "Audit qualité annuel réalisé par les équipes WACKER NEUSON",
        ],
      },
      {
        type: "h2",
        text: "Les critères d'obtention : une exigence de chaque instant",
      },
      {
        type: "p",
        text: "L'audit d'obtention de la certification SAV dure deux jours. Les auditeurs WACKER NEUSON contrôlent chaque aspect du service : conformité des équipements de diagnostic, maîtrise technique des intervenants sur des cas réels, organisation du stock de pièces, systèmes de traçabilité, conditions d'accueil des clients. C'est un processus rigoureux qui ne souffre aucun compromis.",
      },
      {
        type: "h2",
        text: "L'atelier AMC de Saint-Félix en chiffres",
      },
      {
        type: "ul",
        items: [
          "500 m² d'atelier équipé, dont 2 fosses de visite et un pont élévateur grande capacité",
          "3 techniciens certifiés WACKER NEUSON, Magni et Promove Demolition",
          "Outillage de diagnostic constructeur : WDT (Wacker Diagnostic Tool), valises électroniques spécifiques",
          "Stock de plus de 2 000 références de pièces détachées d'origine en permanence",
          "Véhicule d'intervention mobile pour les dépannages sur site dans un rayon de 100 km",
          "Atelier opérationnel 5 jours sur 7, avec astreinte téléphonique le samedi matin",
        ],
      },
      {
        type: "h2",
        text: "Des services SAV complets et réactifs",
      },
      {
        type: "p",
        text: "Grâce à la certification SAV, les clients AMC bénéficient d'un niveau de service inégalé dans la région. Diagnostic électronique complet, réparations moteur et hydraulique, révisions périodiques constructeur, mise à jour des systèmes embarqués : tous les types d'interventions sont couverts. La garantie constructeur de vos machines est intégralement préservée lorsque les interventions sont réalisées dans un atelier certifié.",
      },
      {
        type: "quote",
        text: "Obtenir la certification SAV est la consécration d'un travail d'équipe. Nos techniciens sont passionnés par leur métier, et cette reconnaissance de WACKER NEUSON valide leur niveau d'expertise. Pour nos clients, c'est la garantie d'un service réalisé exactement comme le préconise le constructeur.",
        author: "Rémi Fontaine",
        role: "Responsable atelier SAV, AMC Alpes Matériel Compact",
      },
      {
        type: "h2",
        text: "AMC, distributeur officiel WACKER NEUSON pour les deux Savoies",
      },
      {
        type: "p",
        text: "AMC est le distributeur exclusif de WACKER NEUSON pour la Haute-Savoie et la Savoie. Cette double accréditation — distributeur officiel et atelier certifié — garantit à nos clients une continuité de service optimale, de l'achat de la machine à la maintenance sur toute sa durée de vie. Nos équipes commerciales et techniques travaillent en synergie pour offrir le meilleur accompagnement possible aux professionnels du BTP de la région.",
      },
      {
        type: "callout",
        title: "Votre machine WACKER NEUSON nécessite une intervention ?",
        body: "Contactez directement notre atelier certifié au 04 26 78 43 90 ou via notre formulaire en ligne. Nous vous répondons sous 24h ouvrées et proposons la prise en charge ou la venue d'un technicien sur site.",
      },
      { type: "cta", label: "Découvrir nos services SAV", href: "/services" },
    ],
  },

  {
    slug: "chantiers-montagne-quel-equipement-choisir",
    image: "/images/chantier-realiste-fusion-des-engins.jpg",
    title: "Chantiers en montagne : quel équipement choisir ?",
    category: "Conseils",
    summary:
      "Altitude, pentes raides, accès difficiles : nos experts vous guident dans le choix du matériel adapté aux contraintes spécifiques des chantiers alpins.",
    date: "28 avril 2026",
    readTime: "6 min",
    gradientFrom: "#94a3b8",
    gradientTo: "#334155",
    icon: "⛰️",
    metaTitle: "Équipement chantier en montagne : guide pratique",
    metaDescription:
      "Guide complet pour choisir le bon matériel de chantier en montagne : mini-pelles WACKER NEUSON, dumpers, compacteurs et télescopiques Magni adaptés aux Alpes.",
    content: [
      {
        type: "intro",
        text: "Les Alpes et le Massif du Mont-Blanc offrent des conditions de chantier sans équivalent en France : altitudes dépassant parfois les 2 000 mètres, pentes atteignant 30 à 40 %, accès routiers limités aux véhicules légers, conditions météorologiques imprévisibles. Dans ce contexte exigeant, le choix du bon matériel est une question de productivité, mais aussi de sécurité. Fort de son expérience au service des entreprises savoyardes, AMC vous livre son guide pratique.",
      },
      {
        type: "h2",
        text: "Les contraintes spécifiques des chantiers d'altitude",
      },
      {
        type: "ul",
        items: [
          "Raréfaction de l'air : à 2 000 m, la puissance des moteurs diesel chute de 10 à 15 % par rapport au niveau de la mer. Préférez des machines légèrement surdimensionnées",
          "Pentes et instabilité du terrain : les engins doivent être certifiés pour les angles de travail importants, avec systèmes de stabilisation adaptés",
          "Températures extrêmes : les lubrifiants et fluides hydrauliques doivent être adaptés aux grands froids (-20 °C en hiver) ; optez pour des fluides tout-temps",
          "Accès réduits : chemins forestiers, pistes de chantier étroites, tunnels de faible hauteur imposent des machines compactes à faible empreinte",
          "Contraintes environnementales : proximité de zones naturelles protégées, risque de pollution des cours d'eau — les machines biodégradables sont fortement recommandées",
        ],
      },
      {
        type: "h2",
        text: "Mini-pelles compactes : les alliées incontournables",
      },
      {
        type: "p",
        text: "Pour les travaux d'excavation, de terrassement et de pose de réseaux en altitude, les mini-pelles WACKER NEUSON s'imposent comme le choix de référence. Leur faible largeur de transport, leur capacité à travailler en dévers et leur polyvalence en font des outils universels sur les chantiers alpins.",
      },
      {
        type: "ul",
        items: [
          "EZ17 (1,7 t) : largeur minimale 990 mm, idéale pour les passages étroits. Zéro déport arrière pour travailler contre un mur ou en espace confiné",
          "EZ26 (2,7 t) : rapport puissance/poids optimal, chenilles élargissables de 990 à 1 190 mm pour la stabilité en pente",
          "EZ28 (2,8 t) : version renforcée pour les terrains rocailleux, godet HD disponible, vérins de flèche et bras surdimensionnés",
          "EW65 (6,5 t) sur roues : mobilité maximale sur piste, idéal pour les chantiers nécessitant de nombreux déplacements entre points de travail",
        ],
      },
      {
        type: "h2",
        text: "Dumpers articulés : mobilité sur terrain difficile",
      },
      {
        type: "p",
        text: "Le transport de matériaux sur des pentes supérieures à 20 % est une problématique spécifique aux chantiers de montagne. Les dumpers articulés WACKER NEUSON sont conçus pour ces conditions extrêmes : leur châssis articulé au centre leur confère une motricité exceptionnelle, tandis que leur basse centre de gravité garantit la stabilité en dévers.",
      },
      {
        type: "ul",
        items: [
          "DW20 (2 t) : le plus compact de la gamme, largeur 850 mm, idéal pour les chantiers très confinés en station de ski",
          "DW45 (4,5 t) : transmission hydrostatique à 4 roues motrices, différentiel blocable, capacité de franchissement 45 %",
          "DW60 (6 t) : la référence des gros chantiers alpins, benne basculante hydraulique, cabine fermée pour le confort en altitude",
          "Tous modèles disponibles avec hydraulique haute débit pour les équipements de terrassement intégrés",
        ],
      },
      {
        type: "h2",
        text: "Compactage en montagne : adapter l'outil au support",
      },
      {
        type: "p",
        text: "Le compactage en altitude nécessite des équipements adaptés aux spécificités des sols de montagne : roche concassée, grave naturelle, sols argileux saturés en eau. Les plaques vibrantes réversibles et les rouleaux tandem WACKER NEUSON couvrent l'ensemble des situations rencontrées sur les chantiers alpins.",
      },
      {
        type: "h2",
        text: "Chariots télescopiques Magni : la polyvalence maximale",
      },
      {
        type: "p",
        text: "Les chariots télescopiques rotatifs Magni sont particulièrement adaptés aux chantiers de montagne grâce à leur capacité à travailler sur des terrains en pente et à atteindre des points difficiles d'accès. La rotation à 360° de la flèche permet de travailler sans repositionner l'engin, ce qui est déterminant sur un terrain instable.",
      },
      {
        type: "ul",
        items: [
          "RTH 5.26 : 5,5 t de charge, portée 26 m, rotation 360°, stabilisateurs automatiques — adapté aux chantiers de réhabilitation en station",
          "RTH 6.30 : configuration haute capacité pour les zones de déchargement difficiles d'accès",
          "Pneumatiques tout-terrain disponibles en option pour maximiser la traction sur sols déformés",
          "Système de nivellement automatique jusqu'à 8° de dévers, capital pour la sécurité en pente",
        ],
      },
      {
        type: "h2",
        text: "Conseils pratiques pour préparer votre chantier en altitude",
      },
      {
        type: "ul",
        items: [
          "Vérifiez les spécifications d'altitude dans le manuel constructeur : certains systèmes hydrauliques ou électroniques ont des limitations au-dessus de 2 500 m",
          "Adaptez les fluides et lubrifiants à la plage de températures prévisibles sur le chantier",
          "Prévoyez des pneumatiques ou patins de chenilles adaptés au terrain (roches, neige, boue)",
          "Formez vos opérateurs aux techniques spécifiques de conduite en pente (freinage moteur, stabilité en dévers)",
          "Disposez d'un stock de pièces courantes sur chantier : les accès difficiles rendent les interventions rapides plus complexes à organiser",
          "Planifiez les révisions avant la saison : les chantiers d'altitude ont souvent des fenêtres d'intervention courtes",
        ],
      },
      {
        type: "callout",
        title: "AMC livre et intervient dans toute la Savoie et Haute-Savoie",
        body: "Notre atelier certifié dispose d'un véhicule d'intervention mobile pour les dépannages sur site, même en altitude. Nous livrons les machines à louer ou à vendre sur vos chantiers, accompagnées d'une mise en main par nos techniciens.",
      },
      {
        type: "h2",
        text: "AMC, votre partenaire matériel en région alpine",
      },
      {
        type: "p",
        text: "Implantée à Saint-Félix en Haute-Savoie depuis plus de 15 ans, AMC connaît les contraintes spécifiques des chantiers alpins mieux que quiconque. Nos conseillers techniques, eux-mêmes originaires de la région, peuvent vous guider dans le choix du matériel adapté à vos projets : construction en station de ski, travaux d'infrastructure, rénovation de bâtiment d'altitude, aménagement paysager en montagne. N'hésitez pas à nous soumettre votre cahier des charges.",
      },
      { type: "cta", label: "Demander conseil à nos experts", href: "/contact?type=information" },
    ],
  },

  // ── Article 5 ─────────────────────────────────────────────────────────────
  {
    slug: "wacker-neuson-ez26e-pelle-electrique",
    image: "/images/photo-wacker-catalogue.jpg",
    title: "WACKER NEUSON EZ26e : la mini-pelle électrique zéro émission arrive chez AMC",
    category: "Nouveautés",
    summary:
      "2,6 tonnes, zéro émission, silence absolu. La mini-pelle électrique EZ26e de WACKER NEUSON est désormais disponible chez AMC avec SAV certifié constructeur.",
    date: "15 avril 2025",
    readTime: "4 min",
    gradientFrom: "#22c55e",
    gradientTo: "#15803d",
    icon: "⚡",
    metaTitle: "WACKER NEUSON EZ26e mini-pelle électrique chez AMC",
    metaDescription:
      "La mini-pelle électrique WACKER NEUSON EZ26e — 2,6 tonnes, zéro émission, batterie 30 ou 39 kWh — est disponible chez AMC en Rhône-Alpes.",
    content: [
      {
        type: "intro",
        text: "Présentée au Bauma 2025 et attendue sur les chantiers depuis plusieurs mois, la mini-pelle électrique EZ26e de WACKER NEUSON est désormais disponible chez AMC. Cette machine de 2,6 tonnes représente une étape majeure dans l'électrification des engins compacts : performances équivalentes au diesel, mais sans émissions ni nuisances sonores.",
      },
      { type: "h2", text: "Une mini-pelle conçue pour les chantiers urbains et confinés" },
      {
        type: "p",
        text: "Le modèle EZ26e reprend les dimensions exactes de son équivalente thermique, avec un atout décisif : le design zero tail. Sans dépassement arrière, la machine évolue en toute sécurité dans les espaces restreints — ruelles, tranchées étroites, sous-sols, zones résidentielles. Elle reste transportable sur remorque 3,5 tonnes avec ses accessoires, ce qui simplifie la logistique de chantier.",
      },
      { type: "h2", text: "Deux configurations de batterie, une recharge polyvalente" },
      {
        type: "p",
        text: "L'EZ26e est disponible avec deux options de batterie : 30 kWh pour les missions courtes et les chantiers avec accès à une recharge régulière, ou 39 kWh pour des journées complètes sans interruption. La recharge est possible sur prise standard 230V — adaptée aux bases de vie de chantier — ou via un chargeur haute puissance 400V triphasé pour réduire les temps d'arrêt au minimum.",
      },
      {
        type: "ul",
        items: [
          "Batterie 30 kWh : autonomie adaptée aux missions courtes, recharge légère sur 230V",
          "Batterie 39 kWh : journée complète d'utilisation intensive, recharge rapide 400V",
          "Recharge compatible prises standard de chantier sans infrastructure spéciale",
          "Zero tail : rotation sans dépassement arrière, idéal en espace confiné",
          "Transportable sur remorque 3,5 T avec accessoires inclus",
        ],
      },
      { type: "h2", text: "Certified Battery Check : la traçabilité TÜV de l'état des cellules" },
      {
        type: "p",
        text: "WACKER NEUSON intègre dans l'EZ26e un système de diagnostic de batterie certifié TÜV, le « Certified Battery Check ». Cet outil analyse l'état de santé des cellules, évalue la capacité résiduelle et produit un rapport certifié. Un avantage concret pour les entreprises soumises à des obligations de traçabilité ou qui envisagent une revente future de la machine.",
      },
      { type: "h2", text: "Performances identiques au diesel, confort opérateur amélioré" },
      {
        type: "p",
        text: "La transition électrique ne se fait pas au détriment de la productivité. L'EZ26e délivre des forces d'arrachement et de pénétration comparables à la version thermique, avec une réactivité hydraulique immédiate caractéristique des motorisations électriques. Les vibrations transmises à l'opérateur sont nettement réduites, et l'absence de chaleur moteur améliore le confort, notamment en cabine et lors des interventions en espace clos.",
      },
      {
        type: "callout",
        title: "Disponible chez AMC — SAV certifié WACKER NEUSON",
        body: "En tant que distributeur officiel et atelier certifié WACKER NEUSON, AMC propose l'EZ26e à la vente et au SAV en Rhône-Alpes. Nos techniciens sont formés en usine sur les modèles électriques.",
      },
      { type: "cta", label: "Demander une démonstration", href: "/devis" },
    ],
  },

  // ── Article 6 ─────────────────────────────────────────────────────────────
  {
    slug: "plaques-vibrantes-reversibles-wacker-neuson-2025",
    image: "/images/photo-wacker-catalogue.jpg",
    title: "Nouvelle génération de plaques vibrantes réversibles WACKER NEUSON : DPU52 à BPU62",
    category: "Nouveautés",
    summary:
      "Forces de compactage 52 à 62 kN, transmission DireX, options numériques Bluetooth et télématique : la nouvelle génération de plaques WACKER NEUSON printemps 2025.",
    date: "28 mars 2025",
    readTime: "3 min",
    gradientFrom: "#f59e0b",
    gradientTo: "#b45309",
    icon: "📳",
    metaTitle: "Plaques vibrantes réversibles WACKER NEUSON DPU/BPU 2025",
    metaDescription:
      "Découvrez les nouvelles plaques vibrantes réversibles WACKER NEUSON DPU52, DPU62, BPU52 et BPU62 — disponibles chez AMC distributeur officiel en Rhône-Alpes.",
    content: [
      {
        type: "intro",
        text: "WACKER NEUSON renouvelle au printemps 2025 sa gamme de plaques vibrantes réversibles avec quatre nouveaux modèles : DPU52, DPU62, BPU52 et BPU62. Ces machines apportent des évolutions significatives en termes de puissance, de durabilité et de connectivité, répondant aux besoins croissants des entreprises de VRD, de terrassement et de pose de réseaux.",
      },
      { type: "h2", text: "Des forces de compactage de 52 à 62 kilonewtons" },
      {
        type: "p",
        text: "La nouvelle génération couvre une plage de compactage allant de 52 kN pour les modèles DPU52 et BPU52, à 62 kN pour les DPU62 et BPU62. Ces valeurs placent ces machines dans la catégorie haute performance pour le compactage de remblais, de couches de base et d'enrobés. Les largeurs de travail disponibles — 47 cm, 60 cm et 75 cm — permettent de couvrir un large spectre de configurations de tranchées et de surfaces.",
      },
      { type: "h2", text: "La transmission DireX : moins de maintenance, plus de durée de vie" },
      {
        type: "p",
        text: "L'innovation centrale de cette génération est la transmission DireX. Contrairement aux systèmes classiques à courroies ou à pignons, DireX assure une transmission directe de la puissance entre le moteur et l'excentrique. Résultat : moins de pièces d'usure, moins d'entretien périodique, et une durée de vie mécanique prolongée. Pour les entreprises qui cumulent les heures sur leurs compacteurs, c'est un argument économique concret.",
      },
      { type: "h2", text: "Options numériques avancées sur les versions diesel" },
      {
        type: "p",
        text: "Les versions diesel DPU52 et DPU62 intègrent en option un écosystème numérique complet, particulièrement adapté aux chantiers avec suivi qualité imposé par le maître d'œuvre.",
      },
      {
        type: "ul",
        items: [
          "Panneau LED : visibilité des paramètres en plein soleil",
          "Contrôle Bluetooth : pilotage et réglages depuis smartphone",
          "Contrôle de compactage intégré : mesure en temps réel de la densification",
          "Télématique : suivi de localisation, heures machine, alertes maintenance",
          "Diagnostic embarqué : identification rapide des anomalies",
        ],
      },
      { type: "h2", text: "Ergonomie et comportement en virage" },
      {
        type: "p",
        text: "WACKER NEUSON a retravaillé la géométrie des guidons et la position du centre de gravité pour améliorer la maniabilité dans les virages serrés et réduire la fatigue opérateur sur les longues sessions. La réversibilité, caractéristique clé de cette gamme, permet de progresser dans les deux sens sans retourner la machine, ce qui réduit le temps de passage et améliore la qualité de compactage aux reprises.",
      },
      {
        type: "callout",
        title: "Stock et démonstration disponibles chez AMC",
        body: "AMC dispose de plaques vibrantes WACKER NEUSON en stock avec prise en charge SAV certifiée. Contactez-nous pour organiser un essai sur votre chantier.",
      },
      { type: "cta", label: "Voir les compacteurs disponibles", href: "/catalogue?categorie=compacteurs" },
    ],
  },

  // ── Article 7 ─────────────────────────────────────────────────────────────
  {
    slug: "magni-rth-6-22-telescopique-rotatif",
    image: "/images/Magni-catalogue.avif",
    title: "Magni RTH 6.22 : le télescopique rotatif haute performance disponible chez AMC",
    category: "Nouveautés",
    summary:
      "6 tonnes, 22 mètres de hauteur, rotation 360° continue. Le RTH 6.22 de Magni est la référence des télescopiques rotatifs pour les chantiers BTP exigeants.",
    date: "20 mai 2025",
    readTime: "4 min",
    gradientFrom: "#3b82f6",
    gradientTo: "#1e3a8a",
    icon: "🏗️",
    metaTitle: "Magni RTH 6.22 télescopique rotatif chez AMC Rhône-Alpes",
    metaDescription:
      "Le Magni RTH 6.22 — 6 tonnes, 22 m de hauteur, rotation 360° — est disponible chez AMC distributeur officiel Magni en Rhône-Alpes.",
    content: [
      {
        type: "intro",
        text: "AMC enrichit sa gamme de télescopiques Magni avec l'arrivée du RTH 6.22, modèle rotatif de référence de la marque italienne. Avec une capacité maximale de 6 tonnes, une hauteur de levage de 22 mètres et une portée horizontale de 18,5 mètres, ce télescopique s'adresse aux chantiers BTP, aux charpentiers de grande portée et à l'industrie.",
      },
      { type: "h2", text: "Rotation 360° continue : une machine, tous les angles" },
      {
        type: "p",
        text: "Le principe fondamental du télescopique rotatif, c'est l'élimination des repositionnements. La tourelle du RTH 6.22 effectue une rotation continue à 360°, sans limitation d'angle ni besoin de déplacer le châssis. Sur un chantier complexe — construction ossature bois, levage en site exigu, travaux de façade — cette capacité réduit considérablement les temps de manœuvre et le risque d'incidents liés aux déplacements répétés.",
      },
      { type: "h2", text: "Motorisation Stage V et hydraulique haute pression" },
      {
        type: "p",
        text: "Le RTH 6.22 embarque un moteur Deutz TCD 3.6 L4 Stage V développant 100 kW (136 ch), conforme aux normes antipollution européennes les plus récentes. Le circuit hydraulique, dimensionné à 130 l/min à 350 bar, garantit des vitesses de levage et de rotation fluides même avec des charges proches du maximum. Les stabilisateurs à ciseaux pivotants s'adaptent aux terrains irréguliers et réduisent l'emprise au sol lors des mises en œuvre.",
      },
      { type: "h2", text: "Polyvalence absolue grâce au système RFID" },
      {
        type: "p",
        text: "La gestion des accessoires est l'un des points forts du RTH 6.22. Le système RFID intégré reconnaît automatiquement chaque outil connecté — fourches, treuil, nacelle, godet, pinces — et adapte en temps réel les dispositifs de sécurité, les limites de charge et les paramètres hydrauliques. Ce n'est plus l'opérateur qui doit reconfigurer la machine manuellement : le système le fait seul, réduisant les erreurs et les risques.",
      },
      {
        type: "ul",
        items: [
          "Capacité maximale 6 000 kg — portée 22 m en hauteur, 18,5 m en horizontal",
          "Rotation 360° continue sans limitation d'angle",
          "Stabilisateurs pivotants à ciseaux — adaptés aux terrains difficiles",
          "Reconnaissance automatique des accessoires via RFID",
          "Cabine pressurisée ROPS/FOPS niveau 2 — écran tactile MCTS",
          "Moteur Deutz TCD 3.6 L4 Stage V — 100 kW / 136 ch",
        ],
      },
      { type: "h2", text: "Cabine et ergonomie : confort de conduite longue durée" },
      {
        type: "p",
        text: "La cabine pressurisée du RTH 6.22 est certifiée ROPS/FOPS niveau 2. L'écran tactile MCTS centralise toutes les informations machine, les charges en temps réel et les diagnostics. La visibilité depuis le poste de conduite a été travaillée pour permettre un suivi précis de la charge en mouvement, quelle que soit l'orientation de la flèche.",
      },
      {
        type: "callout",
        title: "AMC — distributeur officiel Magni en Rhône-Alpes",
        body: "AMC propose à la vente et au SAV l'ensemble de la gamme Magni avec pièces d'origine et techniciens formés constructeur. Demandez un devis ou une démonstration.",
      },
      { type: "cta", label: "Demander un devis Magni RTH 6.22", href: "/devis" },
    ],
  },

  // ── Article 8 ─────────────────────────────────────────────────────────────
  {
    slug: "magni-th-3-6-e-telescopique-electrique",
    image: "/images/Magni-catalogue.avif",
    title: "Magni TH 3.6 e : le premier télescopique électrique compact de la gamme",
    category: "Nouveautés",
    summary:
      "Dévoilé au GIS 2025, le Magni TH 3.6 e est le premier télescopique électrique de la marque. 3 tonnes, 6 mètres, recharge CCS Superfast, TCO compétitif.",
    date: "30 septembre 2025",
    readTime: "4 min",
    gradientFrom: "#10b981",
    gradientTo: "#065f46",
    icon: "🔋",
    metaTitle: "Magni TH 3.6 e — premier télescopique électrique Magni",
    metaDescription:
      "Le Magni TH 3.6 e, dévoilé au GIS 2025, est le premier télescopique électrique compact de la marque. Disponible à la commande chez AMC.",
    content: [
      {
        type: "intro",
        text: "Magni franchit le cap de l'électrification avec le TH 3.6 e, son premier télescopique entièrement électrique. Dévoilé au GIS 2025 (INTERMAT), ce modèle compact ouvre une nouvelle ère pour les chantiers en zones sensibles : silence, zéro émission locale, et performances équivalentes aux versions thermiques.",
      },
      { type: "h2", text: "Capacité 3 tonnes, hauteur 6 mètres : le compact polyvalent" },
      {
        type: "p",
        text: "Le TH 3.6 e s'adresse aux applications où un télescopique compact est nécessaire mais où les contraintes environnementales excluent le thermique : chantiers en centre-ville, intérieurs d'usines, bâtiments classés, zones à faibles émissions. Avec 3 tonnes de capacité maximale et 6 mètres de hauteur de travail, il couvre la majorité des besoins de manutention de chantier léger et de bâtiment.",
      },
      { type: "h2", text: "Batterie 350V et charge rapide CCS Superfast" },
      {
        type: "p",
        text: "Le système d'énergie du TH 3.6 e repose sur une batterie haute tension 350V. En option, le chargeur CCS Superfast permet d'atteindre 80 % de charge en seulement une heure, éliminant l'attente comme frein à la productivité. La charge standard overnight reste disponible pour les chantiers disposant d'un branchement 230V simple.",
      },
      {
        type: "ul",
        items: [
          "Capacité max 3 000 kg — hauteur de travail 6 m",
          "Batterie 350V — autonomie suffisante pour une journée standard",
          "Option CCS Superfast : 0 à 80 % en 1 heure",
          "Transmission hydrostatique avec récupération d'énergie au freinage",
          "Zéro émission locale — silencieux pour les chantiers en zones sensibles",
          "TCO compétitif vs thermique sur cycles d'utilisation intensifs",
        ],
      },
      { type: "h2", text: "Transmission hydrostatique et récupération d'énergie" },
      {
        type: "p",
        text: "La transmission hydrostatique du TH 3.6 e intègre un système de récupération d'énergie cinétique lors des phases de freinage et de descente de charge. Cette énergie est réinjectée dans la batterie, améliorant l'autonomie réelle en usage cyclique — typiquement lors du déchargement de camions ou des va-et-vient répétitifs sur les chantiers de stockage.",
      },
      { type: "h2", text: "TCO compétitif : l'argument économique" },
      {
        type: "p",
        text: "Au-delà du bilan carbone, le TH 3.6 e présente un TCO (coût total de possession) attractif sur la durée. Le coût de l'énergie électrique représente environ 20 à 30 % de celui d'un plein diesel équivalent. La maintenance préventive est allégée : pas de vidange moteur, pas de filtre à carburant, moins de pièces d'usure sur la transmission. Sur un cycle de vie de 5 à 7 ans, l'économie réalisée peut représenter plusieurs dizaines de milliers d'euros.",
      },
      {
        type: "callout",
        title: "Commandez dès maintenant chez AMC",
        body: "Le Magni TH 3.6 e est disponible à la commande chez AMC. Nos conseillers vous accompagnent dans l'analyse de votre retour sur investissement et les solutions de financement adaptées.",
      },
      { type: "cta", label: "Nous contacter pour ce modèle", href: "/contact" },
    ],
  },

  // ── Article 9 ─────────────────────────────────────────────────────────────
  {
    slug: "choisir-telescopique-rotatif-fixe-guide",
    image: "/images/Magni-catalogue.avif",
    title: "Télescopique rotatif ou fixe : comment choisir pour votre chantier ?",
    category: "Conseils",
    summary:
      "Rotation 360° ou axe fixe ? Ce guide pratique vous aide à choisir entre télescopique rotatif et fixe selon vos chantiers, votre budget et la polyvalence requise.",
    date: "10 février 2025",
    readTime: "5 min",
    gradientFrom: "#6366f1",
    gradientTo: "#312e81",
    icon: "📋",
    metaTitle: "Choisir télescopique rotatif ou fixe — guide pratique AMC",
    metaDescription:
      "Télescopique rotatif ou fixe : critères de choix, avantages, usages idéaux. Guide expert AMC distributeur Magni en Rhône-Alpes.",
    content: [
      {
        type: "intro",
        text: "Le choix entre un télescopique rotatif et un télescopique fixe est l'une des questions les plus fréquentes que nos conseillers traitent chez AMC. Les deux types de machines partagent le même principe de base — une flèche télescopique pour lever et déplacer des charges — mais leurs usages optimaux divergent significativement. Faire le mauvais choix peut coûter cher en termes de productivité ou d'investissement inutile.",
      },
      { type: "h2", text: "Le télescopique fixe : efficacité sur axes répétitifs" },
      {
        type: "p",
        text: "Le télescopique à flèche fixe (également appelé « chariot télescopique » ou « manitou fixe ») déplace la charge dans un seul plan sans rotation de la tourelle. C'est sa principale contrainte, mais aussi sa force : la conception est plus simple, la maintenance moins lourde, et le coût d'acquisition inférieur de 30 à 50 % par rapport à un rotatif de capacité équivalente.",
      },
      {
        type: "ul",
        items: [
          "Coût d'acquisition inférieur de 30 à 50 % vs rotatif équivalent",
          "Maintenance plus simple — moins de composants hydrauliques rotatifs",
          "Stabilité maximale en charge frontale — idéal pour manutention répétitive sur axe fixe",
          "Usages typiques : agriculture, logistique, déchargement de camions, palettisation",
          "Moins adapté aux zones confinées où le positionnement est contraint",
        ],
      },
      { type: "h2", text: "Le télescopique rotatif : une machine, toutes les situations" },
      {
        type: "p",
        text: "La tourelle rotative à 360° change radicalement la logique d'emploi. Plus besoin de déplacer la machine pour atteindre un point difficile d'accès : on tourne. Cette capacité est déterminante dans les chantiers BTP complexes où l'espace de manœuvre est limité — constructions en terrain pentu, centres-villes, bâtiments en R+3 et plus, charpentes industrielles.",
      },
      {
        type: "ul",
        items: [
          "Rotation 360° continue — pas besoin de repositionner le châssis",
          "Une machine remplace plusieurs engins (grue légère, nacelle, chariot)",
          "Idéal : BTP, charpente, industrie lourde, espaces confinés",
          "Accessoires multiples : fourches, nacelle, treuil, godet, pinces",
          "Investissement supérieur justifié par la polyvalence et la réduction des coûts de location tiers",
        ],
      },
      { type: "h2", text: "Les 4 critères décisifs pour votre choix" },
      {
        type: "p",
        text: "Pour orienter votre décision, posez-vous ces quatre questions : Avez-vous besoin de rotation fréquente (plus de 30 % du temps de travail) ? Si oui, le rotatif s'impose. Votre chantier impose-t-il un positionnement contraint de la machine ? Si oui, le rotatif offre une flexibilité irremplaçable. Votre budget d'acquisition est-il serré ? Le fixe sera plus accessible. Cherchez-vous à mutualiser une seule machine sur plusieurs types de tâches ? Le rotatif l'emporte clairement.",
      },
      { type: "h2", text: "La gamme Magni chez AMC : fixe et rotatif pour tous les besoins" },
      {
        type: "p",
        text: "AMC propose l'intégralité de la gamme Magni en Rhône-Alpes : modèles fixes TH (3 à 25 tonnes) et rotatifs RTH (4 à 10 tonnes). Nos conseillers techniques analysent votre cahier des charges — type de chantier, fréquence d'utilisation, accessoires nécessaires — pour vous recommander le modèle le plus rentable sur la durée. SAV certifié constructeur et pièces d'origine garantis.",
      },
      {
        type: "callout",
        title: "Conseil personnalisé gratuit",
        body: "Appelez-nous ou remplissez le formulaire de contact : un conseiller AMC vous rappelle sous 24h pour analyser votre besoin et vous recommander le bon modèle.",
      },
      { type: "cta", label: "Parler à un expert AMC", href: "/contact" },
    ],
  },

  // ── Article 10 ────────────────────────────────────────────────────────────
  {
    slug: "entretien-hivernal-materiel-chantier",
    image: "/images/Slide-3.jpg",
    title: "Entretien hivernal de votre matériel de chantier : les 5 vérifications indispensables",
    category: "Conseils",
    summary:
      "Températures négatives, humidité, gel : l'hiver est la période la plus éprouvante pour vos engins. Voici les 5 vérifications à ne pas manquer avant la saison froide.",
    date: "3 novembre 2025",
    readTime: "5 min",
    gradientFrom: "#64748b",
    gradientTo: "#1e3a5f",
    icon: "❄️",
    metaTitle: "Entretien hivernal matériel chantier — 5 vérifications clés",
    metaDescription:
      "Préparez vos engins de chantier pour l'hiver : huile moteur, filtres, flexibles, batterie, antigel. Guide pratique AMC — atelier certifié.",
    content: [
      {
        type: "intro",
        text: "L'hiver est la période la plus critique pour les engins de chantier. Les températures négatives, la condensation, l'humidité et les cycles gel-dégel accélèrent l'usure de composants qui semblaient en parfait état en été. Une machine mal préparée pour l'hiver, c'est un démarrage difficile le matin, une panne en plein chantier, ou une casse coûteuse au printemps. Voici les 5 vérifications que nos techniciens certifiés réalisent systématiquement avant la saison froide.",
      },
      { type: "h2", text: "1. Niveaux d'huile moteur et hydraulique : les grades hivernaux" },
      {
        type: "p",
        text: "Les huiles moteur et hydrauliques voient leur viscosité augmenter par temps froid. Une huile trop épaisse au démarrage freine la lubrification des organes à froid et force le démarreur. Vérifiez que les grades utilisés correspondent aux préconisations hivernales du constructeur (typiquement 5W-30 ou 10W-40 pour les moteurs, HV46 pour l'hydraulique). Si la machine reste en conditions extrêmes (<-15°C), un changement d'huile avec des grades adaptés s'impose.",
      },
      { type: "h2", text: "2. Filtres air et carburant : l'humidité accélère le colmatage" },
      {
        type: "p",
        text: "L'humidité hivernale condense dans les filtres à carburant et favorise le développement de micro-organismes (algues, bactéries) dans le gasoil. Un filtre partiellement colmaté se bouche complètement au premier grand froid. Remplacez les filtres air et carburant avant l'entrée en hiver, surtout si les derniers remplacements datent de plus de 500 heures ou de 12 mois. Vérifiez également les décanteurs eau/carburant et vidangez-les si nécessaire.",
      },
      { type: "h2", text: "3. Flexibles et courroies : le froid fragilise le caoutchouc" },
      {
        type: "p",
        text: "Le caoutchouc durcit et perd de son élasticité sous le gel. Les flexibles hydrauliques présentent un risque de fissuration accru, notamment aux points de courbure et aux sertissages. Inspectez visuellement l'ensemble des flexibles visibles : craquelures superficielles, déformations, traces d'huile autour des raccords. Une courroie de distribution ou d'accessoires qui lâche en hiver peut immobiliser la machine en urgence. Anticipez leur remplacement si elles approchent de la fin de leur durée de vie préconisée.",
      },
      { type: "h2", text: "4. Batterie : tester la charge et nettoyer les bornes" },
      {
        type: "p",
        text: "Une batterie à 60 % de sa capacité en été peut ne plus suffire à démarrer le moteur à -10°C. Le froid réduit significativement la capacité de délivrer le courant de démarrage (CCA). Faites tester la capacité résiduelle de votre batterie avec un testeur de charge — un investissement de quelques euros qui évite une panne garantie. Nettoyez les bornes avec une brosse métallique et appliquez une graisse anti-oxydante. Si la batterie a plus de 3 ans, envisagez un remplacement préventif.",
      },
      { type: "h2", text: "5. Circuit de refroidissement : l'antigel ne se renouvelle pas tout seul" },
      {
        type: "p",
        text: "L'antigel se dégrade progressivement : ses inhibiteurs de corrosion s'épuisent et son point de congélation remonte. Vérifiez la concentration à l'aide d'un réfractomètre (protection recommandée jusqu'à -30°C minimum pour nos régions alpines). Si le liquide est âgé de plus de 2 ans, procédez à un rinçage du circuit et à un remplacement complet. Un circuit mal protégé peut conduire à la fissuration du bloc-moteur — une réparation dont le coût dépasse souvent la valeur de l'entretien annuel.",
      },
      {
        type: "callout",
        title: "Conseil bonus : stockage et démarrages réguliers",
        body: "Si votre machine est immobilisée plusieurs semaines, stockez-la à l'abri et effectuez un démarrage toutes les 2 semaines pour maintenir la batterie chargée et lubrifier les organes. Montez à température de fonctionnement avant de la remettre sous charge.",
      },
      {
        type: "p",
        text: "La check-list hivernale prend 2 à 3 heures par machine. C'est peu comparé au temps perdu sur un chantier paralysé par une panne évitable. Si vous souhaitez déléguer cette préparation à nos techniciens, AMC propose des contrats de maintenance préventive annuels couvrant l'ensemble de ces vérifications.",
      },
      { type: "cta", label: "Prendre rendez-vous SAV avant l'hiver", href: "/sav" },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
}
