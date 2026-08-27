import { NextRequest, NextResponse } from "next/server";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// ============================================================================
// CONTACT API ROUTE
// ----------------------------------------------------------------------------
// Writes contact-form submissions to the Firestore "messages" collection
// using the Firebase Admin SDK (server-side, bypasses Firestore Security
// Rules — keep these credentials secret, never NEXT_PUBLIC_*).
//
// Setup:
// 1. Firebase Console > Project Settings > Service Accounts > Generate new
//    private key. This downloads a JSON file.
// 2. Add these three values from that JSON to `.env.local` (NOT committed):
//      FIREBASE_PROJECT_ID=
//      FIREBASE_CLIENT_EMAIL=
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
//    (Keep the literal \n sequences in the private key — they're unescaped below.)
// ============================================================================

function getAdminApp(): App | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null; // Not configured yet — handled gracefully below.
  }

  return getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    // --- Basic server-side validation ---
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !message.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message." },
        { status: 400 }
      );
    }

    const app = getAdminApp();
    if (!app) {
      // Firebase Admin isn't configured yet (missing env vars). Return a
      // clear error instead of a silent failure so it's obvious in dev.
      return NextResponse.json(
        {
          error:
            "Contact form isn't connected to Firebase yet. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local.",
        },
        { status: 503 }
      );
    }

    const db = getFirestore(app);
    await db.collection("messages").add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}
