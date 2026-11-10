"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUIReact = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerDoc({ spec }: { spec: any }) {
  return <SwaggerUIReact spec={spec} />;
}
