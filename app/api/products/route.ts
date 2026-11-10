import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Mendapatkan daftar semua produk atau berdasarkan multiple ID
 *     description: Mengambil seluruh data produk atau produk tertentu jika parameter ids disertakan (dipisahkan koma)
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: false
 *         schema:
 *           type: string
 *         description: "Daftar ID produk dipisahkan koma (Contoh: id1,id2,id3)"
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar produk
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Menambahkan produk baru
 *     description: Menyimpan data produk baru ke Firebase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");

    if (idsParam) {
      const idsArray = idsParam.split(",").map((id) => id.trim()).filter(Boolean);

      if (idsArray.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const products: any[] = [];
      for (const id of idsArray) {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          products.push({ id: docSnap.id, ...docSnap.data() });
        }
      }

      return NextResponse.json(products, { status: 200 });
    }

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