import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { adminDb } from "@/firebaseAdmin";

const PAYSTACK_API_KEY = process.env.PAYSTACK_API_KEY;

export async function POST(req: NextRequest) {


  try {
    const { email, amount, userId } = await req.json(); // Parsing the incoming JSON request body

    // Send request to Paystack to initialize the transaction
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        userId,
        email,
        amount, // Amount in kes
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    const user = await adminDb.collection("users").doc(userId).get();

    let payStackUserId = user.data()?.payStackUserId;

    if (!payStackUserId) {
      // Create a new customer if Paystack user ID doesn't exist
      const customerResponse = await axios.post(
        "https://api.paystack.co/customer",
        {
          email, // You can add more fields like first_name, last_name, etc.
          metadata: {
            userId, // Storing userId in metadata
          },
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Save the Paystack customer code (customer_code) in Firestore for future reference
      const customerCode = customerResponse.data.data.customer_code;

      await adminDb.collection("users").doc(userId).set(
        {
          payStackUserId: customerCode, // Save customer_code as the payStackUserId
          hasActiveMembership: true
        },
        { merge: true } // Use merge to avoid overwriting existing fields
      );

      payStackUserId = customerCode;
    }

    // Create the payment session using the Paystack customer code
    const sessionResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        customer: payStackUserId, // Use the Paystack user ID to link the customer
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Respond with the Paystack transaction initialization data, which includes the reference
    return NextResponse.json(sessionResponse.data.data);
  } catch (error) {
    console.error("Error initializing transaction:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
