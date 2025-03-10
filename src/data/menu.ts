import { MenuItem, MenuSection } from "../types/menu";

export const menuData: MenuSection[] = [
  {
    id: "burgers",
    title: "Burgers",
    items: [
      {
        id: "classic-burger",
        name: "Le Classique",
        description: "Bœuf Black Angus, cheddar affiné, bacon fumé, laitue, tomate, oignon rouge, sauce maison",
        price: 14.90,
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
        allergens: ["Gluten", "Lactose"],
        tags: ["Bestseller"]
      },
      // Ajout du nouveau Smash Burger
      {
        id: "smash-burger",
        name: "Smash Burger",
        description: "Bœuf Black Angus écrasé sur la plancha, double cheddar fondant, pickles maison, oignons caramélisés, sauce secrète",
        price: 15.90,
        image: "https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?auto=format&fit=crop&w=800&q=80",
        allergens: ["Gluten", "Lactose"],
        tags: ["Nouveau", "Spécial"]
      },
      {
        id: "vege-burger",
        name: "Le Végétarien",
        description: "Galette de légumes maison, fromage de chèvre, avocat, roquette, tomate, sauce aux herbes",
        price: 13.90,
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80",
        allergens: ["Gluten", "Lactose"],
        tags: ["Végétarien"]
      },
    ]
  },
];