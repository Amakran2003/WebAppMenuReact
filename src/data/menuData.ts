// Define interfaces for menu data structures
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
}

export interface SpecialtyItem {
  id: number;
  name: string;
  description: string;
  image: string;
  menuCategory: string;
  menuItemId: string;
}

// Menu categories and items
export const menuCategories: MenuCategory[] = [
  {
    name: 'Burgers',
    items: [
      { id: 'classic-burger', name: 'Le Classique', description: 'Bœuf Black Angus, cheddar, bacon, laitue, tomate, oignon rouge, sauce maison', price: '14,90€', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80' },
      { id: 'blue-burger', name: 'Le Blue', description: 'Bœuf Black Angus, fromage bleu, champignons caramélisés, roquette, sauce au poivre', price: '15,90€', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80' },
      { id: 'vege-burger', name: 'Le Végétarien', description: 'Galette de légumes, fromage de chèvre, avocat, roquette, tomate, sauce yaourt aux herbes', price: '13,90€', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80' },
      { id: 'bbq-burger', name: 'Le BBQ', description: 'Bœuf Black Angus, cheddar fumé, oignons caramélisés, bacon grillé, sauce BBQ maison', price: '15,90€', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
      { id: 'spicy-burger', name: 'Le Épicé', description: 'Bœuf Black Angus, jalapeños, pepper jack, guacamole, oignons rouges, sauce chipotle', price: '15,90€', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Accompagnements',
    items: [
      { id: 'fries', name: 'Frites Maison', description: 'Frites fraîches coupées à la main, sel de mer', price: '4,50€', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80' },
      { id: 'truffle-fries', name: 'Frites Truffe', description: 'Frites maison à l\'huile de truffe, parmesan râpé, persil', price: '6,50€', image: 'https://media.istockphoto.com/id/2140808381/photo/fries-with-parmesan-cheese-and-truffled-mayonnaise-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=huWMm_nZ7Tha07t0F92gx7uwsYjO796F6peGpfEiz_E=' },
      { id: 'onion-rings', name: 'Rondelles d\'Oignon', description: 'Rondelles d\'oignon panées et croustillantes', price: '5,50€', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80' },
      { id: 'coleslaw', name: 'Salade Cole', description: 'Chou, carotte, oignon rouge, sauce crémeuse', price: '3,90€', image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Boissons',
    items: [
      { id: 'craft-beer', name: 'Bière Artisanale', description: 'Sélection de bières locales (33cl)', price: '6,50€', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80' },
      { id: 'oreo-milkshake', name: 'Milkshake Oréo', description: 'Milkshake crémeux aux biscuits Oréo', price: '7,50€', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
      { id: 'chocolat-milkshake', name: 'Milkshake Chocolat', description: 'Milkshake vanille au chocolat salé maison', price: '7,50€', image: 'https://images.unsplash.com/photo-1624781740834-fbfce1c4690a?auto=format&fit=crop&w=800&q=80' },
      { id: 'homemade-lemonade', name: 'Limonade Maison', description: 'Citron pressé, menthe fraîche, sucre de canne', price: '4,90€', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { id: 'cheesecake', name: 'Gâteau au Fromage', description: 'Gâteau au fromage style New York, coulis de fruits rouges', price: '6,90€', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80' },
      { id: 'brownie', name: 'Brownie', description: 'Brownie chocolat noir, noix de pécan, glace vanille', price: '7,50€', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80' },
      { id: 'apple-pie', name: 'Tarte aux Pommes', description: 'Tarte aux pommes caramélisées, glace cannelle', price: '7,90€', image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=800&q=80' },
    { id: 'chocolat-sundae', name: 'Sundae Chocolat', description: 'Glace vanille, chocolat maison, chantilly fraîche, éclats de noisettes', price: '6,90€', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    name: 'Menus',
    items: [
      { id: 'menu-classic', name: 'Menu Classique', description: 'Burger + Frites + Boisson', price: '18,90€', image: 'https://images.unsplash.com/photo-1619881589970-3303f4446c53?auto=format&fit=crop&w=800&q=80' },
      { id: 'menu-double', name: 'Menu Double', description: 'Double burger + Frites + Boisson', price: '22,90€', image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=800&q=80' },
      { id: 'menu-kids', name: 'Menu Enfant', description: 'Mini burger + Frites + Boisson + Surprise', price: '11,90€', image: 'https://images.unsplash.com/photo-1633896949673-1eb9d131a9b4?auto=format&fit=crop&w=800&q=80' }
    ]
  }
];

// News items for the home page
export const newsItems: NewsItem[] = [
    {
        id: 1,
        title: "Nouveau Sundae chocolat au menu !",
        description: "Notre nouveau Sundae avec chocolat fait maison, chantilly fraîche et éclats de noisettes est disponible dès maintenant.",
        date: "15 octobre 2025",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
        link: "/menu?category=Desserts&item=chocolat-sundae" 
    }
];


// Specialty items for the home page
export const specialties: SpecialtyItem[] = [
  {
    id: 1,
    name: "Le Classique",
    description: "Bœuf, cheddar, bacon, laitue, tomate, oignon",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Burgers",
    menuItemId: "classic-burger"
  },
  {
    id: 2,
    name: "Le Végétarien",
    description: "Galette de légumes, fromage, avocat, roquette",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Burgers",
    menuItemId: "vege-burger"
  },
  {
    id: 3,
    name: "Frites Truffe",
    description: "Frites maison à l'huile de truffe et parmesan",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Accompagnements",
    menuItemId: "truffle-fries"
  },
  {
    id: 4,
    name: "Rondelles d'Oignon",
    description: "Rondelles d'oignon panées et croustillantes",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Accompagnements", 
    menuItemId: "onion-rings"
  },
  {
    id: 5,
    name: "Milkshake Oréo",
    description: "Milkshake crémeux aux biscuits Oréo",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Boissons",
    menuItemId: "oreo-milkshake"
  }
];
