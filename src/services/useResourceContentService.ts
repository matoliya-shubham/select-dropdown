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
// import { ref, update, getDatabase } from "firebase/database";
import { db } from "../firebaseConfig";
import { DBCollectionName } from "@/constants/label";

export const useResourceContentService = () => {
  const getSingleResourceContent = async (resourceContentId: string) => {
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
  };

  const getAllResourceContent = async () => {
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
  };

  const addResourceContent = async (resourceContent: AllResourcesLabelType) => {
    try {
      await addDoc(collection(db, DBCollectionName), {
        ...resourceContent,
      });
    } catch (error) {
      console.error("Error adding resource content:", error);
    }
  };

  const updateResourceContent = async (
    resourceContent: AllResourcesLabelType
  ) => {
    try {
      const docRef = doc(db, DBCollectionName, resourceContent.id || "");
      await updateDoc(docRef, resourceContent);
    } catch (error) {
      console.error("Error updating resource content:", error);
    }
  };

  const deleteResourceContent = async (id: string) => {
    try {
      const collectionRef = collection(db, DBCollectionName);

      // 1. Construct the query: Find documents where 'fieldName' equals 'fieldValue'
      const q = query(collectionRef, where("parentId", "==", id));

      try {
        // 2. Execute the query to get the matching documents
        const querySnapshot = await getDocs(q);

        // Check if any documents were found
        if (querySnapshot.empty) {
          console.info(`No documents found in ${DBCollectionName}`);
          return;
        }

        // 3. Prepare for deletion (especially good if multiple documents match)
        const batch = writeBatch(db);

        querySnapshot.forEach((documentSnapshot) => {
          batch.delete(documentSnapshot.ref);
        });

        // 4. Commit the batch deletion
        await batch.commit();
      } catch (error) {
        console.error("Error deleting resource content:", error);
      }
    } catch (error) {
      console.error("Error deleting resource content:", error);
    }
  };

  return {
    getAllResourceContent,
    addResourceContent,
    updateResourceContent,
    deleteResourceContent,
    getSingleResourceContent,
  };
};
