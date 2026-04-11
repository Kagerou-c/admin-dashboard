'use client';
import { ServerLogin } from "../server/server-login";
import { motion } from "framer-motion";
import "../login.css"

export default function Login({ setIsLogin }) {

    async function handlerLog(e) {
        e.preventDefault()

        const emailUser = e.target.email.value
        const passwordUser = e.target.password.value

        ServerLogin(emailUser, passwordUser)
    }

    return (
        <motion.div
            className="Login-Component"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="Login-wrap"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Brand Icon */}
                <div className="login-icon">
                    <img src="/bank-mini.png" alt="logo" />
                </div>

                <h1>Admin Dashboard</h1>
                <p>Masuk ke akun administrator Anda</p>

                <form className="Login-From" onSubmit={handlerLog}>
                    <div>
                        <label className="login-label">Email</label>
                        <div className="login-input-group">
                            <svg className="login-field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                <path d="M22 4L12 13 2 4"/>
                            </svg>
                            <input name="email" type="email" placeholder="nama@email.com" />
                        </div>
                    </div>

                    <div>
                        <label className="login-label">Password</label>
                        <div className="login-input-group">
                            <svg className="login-field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0110 0v4"/>
                            </svg>
                            <input name="password" type="password" placeholder="Masukkan password" />
                        </div>
                    </div>

                    <motion.button
                        className="login-submit-btn"
                        type='submit'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Sign In
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    )
}
