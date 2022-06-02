import {
  doc,
  getDocs,
  setDoc,
  addDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../utils/firebase';

const userRef = collection(db, 'users');

function findUser(email) {
  const q = query(userRef, where('email', '==', email));
  return getDocs(q);
}

function createUser(email, name) {
  return addDoc(userRef, {
    email,
    name,
  });
}

function updateUser(id) {}

export { findUser, createUser, updateUser };
