import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import admin from "firebase-admin";

// Initialize Firestore
const adminDb = admin.firestore();
const PAYSTACK_API_KEY = process.env.PAYSTACK_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { reference, userId } = await req.json();

    if (!reference || !userId) {
      return NextResponse.json(
        { message: "Missing reference or userId" },
        { status: 400 }
      );
    }

    // Verify transaction with Paystack
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const transaction = verifyResponse.data.data;

    if (transaction.status === "success") {
      // Save transaction details in Firestore
      await adminDb.collection("transactions").doc(reference).set({
        userId,
        amount: transaction.amount / 100, // Convert from kobo to KES
        email: transaction.customer.email,
        status: "success",
        createdAt: new Date(),
      });

      // Activate subscription
      await adminDb.collection("users").doc(userId).set(
        {
          hasActiveMembership: true,
        },
        { merge: true }
      );

      return NextResponse.json({ message: "Payment verified", success: true });
    }

    return NextResponse.json({ message: "Verification failed", success: false }, { status: 400 });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ message: "Server error", success: false }, { status: 500 });
  }
}
