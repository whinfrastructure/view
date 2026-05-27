import { NextResponse } from "next/server";

// Universal Link verification payload.
// Replace TEAMID with the Apple Developer team ID (Team ID column in
// https://developer.apple.com/account/#/membership) once provisioned.
// Bundle ID = eu.welkomhome.app per mobile/app.json.
const payload = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "TEAMID.eu.welkomhome.app",
        paths: ["/m/*"],
      },
    ],
  },
};

export async function GET() {
  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
