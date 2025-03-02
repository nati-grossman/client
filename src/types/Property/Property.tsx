export interface Property {
    id: number;
    title: string;
    city: string;
    price: string;
    location: string;
    image: string;
    description: string;
  }
  

  
  export interface PropertyListProps {
    category: "for-sale" | "for-rent" | "shabbat";
  }
  