export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  img_pri: string;
  stock: number;
}

export class Order {
  email: string;
  name: string;
  lastname: string;
  phone: number;
  shipment: Shippment;
  items: any;
  total: number;
}

export class Shippment {
  client_reference: string;
  zipcode: number;
  state: string;
  city: string;
  suburb: string;
  street: string;
  num_ext: string;
  num_int: string
}
