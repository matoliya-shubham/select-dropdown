import type { AllResourcesLabelType } from "@/types/DropdownContentType";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  writeBatch,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { DBCollectionName } from "@/constants/label";

export async function getSingleResourceContentService(
  resourceContentId: string
) {
  try {
    const docRef = doc(db, DBCollectionName, resourceContentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as AllResourcesLabelType;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching resource content:", error);
    return null;
  }
}

export async function getAllResourceContentService() {
  try {
    const querySnapshot = await getDocs(collection(db, DBCollectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AllResourcesLabelType[];
  } catch (error) {
    console.error("Error fetching resource content:", error);
    return [];
  }
}

export async function addResourceContentService(
  resourceContent: AllResourcesLabelType
) {
  try {
    await addDoc(collection(db, DBCollectionName), {
      ...resourceContent,
    });
  } catch (error) {
    console.error("Error adding resource content:", error);
  }
}

export async function updateResourceContentService(
  resourceContent: AllResourcesLabelType
) {
  try {
    const docRef = doc(db, DBCollectionName, resourceContent.id || "");
    await updateDoc(docRef, resourceContent);
  } catch (error) {
    console.error("Error updating resource content:", error);
  }
}

export async function deleteResourceContentService(id: string) {
  try {
    const collectionRef = collection(db, DBCollectionName);
    const q = query(collectionRef, where("parentId", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.info(`No documents found in ${DBCollectionName}`);
        return;
      }
      const batch = writeBatch(db);
      querySnapshot.forEach((documentSnapshot) => {
        batch.delete(documentSnapshot.ref);
      });
      await batch.commit();
    } catch (error) {
      console.error("Error deleting resource content:", error);
    }
  } catch (error) {
    console.error("Error deleting resource content:", error);
  }
}
