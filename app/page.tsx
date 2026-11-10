"use client";

import React, { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/types/product";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list: Product[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(list);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateOrUpdate = async (productData: Omit<Product, "id">) => {
    if (editingProduct?.id) {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, productData);
      setEditingProduct(null);
    } else {
      await addDoc(collection(db, "products"), productData);
    }
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Product Management CRUD</h1>
          <Link href="/api-docs" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Swagger API Docs
          </Link>
        </div>

        <ProductForm
          onSubmit={handleCreateOrUpdate}
          initialData={editingProduct}
          onCancel={editingProduct ? () => setEditingProduct(null) : undefined}
        />

        {loading ? (
          <div className="text-center py-8">Memuat data...</div>
        ) : (
          <ProductTable
            products={products}
            onEdit={(p) => setEditingProduct(p)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}
