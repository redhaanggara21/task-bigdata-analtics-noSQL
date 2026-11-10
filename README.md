# Next.js 14 CRUD Application with Firebase, Cloudinary, and Swagger

Aplikasi Fullstack Next.js (App Router) untuk manajemen data produk (CRUD) yang dilengkapi dengan upload gambar ke Cloudinary, penyimpanan database ke Firebase Firestore, integrasi Swagger UI, serta pengujian komprehensif.

---

## 📌 Fitur Utama

- **CRUD Complete**: Tambah, Baca, Edit, dan Hapus data produk.
- **Skema Field Lengkap**:
  - `name`: Nama pembuat / user
  - `product`: Nama produk
  - `quantity`: Jumlah produk (integer)
  - `description`: Deskripsi detail
  - `createdAt`: Tanggal pembuatan (ISO string)
  - `modifiedAt`: Tanggal perubahan (ISO string)
  - `status`: State status (`active` / `inactive`)
  - `category`: Kategori produk (`digital` / `pcs`)
  - `tautan`: Link / URL produk
  - `photoUrl`: URL Gambar publik dari Cloudinary
- **Cloud Storage**: Upload media foto langsung ke **Cloudinary**.
- **Database**: Database NoSQL real-time menggunakan **Firebase Firestore**.
- **Security & Config**: Pemisahan kredensial lingkungan menggunakan `.env.local`.
- **API Documentation**: Integrasi **Swagger UI** interaktif pada rute `/api-docs`.
- **Testing Coverage**:
  - **Unit Testing**: Jest & React Testing Library
  - **Integration Testing**: Jest API simulation
  - **Acceptance Testing**: Cypress E2E user flow
  - **System Testing**: Cypress Full System Verification

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Media Upload**: Cloudinary API
- **API Docs**: Swagger UI (`next-swagger-doc` & `swagger-ui-react`)
- **Testing**: Jest, React Testing Library, Cypress

---

## 🚀 Panduan Setup & Instalasi

### 1. Extract & Masuk ke Direktori
```bash
unzip nextjs-crud-firebase-cloudinary.zip
cd nextjs-crud-firebase-cloudinary
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env.local`)
Buat file `.env.local` di root project (atau sesuaikan dari `.env.example`):

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## 💻 Menjalankan Aplikasi

### Mode Development
```bash
npm run dev
```
Buka `http://localhost:3000` di browser Anda.

### Akses Swagger API Docs
Navigasi ke: `http://localhost:3000/api-docs`

---

## 🧪 Jalankan Testing

### 1. Unit & Integration Testing (Jest)
```bash
npm run test
```
Untuk coverage report:
```bash
npm run test:coverage
```

### 2. Acceptance & System Testing (Cypress)
Pastikan server dev berjalan terlebih dahulu (`npm run dev`), kemudian jalankan:
```bash
npm run cypress:open
# Atau mode headless:
npm run cypress:run
```

---

## 📁 Struktur Folder Project

```
├── app/
│   ├── api/
│   │   ├── doc/route.ts        # Open API JSON Spec
│   │   └── products/route.ts   # Product API Endpoints
│   ├── api-docs/page.tsx       # Swagger UI Page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Main Dashboard UI
├── components/
│   ├── ProductForm.tsx         # Form Input Component
│   ├── ProductTable.tsx        # Data Table Component
│   └── SwaggerUI.tsx           # Swagger UI Client Component
├── lib/
│   ├── cloudinary.ts           # Cloudinary Upload Helper
│   ├── firebase.ts             # Firebase Initialization
│   └── swagger.ts              # Swagger Docs Configuration
├── types/
│   └── product.ts              # TypeScript Product Type Definitions
├── __tests__/                  # Unit & Integration Tests
│   ├── unit/
│   └── integration/
├── cypress/                    # Acceptance & System Tests
│   └── e2e/
├── .env.example                # Example Env Template
├── README.md                   # Complete Documentation
└── package.json
```
