import { NextResponse } from "next/server";

// Android App Link verification payload.
// sha256_cert_fingerprints will be filled with the EAS build cert SHA after
// Task 18. Until then Android intent autoVerify will fail — but the iOS path
// still works once apple-app-site-association is correct.
const payload = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "eu.welkomhome.app",
      sha256_cert_fingerprints: ["TODO_REPLACE_WITH_EAS_BUILD_CERT_SHA256"],
    },
  },
];

export async function GET() {
  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
