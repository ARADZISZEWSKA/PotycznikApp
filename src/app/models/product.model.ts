export interface Product {
  id?: number;
  name: string;
  categoryId: number;
  quantity: number;
  minimalQuantity: number;
  unit: string;
  barcode?: string;
  expiryDate?: Date | null;
  image?: string;
  serialNumber?: string;
  isDeleted?: boolean;
}

export interface NewProduct extends Omit<Product, 'id'> {}
