"use client";

import React from "react";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow mt-6">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Foto</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tautan</th>
            <th className="px-4 py-3">Created / Modified</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-6 text-gray-400">
                Belum ada data produk.
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {item.photoUrl ? (
                    <img src={item.photoUrl} alt={item.product} className="w-12 h-12 object-cover rounded-md border" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">No Image</div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3">{item.product}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${item.category === 'digital' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${item.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {item.tautan ? (
                    <a href={item.tautan} target="_blank" rel="noreferrer" className="text-blue-500 underline truncate max-w-[100px] inline-block">
                      Link
                    </a>
                  ) : "-"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  <div>C: {new Date(item.createdAt).toLocaleDateString()}</div>
                  <div>M: {new Date(item.modifiedAt).toLocaleDateString()}</div>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-2 py-1 bg-amber-500 text-white rounded text-xs hover:bg-amber-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => item.id && onDelete(item.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
