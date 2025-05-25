'use client'

import { useEffect } from "react";

export default function ApiDocs() {
  useEffect(() => {
    // Dynamically load Redoc standalone script
    const script = document.createElement("script");
    script.src = "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <redoc spec-url="/openapi.yaml"></redoc>
    </div>
  );
}
