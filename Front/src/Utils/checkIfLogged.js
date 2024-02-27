import { getAuth } from "firebase/auth";

export default function checkIfLogged() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) console.log(true)
    else console.log(false);
}