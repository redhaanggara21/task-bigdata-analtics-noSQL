import { getApiDocs } from "@/lib/swagger";
import SwaggerDoc from "@/components/SwaggerUI";

export default async function ApiDocsPage() {
  const spec = await getApiDocs();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dokumentasi API (Swagger UI)</h1>
      <SwaggerDoc spec={spec} />
    </div>
  );
}
