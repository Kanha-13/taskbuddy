import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Task } from "./features/tasks/taskSlice"; // Import Task interface
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Initialize Firebase (replace with your Firebase config)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Fetch all tasks
export const fetchTasksFromFirebase = async (): Promise<Task[]> => {
  const tasksCollection = collection(db, "tasks");
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }));
};

// Add a new task
export const addTaskToFirebase = async (task: Task): Promise<Task> => {
  const tasksCollection = collection(db, "tasks");
  const docRef = doc(tasksCollection);
  const taskWithId = { ...task, id: docRef.id };
  console.log("this is going to db --------------")
  console.log(docRef.id)
  console.log(taskWithId)
  await setDoc(docRef, taskWithId);

  return taskWithId;
};

// Update an existing task
export const updateTaskInFirebase = async (task: Task): Promise<void> => {
  const taskDoc = doc(db, "tasks", task.id);
  await updateDoc(taskDoc, { ...task });
};

// Delete a task
export const deleteTaskFromFirebase = async (taskId: string): Promise<void> => {
  const taskDoc = doc(db, "tasks", taskId);
  await deleteDoc(taskDoc);
};
