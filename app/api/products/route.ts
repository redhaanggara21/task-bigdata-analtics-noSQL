import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Mendapatkan daftar semua produk
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan produk
 *   post:
 *     summary: Menambahkan produk baru
 *     responses:
 *       201:
 *         description: Produk berhasil dibuat
 */
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const docRef = await addDoc(collection(db, "products"), {
      ...body,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambahkan data" }, { status: 500 });
  }
}
