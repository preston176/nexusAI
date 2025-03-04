"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

// File limits
const PRO_LIMIT = 20;
const FREE_LIMIT = 5;

function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState<boolean | null>(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);

  const { user } = useUser();
  const userDocRef = user?.id ? doc(db, "users", user.id) : null;

  // Track if subscription update has already been performed
  const hasUpdatedSubscription = useRef(false);

  const [snapshot, loading, error] = useDocument(userDocRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [filesSnapshot, filesLoading] = useCollection(
    user?.id ? collection(db, "users", user.id, "files") : null
  );

  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data();
    if (!data) return;

    setHasActiveMembership(data.hasActiveMembership);

    if (data.subscriptionStart && user?.id) {
      const [day, month, year] = data.subscriptionStart.split("/").map(Number);
      const subscriptionDate = new Date(year, month - 1, day);
      const currentDate = new Date();

      const differenceInDays = Math.floor(
        (currentDate.getTime() - subscriptionDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays > 30 && data.hasActiveMembership && !hasUpdatedSubscription.current) {
        console.log("Subscription expired, updating Firestore...");

        updateDoc(doc(db, "users", user.id), {
          hasActiveMembership: false,
        })
          .then(() => {
            setHasActiveMembership(false);
            hasUpdatedSubscription.current = true; // Prevent redundant updates
          })
          .catch((error) => console.error("Error updating subscription:", error));
      }
    }
  }, [snapshot, user?.id]);

  useEffect(() => {
    if (!filesSnapshot || hasActiveMembership === null) return;

    const files = filesSnapshot.docs;
    const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

    console.log(`Checking file limit: ${files.length}/${usersLimit}`);
    setIsOverFileLimit(files.length >= usersLimit);
  }, [filesSnapshot, hasActiveMembership]);

  return { hasActiveMembership, loading, error, isOverFileLimit, filesLoading };
}

export default useSubscription;
