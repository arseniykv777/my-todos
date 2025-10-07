import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, push, set, get, query, remove} from "firebase/database";
import {redirect} from "react-router-dom";

import firebaseApp from "../firebase.jsx";

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

function getUserId() {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    return window.localStorage.getItem("user-id");
  }
}

export async function register({request}) {
  const fd = await request.formData();
  try {
    const oUC = await createUserWithEmailAndPassword(auth, fd.get('email'), fd.get('password'));
    window.localStorage.setItem("user-id", oUC.user.uid);
    return redirect('/');
  } catch (err) {
    return err.code
  }
}

export async function login({request}) {
  const fd = await request.formData();
  try {
    const oUC = await signInWithEmailAndPassword(auth, fd.get('email'), fd.get('password'));
    window.localStorage.setItem("user-id", oUC.user.uid);
    return redirect('/');
  } catch (err) {
    return err.code
  }
}

export async function logout() {
  await signOut(getAuth());
}

export async function add(user, deed) {
  const oRef = push(ref(getDatabase(), `users/${user.uid}/todos`));
  await set(oRef, deed);
  const oSnapShot = await get(query(oRef));
  const oDeed = oSnapShot.val();
  oDeed.key = oRef.key;

  return oDeed;
}

export async function getList() {
  const currentUserId = getUserId();
  console.log(currentUserId);
  if (!currentUserId) return null;
  const oSnapshot = await get(query(ref(database, `users/${currentUserId}/todos`)));
  const oArr = [];
  let oDeed;
  oSnapshot.forEach((oDoc) => {
    oDeed = oDoc.val();
    oDeed.key = oDoc.key;
    oArr.push(oDeed);
  })

  return oArr;
}

export async function setDone(user, key) {
  return set(ref(getDatabase(), `users/${user.uid}/todos/${key}/done`), true);
}

export async function del(user, key) {
  return remove(ref(getDatabase(), `users/${user.uid}/todos/${key}`));
}

export function setStateChangeHandler(func) {
  return onAuthStateChanged(auth, func);
}