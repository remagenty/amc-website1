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
  metaTitle: string;
  metaDescription: string;
  content: ContentBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "wacker-neuson-gamme-zero-emission-2026",
    title: "Wacker Neuson lance sa nouvelle gamme zéro émission 2026",
    category: "Nouveautés",
    summary:
      "Découvrez la révolution électrique avec les nouvelles mini-pelles et compacteurs 100% électriques. Performance maximale, zéro émission, pour des chantiers urbains plus propres.",
    date: "15 mai 2026",
    readTime: "4 min",
    gradientFrom: "#34d399",
    gradientTo: "#0f766e",
    icon: "⚡",
    metaTitle: "Wacker Neuson gamme zéro émission 2026",
    metaDescription:
      "Découvrez la nouvelle gamme électrique Wacker Neuson 2026 : mini-pelles EZ17e, EZ26e et compacteurs zéro émission. Disponible chez AMC en Savoie.",
    content: [
      {
        type: "intro",
        text: "Le secteur du BTP vit une mutation profonde. Face aux restrictions croissantes sur les émissions dans les centres-villes et aux zones à faibles émissions (ZFE), les constructeurs accélèrent leur transition électrique. Wacker Neuson, pionnier de l'électrification des engins compacts, franchit une nouvelle étape avec sa gamme zéro émission 2026, désormais disponible chez AMC Alpes Matériel Compact.",
      },
      {
        type: "h2",
        text: "La révolution électrique dans le BTP",
      },
      {
        type: "p",
        text: "En Europe, les zones à faibles émissions se multiplient. Paris, Lyon, Grenoble, et bientôt de nombreuses agglomérations imposent des restrictions strictes aux engins thermiques dans leurs centres. Pour les entreprises de BTP, cela représente un défi majeur : continuer à travailler en milieu urbain sans enfreindre les réglementations environnementales. La réponse de Wacker Neuson est claire : des machines 100 % électriques aussi performantes que leurs homologues diesel.",
      },
      {
        type: "h2",
        text: "La gamme zéro émission Wacker Neuson 2026",
      },
      {
        type: "p",
        text: "Wacker Neuson développe sa gamme « zero emission » depuis plusieurs années. La version 2026 marque une rupture technologique significative, avec des batteries lithium-ion de nouvelle génération offrant une densité énergétique améliorée de 30 % par rapport à la génération précédente. Le résultat : des machines plus légères, plus puissantes et disposant d'une autonomie suffisante pour une journée de chantier complète.",
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
        text: "La gamme de compacteurs électriques Wacker Neuson couvre plaques vibrantes, pilonneuses et rouleaux tandem. Ces machines silencieuses sont particulièrement adaptées aux travaux de nuit, aux chantiers de proximité et aux rénovations en milieu occupé. La plaque vibrante VP1550e, par exemple, offre une force centrifuge de 15 kN avec une autonomie de 4 heures, sans aucune émission ni huile à changer.",
      },
      {
        type: "quote",
        text: "Depuis que nous avons intégré les compacteurs électriques Wacker Neuson sur nos chantiers lyonnais, nos équipes travaillent dans de meilleures conditions. Plus de bruit, plus d'odeurs de carburant, et nous avons accès aux ZFE sans restriction. C'est un vrai gain opérationnel.",
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
        text: "En tant que distributeur officiel Wacker Neuson pour la Haute-Savoie et la Savoie, AMC propose l'intégralité de la gamme zéro émission 2026 en démonstration et en stock. Nos conseillers techniques peuvent vous accompagner dans la transition électrique de votre parc : analyse des besoins, essais sur vos chantiers, calcul du retour sur investissement. Des solutions de financement adaptées (leasing, location longue durée) sont disponibles pour faciliter l'acquisition.",
      },
      {
        type: "callout",
        title: "Essai gratuit sur votre chantier",
        body: "AMC propose des démonstrations gratuites des machines électriques Wacker Neuson directement sur vos chantiers. Contactez-nous pour planifier un essai sans engagement.",
      },
      { type: "cta", label: "Demander un devis", href: "/contact?type=devis" },
    ],
  },

  {
    slug: "5-conseils-maintenance-engins-chantier",
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
      "Nos experts AMC partagent 5 conseils essentiels pour optimiser la maintenance préventive de vos engins de chantier Wacker Neuson, Magni et Promove Demolition.",
    content: [
      {
        type: "intro",
        text: "Un engin de chantier bien entretenu, c'est une machine qui dure deux fois plus longtemps, qui tombe en panne deux fois moins souvent et qui conserve une valeur de revente significativement supérieure. Pourtant, la maintenance préventive reste le parent pauvre des entreprises de BTP, souvent sacrifiée sur l'autel de la rentabilité immédiate. Voici les 5 conseils de nos techniciens certifiés SE+ pour changer la donne.",
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
        text: "Wacker Neuson, Magni et Promove Demolition définissent des intervalles de maintenance précis dans leurs manuels d'entretien : 250h, 500h, 1 000h et 2 000h selon les opérations. Ces intervalles ne sont pas des suggestions : ils sont calculés pour garantir la fiabilité des composants et maintenir la garantie constructeur. Tenir un carnet d'entretien à jour est indispensable, notamment en cas de revente ou de sinistre.",
      },
      {
        type: "h2",
        text: "Conseil 3 — Utilisez exclusivement des pièces d'origine",
      },
      {
        type: "p",
        text: "Les pièces de remplacement génériques peuvent sembler économiques à l'achat. En réalité, elles engendrent souvent des surcoûts importants : usure prématurée des composants adjacents, non-conformité aux tolérances constructeur, incompatibilité avec les systèmes électroniques. Les pièces d'origine Wacker Neuson et Magni garantissent les mêmes spécifications que les composants d'origine, préservent la garantie et assurent la traçabilité des interventions.",
      },
      {
        type: "h2",
        text: "Conseil 4 — Formez vos opérateurs aux bonnes pratiques",
      },
      {
        type: "p",
        text: "L'erreur humaine et la mauvaise utilisation sont responsables d'une part importante de l'usure prématurée des engins. Une formation aux bonnes pratiques opérateur — démarrage à froid, montée en température, cycles hydrauliques, stationnement — peut considérablement allonger la durée de vie des composants. Wacker Neuson propose des programmes de formation opérateur que nos équipes AMC peuvent organiser sur site.",
      },
      {
        type: "h2",
        text: "Conseil 5 — Confiez vos révisions à un atelier certifié SE+",
      },
      {
        type: "p",
        text: "Toutes les révisions ne se valent pas. Un atelier certifié SE+ dispose des outils de diagnostic spécifiques au constructeur, emploie des techniciens formés et certifiés, et utilise des procédures validées par le fabricant. Faire réaliser les grandes révisions par un atelier certifié, c'est garantir que le travail est fait dans les règles de l'art et que votre garantie constructeur est préservée.",
      },
      {
        type: "callout",
        title: "L'atelier AMC : certifié SE+ par Wacker Neuson",
        body: "Notre atelier de Saint-Félix dispose de 3 techniciens certifiés Wacker Neuson, Magni et Promove Demolition. Stock de pièces détachées d'origine disponible immédiatement. Diagnostic électronique constructeur. Délai d'intervention sous 48h ouvrées.",
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
    title: "AMC obtient la certification SE+ pour son atelier de Saint-Félix",
    category: "Actualités",
    summary:
      "Notre atelier est désormais certifié SE+ par Wacker Neuson, garantissant un service après-vente d'excellence avec des techniciens qualifiés et un stock de pièces détachées optimal.",
    date: "3 mai 2026",
    readTime: "4 min",
    gradientFrom: "#fbbf24",
    gradientTo: "#d97706",
    icon: "🏆",
    metaTitle: "AMC certifié SE+ — Atelier SAV Saint-Félix Haute-Savoie",
    metaDescription:
      "L'atelier AMC de Saint-Félix obtient la certification SE+ Wacker Neuson. Découvrez ce que ce label d'excellence garantit pour vos interventions SAV.",
    content: [
      {
        type: "intro",
        text: "C'est avec fierté qu'AMC Alpes Matériel Compact annonce l'obtention de la certification SE+ (Service Excellence Plus) par Wacker Neuson pour son atelier de Saint-Félix, en Haute-Savoie. Cette accréditation, la plus exigeante du secteur des équipements compacts de chantier, récompense plusieurs années d'investissement dans la formation de nos techniciens et dans nos équipements de diagnostic.",
      },
      {
        type: "h2",
        text: "La certification SE+ : qu'est-ce que c'est ?",
      },
      {
        type: "p",
        text: "Créée par Wacker Neuson, la certification SE+ (Service Excellence Plus) est le label de référence pour les ateliers SAV spécialisés dans les équipements compacts de chantier. Elle distingue les centres de service qui répondent aux critères les plus stricts en matière de compétences techniques, d'équipements et de réactivité. En France, seule une poignée de distributeurs disposent de ce label sur l'ensemble du territoire.",
      },
      {
        type: "ul",
        items: [
          "Techniciens formés et certifiés directement par Wacker Neuson, avec recyclage annuel obligatoire",
          "Outillage spécifique agréé par le constructeur pour chaque type d'intervention",
          "Stock de pièces détachées d'origine dimensionné pour garantir une disponibilité immédiate",
          "Délai d'intervention maximum garanti contractuellement (48h ouvrées)",
          "Traçabilité complète de chaque intervention via le système constructeur",
          "Audit qualité annuel réalisé par les équipes Wacker Neuson",
        ],
      },
      {
        type: "h2",
        text: "Les critères d'obtention : une exigence de chaque instant",
      },
      {
        type: "p",
        text: "L'audit d'obtention de la certification SE+ dure deux jours. Les auditeurs Wacker Neuson contrôlent chaque aspect du service : conformité des équipements de diagnostic, maîtrise technique des intervenants sur des cas réels, organisation du stock de pièces, systèmes de traçabilité, conditions d'accueil des clients. C'est un processus rigoureux qui ne souffre aucun compromis.",
      },
      {
        type: "h2",
        text: "L'atelier AMC de Saint-Félix en chiffres",
      },
      {
        type: "ul",
        items: [
          "500 m² d'atelier équipé, dont 2 fosses de visite et un pont élévateur grande capacité",
          "3 techniciens certifiés Wacker Neuson, Magni et Promove Demolition",
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
        text: "Grâce à la certification SE+, les clients AMC bénéficient d'un niveau de service inégalé dans la région. Diagnostic électronique complet, réparations moteur et hydraulique, révisions périodiques constructeur, mise à jour des systèmes embarqués : tous les types d'interventions sont couverts. La garantie constructeur de vos machines est intégralement préservée lorsque les interventions sont réalisées dans un atelier certifié.",
      },
      {
        type: "quote",
        text: "Obtenir la certification SE+ est la consécration d'un travail d'équipe. Nos techniciens sont passionnés par leur métier, et cette reconnaissance de Wacker Neuson valide leur niveau d'expertise. Pour nos clients, c'est la garantie d'un service réalisé exactement comme le préconise le constructeur.",
        author: "Rémi Fontaine",
        role: "Responsable atelier SAV, AMC Alpes Matériel Compact",
      },
      {
        type: "h2",
        text: "AMC, distributeur officiel Wacker Neuson pour les deux Savoies",
      },
      {
        type: "p",
        text: "AMC est le distributeur exclusif de Wacker Neuson pour la Haute-Savoie et la Savoie. Cette double accréditation — distributeur officiel et atelier certifié SE+ — garantit à nos clients une continuité de service optimale, de l'achat de la machine à la maintenance sur toute sa durée de vie. Nos équipes commerciales et techniques travaillent en synergie pour offrir le meilleur accompagnement possible aux professionnels du BTP de la région.",
      },
      {
        type: "callout",
        title: "Votre machine Wacker Neuson nécessite une intervention ?",
        body: "Contactez directement notre atelier certifié SE+ au 04 26 78 43 90 ou via notre formulaire en ligne. Nous vous répondons sous 24h ouvrées et proposons la prise en charge ou la venue d'un technicien sur site.",
      },
      { type: "cta", label: "Découvrir nos services SAV", href: "/services" },
    ],
  },

  {
    slug: "chantiers-montagne-quel-equipement-choisir",
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
      "Guide complet pour choisir le bon matériel de chantier en montagne : mini-pelles Wacker Neuson, dumpers, compacteurs et télescopiques Magni adaptés aux Alpes.",
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
        text: "Pour les travaux d'excavation, de terrassement et de pose de réseaux en altitude, les mini-pelles Wacker Neuson s'imposent comme le choix de référence. Leur faible largeur de transport, leur capacité à travailler en dévers et leur polyvalence en font des outils universels sur les chantiers alpins.",
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
        text: "Le transport de matériaux sur des pentes supérieures à 20 % est une problématique spécifique aux chantiers de montagne. Les dumpers articulés Wacker Neuson sont conçus pour ces conditions extrêmes : leur châssis articulé au centre leur confère une motricité exceptionnelle, tandis que leur basse centre de gravité garantit la stabilité en dévers.",
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
        text: "Le compactage en altitude nécessite des équipements adaptés aux spécificités des sols de montagne : roche concassée, grave naturelle, sols argileux saturés en eau. Les plaques vibrantes réversibles et les rouleaux tandem Wacker Neuson couvrent l'ensemble des situations rencontrées sur les chantiers alpins.",
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
        body: "Notre atelier certifié SE+ dispose d'un véhicule d'intervention mobile pour les dépannages sur site, même en altitude. Nous livrons les machines à louer ou à vendre sur vos chantiers, accompagnées d'une mise en main par nos techniciens.",
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
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
}
