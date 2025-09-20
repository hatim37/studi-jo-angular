export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  quantity:number;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}


