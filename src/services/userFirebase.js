import {
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';

const userRef = collection(db, 'users');

function findUser(email) {
  const q = query(userRef, where('email', '==', email));
  return getDocs(q);
}

async function getUser(id) {
  const docRef = doc(db, 'users', id);
  const user = await getDoc(docRef);
  return user;
}

function createUser(email, name) {
  return addDoc(userRef, {
    email,
    name,
  });
}

function updateUser(id, update) {
  const userDoc = doc(db, 'users', id);
  return updateDoc(userDoc, update);
}

export { getUser, findUser, createUser, updateUser };
