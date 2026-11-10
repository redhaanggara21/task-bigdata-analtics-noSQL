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
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Product);
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
      await updateDoc(productRef, {
        ...productData,
        modifiedAt: new Date().toISOString(),
      });
      setEditingProduct(null);
      alert("Produk berhasil diupdate!");
    } else {
      await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      });
      alert("Produk berhasil ditambahkan!");
    }
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
        alert("Produk berhasil dihapus!");
      } catch (error) {
        alert("Gagal menghapus produk");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-[1700px] mx-auto space-y-6">
        
        {/* Header Title & Swagger Button */}
        <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800">Product Management CRUD</h1>
          <Link href="/api-docs" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition">
            Swagger API Docs
          </Link>
        </div>

        {/* Main Content: Dipaksa Berjajar Kiri-Kanan Menggunakan Flexbox */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* SISI KIRI: Form Input (Lebar tetap / fixed width di layar besar agar rapi) */}
          <div className="w-full lg:w-[420px] shrink-0 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
              {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <ProductForm
              onSubmit={handleCreateOrUpdate}
              initialData={editingProduct}
              onCancel={editingProduct ? () => setEditingProduct(null) : undefined}
            />
          </div>

          {/* SISI KANAN: Tabel Data Produk (Mengisi sisa ruang ke samping) */}
          <div className="w-full lg:flex-1 bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
            <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Daftar Produk</h2>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Memuat data...</div>
            ) : (
              <ProductTable
                products={products}
                onEdit={(p) => {
                  setEditingProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDelete}
              />
            )}
          </div>

        </div>

      </div>
    </main>
  );
}