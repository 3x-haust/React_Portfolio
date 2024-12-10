
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const fireAuth = getAuth(firebaseConfig);
export default fireAuth;