import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux"

import { auth } from "../utils/firebase";
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
        const unsubscribe = auth.onAuthStateChanged(user => {
            // dispatch(authUser(user))
            if (user) {
                dispatch(authUser({
                    logged: true,
                    email: user.email,
                    displayName: user.displayName,
                    uid: user.uid,
                }))
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
