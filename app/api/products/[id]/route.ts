import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Mendapatkan detail produk berdasarkan ID
 *     description: Mengambil satu data produk spesifik dari Firestore berdasarkan ID unik
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unik produk
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan detail produk
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produk tidak ditemukan
 *   put:
 *     summary: Mengupdate produk berdasarkan ID
 *     description: Memperbarui data produk yang ada di Firestore berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unik produk
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produk berhasil diupdate
 *   delete:
 *     summary: Menghapus produk berdasarkan ID
 *     description: Menghapus dokumen produk dari Firestore berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unik produk
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 */

// 1. Endpoint GET by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const productRef = doc(db, "products", id);
    const docSnap = await getDoc(productRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil detail produk" }, { status: 500 });
  }
}

// 2. Endpoint PUT (Update)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const productRef = doc(db, "products", id);
    
    await updateDoc(productRef, {
      ...body,
      modifiedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Produk berhasil diupdate" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

// 3. Endpoint DELETE (Hapus)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);

    return NextResponse.json({ message: "Produk berhasil dihapus" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}