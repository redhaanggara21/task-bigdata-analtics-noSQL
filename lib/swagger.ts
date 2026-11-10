import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next.js Product CRUD API",
        version: "1.0.0",
        description: "Dokumentasi API CRUD Produk terintegrasi Firebase dan Cloudinary",
      },
      components: {
        schemas: {
          Product: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              product: { type: "string" },
              quantity: { type: "integer" },
              description: { type: "string" },
              createdAt: { type: "string" },
              modifiedAt: { type: "string" },
              status: { type: "string", enum: ["active", "inactive"] },
              category: { type: "string", enum: ["digital", "pcs"] },
              tautan: { type: "string" },
              photoUrl: { type: "string" },
            },
          },
        },
      },
    },
  });
  return spec;
};
