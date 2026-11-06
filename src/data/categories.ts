import { assetUrl } from '../lib/assets'

export interface Category {
  id: string
  slug: string
  name: { de: string; en: string }
  parent?: string
  image?: string
  icon?: string
}

export const categories: Category[] = [
  { id: 'food', slug: 'lebensmittel', name: { de: 'Lebensmittel', en: 'Groceries' }, image: '/images/site/photo-1542838132-92c53300491e.jpg' },
  { id: 'produce', slug: 'obst-gemuese', name: { de: 'Obst & Gemüse', en: 'Fruit & Vegetables' }, parent: 'food' },
  { id: 'meat', slug: 'fleisch-gefluegel', name: { de: 'Fleisch & Geflügel', en: 'Meat & Poultry' }, parent: 'food' },
  { id: 'beef', slug: 'rindfleisch', name: { de: 'Rindfleisch', en: 'Beef' }, parent: 'meat' },
  { id: 'chicken', slug: 'haehnchen', name: { de: 'Hähnchen', en: 'Chicken' }, parent: 'meat' },
  { id: 'turkey', slug: 'pute', name: { de: 'Pute', en: 'Turkey' }, parent: 'meat' },
  { id: 'sausage', slug: 'wurst-aufschnitt', name: { de: 'Wurst & Aufschnitt', en: 'Sausages & Cold Cuts' }, parent: 'food' },
  { id: 'fish', slug: 'fisch-meeresfruechte', name: { de: 'Fisch & Meeresfrüchte', en: 'Fish & Seafood' }, parent: 'food' },
  { id: 'bakery', slug: 'brot-backwaren', name: { de: 'Brot & Backwaren', en: 'Bread & Bakery' }, parent: 'food' },
  { id: 'cakes', slug: 'kuchen-suesswaren', name: { de: 'Kuchen & Süßwaren', en: 'Cakes & Sweets' }, parent: 'food' },
  { id: 'dairy', slug: 'milchprodukte', name: { de: 'Milchprodukte', en: 'Dairy' }, parent: 'food' },
  { id: 'cheese', slug: 'kaese', name: { de: 'Käse', en: 'Cheese' }, parent: 'dairy' },
  { id: 'eggs', slug: 'eier', name: { de: 'Eier', en: 'Eggs' }, parent: 'dairy' },
  { id: 'pasta', slug: 'nudeln-reis-getreide', name: { de: 'Nudeln, Reis & Getreide', en: 'Pasta, Rice & Grains' }, parent: 'food' },
  { id: 'canned', slug: 'konserven', name: { de: 'Konserven', en: 'Canned Goods' }, parent: 'food' },
  { id: 'spices', slug: 'gewuerze-saucen', name: { de: 'Gewürze & Saucen', en: 'Spices & Sauces' }, parent: 'food' },
  { id: 'oils', slug: 'oele-essig', name: { de: 'Öle & Essig', en: 'Oils & Vinegar' }, parent: 'food' },
  { id: 'nuts', slug: 'nuesse-trockenfruechte', name: { de: 'Nüsse & Trockenfrüchte', en: 'Nuts & Dried Fruits' }, parent: 'food' },
  { id: 'breakfast', slug: 'fruehstueck', name: { de: 'Frühstück', en: 'Breakfast' }, parent: 'food' },
  { id: 'snacks', slug: 'snacks', name: { de: 'Snacks', en: 'Snacks' }, parent: 'food' },
  { id: 'chocolate', slug: 'schokolade-suessigkeiten', name: { de: 'Schokolade & Süßigkeiten', en: 'Chocolate & Candy' }, parent: 'food' },
  { id: 'beverages', slug: 'getraenke', name: { de: 'Getränke', en: 'Beverages' }, parent: 'food' },
  { id: 'coffee', slug: 'kaffee-tee', name: { de: 'Kaffee & Tee', en: 'Coffee & Tea' }, parent: 'beverages' },
  { id: 'frozen', slug: 'tiefkuehlprodukte', name: { de: 'Tiefkühlprodukte', en: 'Frozen Food' }, parent: 'food' },
  { id: 'organic', slug: 'bio-produkte', name: { de: 'Bio-Produkte', en: 'Organic Products' }, parent: 'food' },
  { id: 'vegan', slug: 'vegane-produkte', name: { de: 'Vegane Produkte', en: 'Vegan Products' }, parent: 'food' },
  { id: 'home', slug: 'haus-haushalt', name: { de: 'Küche & Haushalt', en: 'Kitchen & Household' } },
  { id: 'living', slug: 'wohnen-dekoration', name: { de: 'Wohnen & Dekoration', en: 'Home & Decoration' } },
  { id: 'appliances', slug: 'haushaltsgeraete', name: { de: 'Haushaltsgeräte', en: 'Home Appliances' } },
  { id: 'electronics', slug: 'elektronik', name: { de: 'Elektronik', en: 'Electronics' } },
  { id: 'computers', slug: 'computer-zubehoer', name: { de: 'Computer & Zubehör', en: 'Computers & Accessories' }, parent: 'electronics' },
  { id: 'phones', slug: 'smartphones-zubehoer', name: { de: 'Smartphones & Zubehör', en: 'Smartphones & Accessories' }, parent: 'electronics' },
  { id: 'beauty', slug: 'beauty-pflege', name: { de: 'Beauty & Pflege', en: 'Beauty & Personal Care' } },
  { id: 'health', slug: 'gesundheit-hygiene', name: { de: 'Gesundheit & Hygiene', en: 'Health & Hygiene' } },
  { id: 'baby', slug: 'baby-kinder', name: { de: 'Baby & Kinder', en: 'Baby & Kids' } },
  { id: 'pets', slug: 'haustiere', name: { de: 'Haustiere', en: 'Pets' } },
  { id: 'sports', slug: 'sport-outdoor', name: { de: 'Sport & Outdoor', en: 'Sports & Outdoors' } },
  { id: 'office', slug: 'buerobedarf', name: { de: 'Bürobedarf', en: 'Office Supplies' } },
  { id: 'books', slug: 'buecher-schreibwaren', name: { de: 'Bücher & Schreibwaren', en: 'Books & Stationery' } },
  { id: 'garden', slug: 'garten-balkon', name: { de: 'Garten & Balkon', en: 'Garden & Balcony' } },
  { id: 'seasonal', slug: 'saisonale-produkte', name: { de: 'Saisonale Produkte', en: 'Seasonal Products' } },
]

for (const c of categories) if (c.image) c.image = assetUrl(c.image)

export const topLevelCategories = categories.filter(c => !c.parent)
export function getCategoryBySlug(slug: string) { return categories.find(c => c.slug === slug) }
export function getCategoryById(id: string) { return categories.find(c => c.id === id) }
export function getChildren(id: string) { return categories.filter(c => c.parent === id) }
