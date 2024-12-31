export interface Product {
  id?: number;
  name: string;
  categoryId: number;
  quantity: number;
  unit: string;
  barcode?: string;
  expiryDate?: Date | null;
  image?: string;
  serialNumber?: string;
}

export interface NewProduct extends Omit<Product, 'id'> {}
