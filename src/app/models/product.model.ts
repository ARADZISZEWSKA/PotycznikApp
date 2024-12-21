export interface Product {
  id: number;
  name: string;
  categoryId: number;
  quantity: number;
  unit: string;
  barcode?: string;
  expiryDate?: string | null;
  imageUrl?: string;
  serialNumber?: string;
}
