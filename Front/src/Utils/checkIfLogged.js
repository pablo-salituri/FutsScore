import { getAuth } from "firebase/auth";

export default async function checkIfLogged() {
    return new Promise((resolve)=> {
        const auth = getAuth();
        const user = auth.currentUser;
        // console.log(user);
        if (user) resolve(true)
        else resolve(false);
    })
}