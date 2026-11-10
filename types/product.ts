export interface Product {
  id?: string;
  name: string;
  product: string;
  position: number; // 👈 1. Field Posisi Tambahan
  sortedProductsquantity: number;
  description: string;
  createdAt: string;
  modifiedAt: string;
  status: 'active' | 'inactive';
  category: 'digital' | 'pcs';
  tautan: string;
  photoUrl?: string;
}