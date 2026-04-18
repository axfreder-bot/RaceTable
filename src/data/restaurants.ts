import {Restaurant} from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'True Food Kitchen',
    cuisine: 'Health Forward',
    city: 'Seattle',
    dishes: [
      {id: 'd1', name: 'Ancient Grain Bowl', protein: 18, carbs: 42, fat: 14, calories: 380, fitScore: 'fits', fitNotes: 'Great pre-run complex carbs'},
      {id: 'd2', name: 'Grass-Fed Burger', protein: 32, carbs: 28, fat: 24, calories: 480, fitScore: 'caution', fitNotes: 'High fat pre-run — save for post-run'},
      {id: 'd3', name: 'Salmon Teriyaki', protein: 38, carbs: 35, fat: 12, calories: 420, fitScore: 'fits', fitNotes: 'Excellent protein-to-carb ratio'},
      {id: 'd4', name: 'Teriyaki Quinoa Bowl', protein: 22, carbs: 55, fat: 10, calories: 430, fitScore: 'fits', fitNotes: 'Balanced recovery meal'},
      {id: 'd5', name: 'Buffalo Chicken Bowl', protein: 35, carbs: 30, fat: 18, calories: 430, fitScore: 'caution', fitNotes: 'Spicy — may upset stomach on long runs'},
    ],
  },
  {
    id: 'r2',
    name: 'Moshulu',
    cuisine: 'Portside',
    city: 'Portland',
    dishes: [
      {id: 'd6', name: 'Fish Tacos (2)', protein: 24, carbs: 28, fat: 14, calories: 360, fitScore: 'fits', fitNotes: 'Light and protein-forward'},
      {id: 'd7', name: 'Clam Chowder Bowl', protein: 14, carbs: 38, fat: 22, calories: 420, fitScore: 'caution', fitNotes: 'Heavy cream — not ideal pre-run'},
      {id: 'd8', name: 'Grilled Salmon Plate', protein: 40, carbs: 20, fat: 16, calories: 400, fitScore: 'fits', fitNotes: 'Clean protein, low carb'},
      {id: 'd9', name: 'Oysters (6pc)', protein: 18, carbs: 8, fat: 6, calories: 170, fitScore: 'fits', fitNotes: 'Zinc-rich, low calorie snack'},
      {id: 'd10', name: 'Fish & Chips', protein: 22, carbs: 52, fat: 24, calories: 540, fitScore: 'avoid', fitNotes: 'Too heavy and fried for training diet'},
    ],
  },
  {
    id: 'r3',
    name: 'MOD Pizza',
    cuisine: 'Fast Casual Pizza',
    city: 'Seattle',
    dishes: [
      {id: 'd11', name: 'Dawg Face Pizza (1/2)', protein: 22, carbs: 55, fat: 14, calories: 430, fitScore: 'fits', fitNotes: 'Good carb-to-protein ratio'},
      {id: 'd12', name: 'Maddy Pizza (1/2)', protein: 20, carbs: 50, fat: 16, calories: 420, fitScore: 'fits', fitNotes: 'Cheese-forward, decent macros'},
      {id: 'd13', name: 'C竞争的 Salad w/ Chicken', protein: 28, carbs: 15, fat: 14, calories: 320, fitScore: 'fits', fitNotes: 'High protein, low carb option'},
      {id: 'd14', name: 'Double Pepperoni (1/2)', protein: 24, carbs: 48, fat: 22, calories: 490, fitScore: 'caution', fitNotes: 'High sodium and fat'},
      {id: 'd15', name: 'Cherriesa Pizza (1/2)', protein: 18, carbs: 52, fat: 18, calories: 460, fitScore: 'caution', fitNotes: 'Sweet sauce adds sugar'},
    ],
  },
  {
    id: 'r4',
    name: 'Chipotle',
    cuisine: 'Mexican',
    city: 'Seattle',
    dishes: [
      {id: 'd16', name: 'Chicken Burrito Bowl', protein: 38, carbs: 65, fat: 14, calories: 570, fitScore: 'fits', fitNotes: 'Excellent post-run recovery bowl'},
      {id: 'd17', name: 'Steak Rice Bowl', protein: 34, carbs: 55, fat: 16, calories: 520, fitScore: 'fits', fitNotes: 'High iron — good for runners'},
      {id: 'd18', name: 'Barbacoa Burrito', protein: 36, carbs: 72, fat: 18, calories: 640, fitScore: 'caution', fitNotes: 'High calorie — portion carefully'},
      {id: 'd19', name: 'Sofritas Bowl', protein: 14, carbs: 48, fat: 10, calories: 340, fitScore: 'fits', fitNotes: 'Plant-based, moderate macros'},
      {id: 'd20', name: 'Chips & Guacamole', protein: 4, carbs: 42, fat: 22, calories: 400, fitScore: 'avoid', fitNotes: 'Too many empty carbs and fat'},
    ],
  },
  {
    id: 'r5',
    name: 'Pike Place Fish Market',
    cuisine: 'Seafood',
    city: 'Seattle',
    dishes: [
      {id: 'd21', name: 'Grilled Wild Salmon', protein: 42, carbs: 5, fat: 14, calories: 330, fitScore: 'fits', fitNotes: 'Lean protein, perfect for cutting weight'},
      {id: 'd22', name: 'Fish & Chips Basket', protein: 24, carbs: 55, fat: 26, calories: 550, fitScore: 'avoid', fitNotes: 'Deep fried — not training-friendly'},
      {id: 'd23', name: 'Smoked Salmon Plate', protein: 36, carbs: 8, fat: 18, calories: 340, fitScore: 'fits', fitNotes: 'Omega-3 rich, moderate portions'},
      {id: 'd24', name: 'Crab Cocktail', protein: 20, carbs: 6, fat: 4, calories: 130, fitScore: 'fits', fitNotes: 'Low calorie, high protein snack'},
      {id: 'd25', name: 'Clam Strips', protein: 16, carbs: 22, fat: 8, calories: 240, fitScore: 'fits', fitNotes: 'Light seafood option'},
    ],
  },
  {
    id: 'r6',
    name: 'Din Tai Fung',
    cuisine: 'Taiwanese',
    city: 'Seattle',
    dishes: [
      {id: 'd26', name: 'Xiao Long Bao (6pc)', protein: 18, carbs: 36, fat: 14, calories: 360, fitScore: 'fits', fitNotes: 'Moderate portions, good carbs'},
      {id: 'd27', name: 'Truffle Pork Chop Noodles', protein: 28, carbs: 55, fat: 16, calories: 500, fitScore: 'fits', fitNotes: 'Balanced meal with protein noodles'},
      {id: 'd28', name: 'Spicy Wontons (6pc)', protein: 20, carbs: 38, fat: 12, calories: 340, fitScore: 'fits', fitNotes: 'Protein-rich dumpling option'},
      {id: 'd29', name: 'Vegetable Fried Rice', protein: 8, carbs: 58, fat: 14, calories: 400, fitScore: 'caution', fitNotes: 'High carb — save for post-run'},
      {id: 'd30', name: 'Red Bean Buns (2pc)', protein: 6, carbs: 48, fat: 8, calories: 280, fitScore: 'avoid', fitNotes: 'Dessert-level sugar content'},
    ],
  },
  {
    id: 'r7',
    name: 'Sweetgreen',
    cuisine: 'Salad Bar',
    city: 'Seattle',
    dishes: [
      {id: 'd31', name: 'Kale Caesar Bowl', protein: 18, carbs: 22, fat: 20, calories: 350, fitScore: 'fits', fitNotes: 'Protein from chicken, healthy fats'},
      {id: 'd32', name: 'Market Cobb Bowl', protein: 32, carbs: 18, fat: 26, calories: 430, fitScore: 'fits', fitNotes: 'High protein, moderate fat'},
      {id: 'd33', name: 'Buffalo Chicken Bowl', protein: 30, carbs: 20, fat: 18, calories: 380, fitScore: 'fits', fitNotes: 'Spicy protein option'},
      {id: 'd34', name: 'Guacamole Greens Bowl', protein: 12, carbs: 32, fat: 24, calories: 420, fitScore: 'caution', fitNotes: 'High fat from avocado'},
      {id: 'd35', name: 'Harvest Bowl', protein: 14, carbs: 45, fat: 16, calories: 380, fitScore: 'fits', fitNotes: 'Sweet potato carbs are great fuel'},
    ],
  },
  {
    id: 'r8',
    name: 'Shake Shack',
    cuisine: 'Burgers',
    city: 'Seattle',
    dishes: [
      {id: 'd36', name: 'Chicken Shack Burger', protein: 32, carbs: 30, fat: 18, calories: 440, fitScore: 'fits', fitNotes: 'Decent protein-to-carb ratio'},
      {id: 'd37', name: 'Classic Shake Shack', protein: 22, carbs: 32, fat: 22, calories: 430, fitScore: 'caution', fitNotes: 'High fat — not ideal pre-run'},
      {id: 'd38', name: 'Veggie Shack Burger', protein: 16, carbs: 38, fat: 14, calories: 350, fitScore: 'fits', fitNotes: 'Plant-based with good fiber'},
      {id: 'd39', name: 'Smokehouse Burger', protein: 30, carbs: 28, fat: 28, calories: 510, fitScore: 'caution', fitNotes: 'High calorie — double patty option'},
      {id: 'd40', name: 'Fries (large)', protein: 4, carbs: 52, fat: 16, calories: 360, fitScore: 'avoid', fitNotes: 'Empty carbs with high fat'},
    ],
  },
  {
    id: 'r9',
    name: 'Blue Bottle Coffee',
    cuisine: 'Coffee Shop',
    city: 'Seattle',
    dishes: [
      {id: 'd41', name: 'Avocado Toast', protein: 8, carbs: 32, fat: 14, calories: 290, fitScore: 'fits', fitNotes: 'Good pre-run light meal'},
      {id: 'd42', name: 'Steel Cut Oatmeal', protein: 10, carbs: 42, fat: 8, calories: 290, fitScore: 'fits', fitNotes: 'Slow-release carbs, sustained energy'},
      {id: 'd43', name: 'Breakfast Sandwich', protein: 18, carbs: 28, fat: 16, calories: 360, fitScore: 'fits', fitNotes: 'Balanced on-the-go breakfast'},
      {id: 'd44', name: 'Matcha Latte', protein: 4, carbs: 28, fat: 8, calories: 200, fitScore: 'caution', fitNotes: 'Sugar added if sweetened'},
      {id: 'd45', name: 'Croissant', protein: 6, carbs: 32, fat: 18, calories: 340, fitScore: 'avoid', fitNotes: 'High fat, low protein'},
    ],
  },
  {
    id: 'r10',
    name: 'Pasta Market',
    cuisine: 'Italian',
    city: 'Portland',
    dishes: [
      {id: 'd46', name: 'Spaghetti with Meatballs', protein: 28, carbs: 65, fat: 18, calories: 570, fitScore: 'fits', fitNotes: 'Classic recovery pasta'},
      {id: 'd47', name: 'Chicken Parmesan', protein: 38, carbs: 35, fat: 22, calories: 510, fitScore: 'fits', fitNotes: 'High protein Italian option'},
      {id: 'd48', name: 'Margherita Pizza', protein: 18, carbs: 48, fat: 16, calories: 420, fitScore: 'fits', fitNotes: 'Moderate macros, avoid pre-race'},
      {id: 'd49', name: 'Tiramisu', protein: 8, carbs: 38, fat: 22, calories: 400, fitScore: 'avoid', fitNotes: 'Dessert — save for cheat day'},
      {id: 'd50', name: 'Caprese Salad', protein: 14, carbs: 10, fat: 18, calories: 260, fitScore: 'fits', fitNotes: 'Light, fresh, high protein'},
    ],
  },
];

export const searchRestaurants = (query: string): Restaurant[] => {
  const lower = query.toLowerCase();
  return restaurants.filter(
    r =>
      r.name.toLowerCase().includes(lower) ||
      r.cuisine.toLowerCase().includes(lower) ||
      r.city.toLowerCase().includes(lower),
  );
};

export const getRestaurantById = (id: string): Restaurant | undefined =>
  restaurants.find(r => r.id === id);
