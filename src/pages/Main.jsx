import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux"
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../utils/firebase";
import { authUser } from "../redux/actions/userActions";
import Home from "./Home";
import Login from "./Login";
import UsersList from "./UserView";


const Loader = () => {
    return (
        <div>
            <p>Loading contents...</p>
        </div>
    )
}

const Main = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!userDetails?.logged) setLoading(false)
        setTimeout(() => {
        }, 500)
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            // dispatch(authUser(user))
            if (user) {
                const idToken = await user.getIdToken()
                dispatch(authUser({
                    logged: true,
                    email: user.email,
                    displayName: user.displayName,
                    uid: user.uid,
                    idToken
                }))
                if (userDetails?.logged) return
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName || null,
                        photoURL: user.photoURL || null,
                        lastLogin: new Date(),
                        // Add any other user data you want to store
                    }, { merge: true }); // merge: true will only update provided fields

                    console.log("User data stored successfully");
                } catch (error) {
                    console.error("Error storing user data:", error);
                }

            }
            // dispatch(authUser({...multiFactor?.user, logged: true}))
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        })

        return () => {
            unsubscribe();

        }
    }, [dispatch])

    return (
        <Suspense fallback={Loader}>
            {userDetails?.logged ? <UsersList /> : <Login />}
        </Suspense>
    )
}

export default Main
