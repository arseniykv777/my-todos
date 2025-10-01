import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, push, set, get, query, remove} from "firebase/database";

export async function register(email, password) {
  try {
    const oUC = await createUserWithEmailAndPassword(getAuth(), email, password)
    return oUC.user;
  } catch (err) {
    return err.code
  }
}

export async function login(email, password) {
  try {
    const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
    return oUC.user 
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

export async function getList(user) {
  const oSnapshot = await get(query(ref(getDatabase(), `users/${user.uid}/todos`)));
  const oArr = new Array();
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