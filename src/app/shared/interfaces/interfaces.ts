export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  img_pri: string;
  stock: number;
}

export class Order {
  public email: string;
  public name: string;
  public lastname: string;
  public phone: number;
  public client_reference: string;
  public zipcode: number;
  public state: string;
  public city: string;
  public suburb: string;
  public street: string;
  public num_ext: number;
  public num_int?: number;
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
