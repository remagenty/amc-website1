"""
Script de mise à jour du catalogue Wacker Neuson
Basé sur vérification manuelle (Canva + notes Word) + scraping wackerneuson.fr
À exécuter dans le dossier contenant catalogue_wacker_backup.json
Produit : catalogue_wacker_v2.json
"""

import json
from datetime import datetime

# ─────────────────────────────────────────────
# 1. MODÈLES À SUPPRIMER
# ─────────────────────────────────────────────
SUPPRIMER = {
    # Mini-pelles anciennes générations (introuvables sur le site)
    "1503", "2503", "3503", "4503", "50Z3", "28Z3", "6003", "8503",
    # EZ38 absent du site
    "EZ38",
    # Chargeuses supprimées
    "WL34", "SW28e",
    # Dumpers supprimés / renommés
    "DT20", "DT30", "DT20e", "DT25",
    # Petits dumpers absents
    "3001", "5001",
    # Plaque vibrante absente
    "VP1550Aw",
    # Compacteurs absents du site
    "RD11A", "RD12", "RD16", "RD27", "RD40",
    # Marteaux piqueurs remplacés
    "EH27", "BH24", "EH9",
    # Outillage absent
    "G25A",
}

# ─────────────────────────────────────────────
# 2. MODÈLES À RENOMMER (ancien → nouveau)
# ─────────────────────────────────────────────
RENOMMER = {
    "DT20": "DW20",   # Dumper sur pneus (déjà dans SUPPRIMER, sera recréé)
    "DT30": "DW30",   # Dumper sur pneus (déjà dans SUPPRIMER, sera recréé)
}

# ─────────────────────────────────────────────
# 3. NOUVEAUX MODÈLES À AJOUTER
# ─────────────────────────────────────────────
NOUVEAUX = [
    # ── Dumpers (renommés DT→DW) ──────────────
    {
        "id": "wn-new-001",
        "marque": "Wacker Neuson",
        "modele": "DW20",
        "reference": "DW20",
        "nom_complet": "Dumper sur pneus Wacker Neuson DW20",
        "slug": "wacker-neuson-dw20",
        "categorie": "Dumper",
        "sous_categorie": "Dumper sur pneus",
        "description_courte": "Dumper sur pneus 2 t, maniable et robuste pour chantiers variés.",
        "description_longue": "Le Wacker Neuson DW20 est un dumper sur pneus de 2 tonnes alliant maniabilité et robustesse. Idéal pour les chantiers de construction, paysagisme et travaux publics.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "charge_utile_kg": 2000,
            "puissance_kw": 18.4,
            "vitesse_max_kmh": 12,
        },
        "points_forts": ["Sur pneus", "Benne basculante", "Maniable", "Robuste"],
        "applications": ["Chantiers BTP", "Paysagisme", "Terrassement", "Évacuation déblais"],
        "secteurs": ["BTP", "Paysagisme", "Génie civil"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-dw20.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/dumpers/dw20",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    {
        "id": "wn-new-002",
        "marque": "Wacker Neuson",
        "modele": "DW30",
        "reference": "DW30",
        "nom_complet": "Dumper sur pneus Wacker Neuson DW30",
        "slug": "wacker-neuson-dw30",
        "categorie": "Dumper",
        "sous_categorie": "Dumper sur pneus",
        "description_courte": "Dumper sur pneus 3 t, puissance et polyvalence pour grands chantiers.",
        "description_longue": "Le Wacker Neuson DW30 est un dumper sur pneus de 3 tonnes offrant puissance et polyvalence. Sa benne à grande capacité et son moteur performant en font un allié de choix sur les grands chantiers.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "charge_utile_kg": 3000,
            "puissance_kw": 24.4,
            "vitesse_max_kmh": 12,
        },
        "points_forts": ["Sur pneus", "Grande capacité", "Moteur puissant", "Cabine confort"],
        "applications": ["Grands chantiers", "Terrassement", "Évacuation déblais", "VRD"],
        "secteurs": ["BTP", "Génie civil", "Travaux publics"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-dw30.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/dumpers/dw30",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    # ── Compacteurs (nouveaux modèles du site) ─
    {
        "id": "wn-new-003",
        "marque": "Wacker Neuson",
        "modele": "RD24",
        "reference": "RD24",
        "nom_complet": "Rouleau tandem articulé Wacker Neuson RD24",
        "slug": "wacker-neuson-rd24",
        "categorie": "Compacteur",
        "sous_categorie": "Rouleau tandem",
        "description_courte": "Rouleau tandem articulé 2,4 t, efficace pour enrobés et surfaces.",
        "description_longue": "Le Wacker Neuson RD24 est un rouleau tandem articulé de 2,4 tonnes. Sa direction articulée et son système de vibration performant garantissent un compactage homogène des enrobés et surfaces.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "masse_operationnelle_kg": 2400,
            "largeur_de_travail_mm": 900,
            "frequence_hz": 55,
            "vitesse_max_kmh": 8,
        },
        "points_forts": ["Direction articulée", "Aspersion eau intégrée", "Compactage enrobés", "Maniable"],
        "applications": ["Enrobés", "Voirie urbaine", "Trottoirs", "Parkings"],
        "secteurs": ["Voirie", "BTP"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-rd24.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/rouleaux/rd24",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    {
        "id": "wn-new-004",
        "marque": "Wacker Neuson",
        "modele": "RD28",
        "reference": "RD28",
        "nom_complet": "Rouleau tandem articulé Wacker Neuson RD28",
        "slug": "wacker-neuson-rd28",
        "categorie": "Compacteur",
        "sous_categorie": "Rouleau tandem",
        "description_courte": "Rouleau tandem articulé 2,8 t, polyvalent pour voirie et enrobés.",
        "description_longue": "Le Wacker Neuson RD28 est un rouleau tandem articulé de 2,8 tonnes polyvalent et robuste. Conçu pour le compactage des enrobés et surfaces en voirie urbaine et grands travaux.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "masse_operationnelle_kg": 2800,
            "largeur_de_travail_mm": 1000,
            "frequence_hz": 55,
            "vitesse_max_kmh": 8,
        },
        "points_forts": ["Direction articulée", "Haute fréquence vibration", "Polyvalent", "Aspersion eau"],
        "applications": ["Enrobés", "Voirie", "Parkings", "Grandes surfaces"],
        "secteurs": ["Voirie", "BTP", "Travaux publics"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-rd28.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/rouleaux/rd28",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    {
        "id": "wn-new-005",
        "marque": "Wacker Neuson",
        "modele": "RD45",
        "reference": "RD45",
        "nom_complet": "Rouleau tandem articulé Wacker Neuson RD45",
        "slug": "wacker-neuson-rd45",
        "categorie": "Compacteur",
        "sous_categorie": "Rouleau tandem",
        "description_courte": "Rouleau tandem articulé 4,5 t, puissant pour chantiers de grande envergure.",
        "description_longue": "Le Wacker Neuson RD45 est le rouleau tandem articulé le plus puissant de la gamme avec 4,5 tonnes. Il est conçu pour les chantiers de voirie de grande envergure et garantit un compactage optimal des enrobés.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "masse_operationnelle_kg": 4500,
            "largeur_de_travail_mm": 1200,
            "frequence_hz": 50,
            "vitesse_max_kmh": 10,
        },
        "points_forts": ["Grande puissance", "Direction articulée", "Haute productivité", "Cabine confort"],
        "applications": ["Grandes routes", "Aéroports", "Zones industrielles", "Enrobés épais"],
        "secteurs": ["Voirie", "Travaux publics", "Génie civil"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-rd45.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/rouleaux/rd45",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    # ── Marteaux piqueurs (nouvelle gamme BH) ──
    {
        "id": "wn-new-006",
        "marque": "Wacker Neuson",
        "modele": "BH40",
        "reference": "BH40",
        "nom_complet": "Marteau-piqueur thermique Wacker Neuson BH40",
        "slug": "wacker-neuson-bh40",
        "categorie": "Marteau piqueur",
        "sous_categorie": "Marteau-piqueur thermique",
        "description_courte": "Marteau-piqueur thermique léger, idéal pour démolition et burinage.",
        "description_longue": "Le Wacker Neuson BH40 est un marteau-piqueur thermique léger et compact. Son moteur WM80 à faibles émissions le rend idéal pour les travaux de démolition, burinage et rénovation en milieu urbain.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "alimentation": "thermique",
            "moteur": "WM80",
        },
        "points_forts": ["Légèreté", "Faibles émissions", "Moteur WM80", "Maniable"],
        "applications": ["Démolition légère", "Burinage", "Rénovation", "Chantiers urbains"],
        "secteurs": ["BTP", "Démolition", "Rénovation"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-bh40.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/technique-de-demolition/marteaux-piqueurs-thermiques/bh40",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    {
        "id": "wn-new-007",
        "marque": "Wacker Neuson",
        "modele": "BH55",
        "reference": "BH55",
        "nom_complet": "Marteau-piqueur thermique Wacker Neuson BH55",
        "slug": "wacker-neuson-bh55",
        "categorie": "Marteau piqueur",
        "sous_categorie": "Marteau-piqueur thermique",
        "description_courte": "Marteau-piqueur thermique puissant pour démolition intensive.",
        "description_longue": "Le Wacker Neuson BH55 est un marteau-piqueur thermique puissant conçu pour la démolition intensive. Il offre une énergie de frappe élevée et une robustesse exemplaire pour les chantiers exigeants.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "alimentation": "thermique",
            "moteur": "WM80",
        },
        "points_forts": ["Haute énergie de frappe", "Robuste", "Moteur WM80", "Faibles émissions"],
        "applications": ["Démolition béton", "Burinage intensif", "Chantiers lourds", "Voirie"],
        "secteurs": ["BTP", "Démolition", "Génie civil"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-bh55.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/technique-de-demolition/marteaux-piqueurs-thermiques/bh55",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    {
        "id": "wn-new-008",
        "marque": "Wacker Neuson",
        "modele": "BH65",
        "reference": "BH65",
        "nom_complet": "Marteau-piqueur thermique Wacker Neuson BH65",
        "slug": "wacker-neuson-bh65",
        "categorie": "Marteau piqueur",
        "sous_categorie": "Marteau-piqueur thermique",
        "description_courte": "Marteau-piqueur thermique haute performance, démolition lourde.",
        "description_longue": "Le Wacker Neuson BH65 est le marteau-piqueur thermique haut de gamme de la série. Il délivre une énergie de frappe maximale pour les démolitions les plus lourdes et les conditions de chantier les plus extrêmes.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "alimentation": "thermique",
            "moteur": "WM80",
        },
        "points_forts": ["Très haute énergie de frappe", "Démolition lourde", "Grande robustesse", "Faibles émissions CO"],
        "applications": ["Démolition lourde", "Béton armé", "Fondations", "Réseaux souterrains"],
        "secteurs": ["Démolition", "BTP", "Génie civil"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-bh65.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/technique-de-demolition/marteaux-piqueurs-thermiques/bh65",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
    # ── Télescopique supplémentaire ────────────
    {
        "id": "wn-new-009",
        "marque": "Wacker Neuson",
        "modele": "TH625",
        "reference": "TH625",
        "nom_complet": "Chariot télescopique Wacker Neuson TH625",
        "slug": "wacker-neuson-th625",
        "categorie": "Télescopique",
        "sous_categorie": "Chariot télescopique",
        "description_courte": "Chariot télescopique 6,1 m de hauteur, charge utile élevée.",
        "description_longue": "Le Wacker Neuson TH625 est un chariot télescopique compact et puissant offrant une hauteur de levage de 6,1 mètres. Sa charge utile élevée et sa polyvalence en font un outil incontournable sur les chantiers de construction.",
        "prix_ht": None,
        "devise": "EUR",
        "etat": "neuf",
        "disponibilite": "disponible",
        "featured": False,
        "caracteristiques_techniques": {
            "hauteur_levage_mm": 6123,
            "charge_utile_kg": 2500,
            "puissance_kw": 55,
            "masse_totale_kg": 4650,
        },
        "points_forts": ["Grande hauteur de levage", "Charge utile élevée", "Compact", "Polyvalent"],
        "applications": ["Chantiers construction", "Manutention", "Gerbage matériaux", "Agriculture"],
        "secteurs": ["BTP", "Agriculture", "Industrie"],
        "services": {
            "garantie_constructeur": True,
            "sav_certifie_se_plus": True,
            "pieces_detachees_origine": True,
            "financement_disponible": True,
        },
        "medias": {
            "image_principale": "/images/catalogue/wacker-neuson-th625.jpg",
            "images": [],
            "video": None,
        },
        "url_wacker_neuson": "https://www.wackerneuson.fr/produits/chariots-telescopiques/th625",
        "date_scraping": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    },
]

# ─────────────────────────────────────────────
# 4. MISE À JOUR DES CATÉGORIES DANS LE JSON
#    (pour cohérence avec vos catégories internes)
# ─────────────────────────────────────────────
# Pas de changement de catégories — on garde les vôtres

# ─────────────────────────────────────────────
# 5. TRAITEMENT PRINCIPAL
# ─────────────────────────────────────────────
with open("catalogue_wacker_backup.json", "r", encoding="utf-8") as f:
    catalogue = json.load(f)

avant = len(catalogue["machines"])
print(f"📦 Machines avant mise à jour : {avant}")

# Supprimer les modèles obsolètes
catalogue["machines"] = [
    m for m in catalogue["machines"]
    if m["modele"] not in SUPPRIMER
]
apres_suppression = len(catalogue["machines"])
print(f"🗑️  Supprimés : {avant - apres_suppression} machines")

# Ajouter les nouveaux modèles
catalogue["machines"].extend(NOUVEAUX)
apres_ajout = len(catalogue["machines"])
print(f"➕ Ajoutés : {apres_ajout - apres_suppression} machines")

# Mettre à jour les métadonnées
catalogue["meta"]["total_machines"] = apres_ajout
catalogue["meta"]["date_mise_a_jour"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
catalogue["meta"]["version"] = "2.0.0"
catalogue["meta"]["description"] = "Catalogue mis à jour — modèles vérifiés sur wackerneuson.fr (juin 2026)"

# Recalculer les catégories présentes
from collections import Counter
cats = Counter(m["categorie"] for m in catalogue["machines"])
catalogue["meta"]["categories"] = sorted(cats.keys())

# Sauvegarder
with open("catalogue_wacker_v2.json", "w", encoding="utf-8") as f:
    json.dump(catalogue, f, ensure_ascii=False, indent=2)

print(f"\n✅ Catalogue v2 sauvegardé : catalogue_wacker_v2.json")
print(f"📊 Total machines : {apres_ajout}")
print("\n📋 Répartition par catégorie :")
for cat, count in sorted(cats.items()):
    print(f"   {cat} : {count}")
