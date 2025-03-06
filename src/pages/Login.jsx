import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../utils/firebase'
import { GoogleAuthProvider } from 'firebase/auth'

import Button from '../components/Button/Button'
import FormField from '../components/FormField'

import { authUser } from '../redux/actions/userActions'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [snackOpen, setSnackOpen] = useState(false)
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCloseSnack = () => setSnackOpen(prev => !prev)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = form
            const res = await auth.signInWithEmailAndPassword(email, password)
            dispatch(authUser({ logged: true, email: res.user.email }))
            navigate('/')
        } catch (error) {
            setMessage('Login error')
            setSnackOpen(true)
        }
        setForm({
            email: '',
            password: ''
        })
    }

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider)
        } catch (error) {
            setMessage(error)
        }

    }
    return (
        <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className='flex w-full text-white justify-between'>
                        <h1 className="text-xl underline font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>

                    </div>
                    {/* <p className='text-white bg-red-400 p-1 rounded-md'>ERROR HERE</p> */}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <FormField
                            labelName='Username or Email'
                            name='email'
                            type='text'
                            value={form.email}
                            handleChange={handleChange}
                            placeHolder='name@company.com'
                        />
                        <FormField
                            labelName='Password'
                            name='password'
                            type='password'
                            value={form.password}
                            handleChange={handleChange}
                            placeHolder='••••••••'
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-blue-500">Remember me</label>
                                </div>
                            </div>
                            <a href='/#' className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <Button type='submit' variant="primary w-full" text='Log in' />
                        {/* <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button> */}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                    <section>
                        {/* <button onClick={googleLogin} className='text-black'>Google</button> */}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Login
