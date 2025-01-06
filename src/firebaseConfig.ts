import { getFirestore, collection, updateDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";
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

export const fetchTasksFromFirebase = async (): Promise<Task[]> => {
  const tasksCollection = collection(db, "tasks");
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }));
};

export const addTaskToFirebase = async (task: Task): Promise<Task> => {
  const tasksCollection = collection(db, "tasks");
  const docRef = doc(tasksCollection);
  const taskWithId = { ...task, id: docRef.id };
  await setDoc(docRef, taskWithId);

  return taskWithId;
};

export const updateTaskInFirebase = async (task: Task): Promise<void> => {
  const taskDoc = doc(db, "tasks", task.id);
  await updateDoc(taskDoc, { ...task });
};

export const deleteTaskFromFirebase = async (taskId: string): Promise<void> => {
  const taskDoc = doc(db, "tasks", taskId);
  await deleteDoc(taskDoc);
};
