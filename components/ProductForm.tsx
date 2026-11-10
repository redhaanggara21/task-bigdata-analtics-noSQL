"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => Promise<void>;
  initialData?: Product | null;
  onCancel?: () => void;
}

export default function ProductForm({ onSubmit, initialData, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [product, setProduct] = useState(initialData?.product || "");
  const [position, setPosition] = useState<number>(initialData?.position || 1); // 👈 1. State Posisi
  const [quantity, setQuantity] = useState(initialData?.quantity || 1);
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<'active' | 'inactive'>(initialData?.status || "active");
  const [category, setCategory] = useState<'digital' | 'pcs'>(initialData?.category || "pcs");
  const [tautan, setTautan] = useState(initialData?.tautan || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = initialData?.photoUrl || "";
      if (imageFile) {
        photoUrl = await uploadToCloudinary(imageFile);
      }

      const now = new Date().toISOString();
      await onSubmit({
        name,
        product,
        position: Number(position),
        quantity: Number(quantity),
        description,
        createdAt: initialData?.createdAt || now,
        modifiedAt: now,
        status,
        category,
        tautan,
        photoUrl,
      });

      if (!initialData) {
        setName("");
        setProduct("");
        setPosition(1);
        setQuantity(1);
        setDescription("");
        setTautan("");
        setImageFile(null);
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 text-gray-800">
      <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Produk" : "Tambah Produk Baru"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nama Pembuat/User</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Nama Produk</label>
          <input
            type="text"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: E-Book Next.js"
          />
        </div>

        {/* 1. Input Kolom Posisi */}
        <div>
          <label className="block text-sm font-semibold mb-1">Posisi / Urutan</label>
          <input
            type="number"
            min="1"
            required
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            required
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'digital' | 'pcs')}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="pcs">Pcs (Fisik)</option>
            <option value="digital">Digital</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-semibold mb-1">Tautan (URL)</label>
          <input
            type="url"
            value={tautan}
            onChange={(e) => setTautan(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Penjelasan detail produk..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Upload Photo (Cloudinary)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded bg-gray-50"
        />
        <p className="text-xs text-gray-400 mt-1">*Jika dikosongkan, gambar default SVG akan digunakan.</p>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : initialData ? "Update" : "Simpan Produk"}
        </button>
      </div>
    </form>
  );
}