export interface Product {
  id?: string;
  name: string;
  product: string;
  quantity: number;
  description: string;
  createdAt: string;
  modifiedAt: string;
  status: 'active' | 'inactive';
  category: 'digital' | 'pcs';
  tautan: string;
  photoUrl?: string;
}
