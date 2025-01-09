import { getFirestore, collection, updateDoc, doc, deleteDoc, getDocs, setDoc, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Task } from "./features/tasks/taskSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export const storage = getStorage(app);

export const loginFirebase = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("taskBuddyuser", JSON.stringify(result.user))
    return result.user;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("taskBuddyuser")
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export const fetchTasksFromFirebase = async (uid: string): Promise<Task[]> => {
  if (!uid) throw new Error("User not authenticated");
  const tasksCollection = collection(db, "tasks");
  const q = query(tasksCollection, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Task);
};

export const addTaskToFirebase = async (task: Task, uid: string): Promise<Task> => {
  if (!uid) throw new Error("User not authenticated");
  const tasksCollection = collection(db, "tasks");
  const docRef = doc(tasksCollection);
  const taskWithUserId = { ...task, id: docRef.id, userId: uid };
  await setDoc(docRef, taskWithUserId);
  return taskWithUserId;
};

export const updateTaskInFirebase = async (task: Task): Promise<void> => {
  const taskDoc = doc(db, "tasks", task.id);
  await updateDoc(taskDoc, { ...task });
};

export const deleteTaskFromFirebase = async (taskId: string): Promise<void> => {
  const taskDoc = doc(db, "tasks", taskId);
  await deleteDoc(taskDoc);
};
