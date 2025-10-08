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
  await signOut(auth);
  window.localStorage.removeItem("user-id");
  return redirect('/login');
}

export async function add({request}) {
  const currentUserId = getUserId();
  const fd = await request.formData();
  const newDeed = {
    title: fd.get('title'),
    desc: fd.get('desc'),
    image: fd.get('image'),
    createdAt: fd.get('createdAt'),
    important: {
      index: Number(fd.get('index')),
      text: fd.get('text'),
    }
  }

  const oRef = push(ref(database, `users/${currentUserId}/todos`));
  newDeed.key = oRef.key;
  await set(oRef, newDeed);

  return redirect('/');
}

export async function getList() {
  const currentUserId = getUserId();
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

export async function getTodo({params}) {
  const currentUserId = getUserId();
  const oSnapshot = await get(query(ref(database, `users/${currentUserId}/todos/${params.key}`)));
  return oSnapshot.val();
}

export async function actTodo({params, request}) {
  const currentUserId = getUserId();

  if (request.method === 'PATCH') {
    const oRef = ref(database, `users/${currentUserId}/todos/${params.key}/done`);
    await set(oRef, true);
  } else if (request.method === 'DELETE') {
    const oRef = ref(database, `users/${currentUserId}/todos/${params.key}`);
    await remove(oRef);
  }

}

export function setStateChangeHandler(func) {
  return onAuthStateChanged(auth, func);
}