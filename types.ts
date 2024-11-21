export type MenuItem = {
  dishName: string;
  description: string;
  course: string;
  price: number;
};

export type RootStackParamList = {
  Home: { newItem?: MenuItem; filter?: string }; // Optional newItem and filter for Home screen
  AddMenu: undefined;  // No params required for AddMenu screen
  Filter: { 
    menuItems: MenuItem[]; // Pass an array of MenuItem objects for Filter screen
  };
};

