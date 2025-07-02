import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from '@/app/firebase/config';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export interface ChatMessage {
  id?: string;
  text: string;
  sender: string;
  timestamp: Timestamp;
}

export const sendMessage = async (text: string, sender: string) => {
  await addDoc(collection(db, 'messages'), {
    text,
    sender,
    timestamp: Timestamp.now(),
  });
};

export const subscribeToMessages = (callback: (messages: ChatMessage[]) => void) => {
  const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatMessage[];
    callback(messages);
  });
};
