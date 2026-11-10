import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js CRUD Firebase Cloudinary",
  description: "Aplikasi CRUD dengan Next.js, Firebase, Cloudinary, & Swagger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
