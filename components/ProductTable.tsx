"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

type SortField = 'position' | 'name' | 'product' | 'quantity' | 'category' | 'status' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [sortField, setSortField] = useState<SortField>('position');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aVal = a[sortField] ?? '';
    let bVal = b[sortField] ?? '';

    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return sortOrder === 'asc' ? <span className="ml-1 text-blue-600">↑</span> : <span className="ml-1 text-blue-600">↓</span>;
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow mt-6">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('position')}>
                Posisi {renderSortIcon('position')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('name')}>
                Name {renderSortIcon('name')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('product')}>
                Product {renderSortIcon('product')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('quantity')}>
                Qty {renderSortIcon('quantity')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('category')}>
                Category {renderSortIcon('category')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('status')}>
                Status {renderSortIcon('status')}
              </th>
              <th className="px-4 py-3">Tautan</th>
              <th className="px-4 py-3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('createdAt')}>
                Created / Modified {renderSortIcon('createdAt')}
              </th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedProducts.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-400">
                  Belum ada data produk.
                </td>
              </tr>
            ) : (
              sortedProducts.map((item) => {
                const imgSrc = item.photoUrl && item.photoUrl.trim() !== "" 
                  ? item.photoUrl 
                  : "https://placehold.co/100x100?text=No+Image";

                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img
                        src={imgSrc}
                        alt={item.product}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Error";
                        }}
                        onClick={() => setSelectedImage(imgSrc)}
                        className="w-12 h-12 object-cover rounded-md border cursor-pointer hover:opacity-80 transition-opacity bg-gray-100"
                        style={{ width: "48px", height: "48px", objectFit: "cover", cursor: "pointer", borderRadius: "6px" }}
                        title="Klik untuk memperbesar gambar"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">#{item.position || 1}</td>
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL POPUP (Menggunakan Pure Inline CSS agar 100% muncul di tengah layar) */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Preview" 
              style={{
                maxWidth: '100%',
                maxHeight: '60vh',
                objectFit: 'contain',
                borderRadius: '8px',
                marginTop: '10px',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}