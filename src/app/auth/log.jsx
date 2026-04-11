'use client';
import { ServerLogin } from "../server/server-login";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingCircle from "../motion-component/loading-circle";
import { Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import "../login.css"

export default function Login() {
    // status: null | { type: 'loading' | 'error' | 'success', message: string }
    const [status, setStatus] = useState(null)

    async function handlerclick(e) {
        e.preventDefault()

        const emailUser = e.target.email.value
        const passwordUser = e.target.password.value

        setStatus({ type: 'loading', message: 'Sedang masuk...' })

        
            const result = await ServerLogin(emailUser, passwordUser)
            if (!result.success) {
                setStatus({ type: 'error', message: 'Email atau password salah' })
            }
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

                <form className="Login-From" onSubmit={handlerclick}>
                    <div>
                        <label className="login-label">Email</label>
                        <div className="login-input-group">
                            <Mail className="login-field-icon" size={18} />
                            <input name="email" type="email" placeholder="nama@email.com" />
                        </div>
                    </div>

                    <div>
                        <label className="login-label">Password</label>
                        <div className="login-input-group">
                            <Lock className="login-field-icon" size={18} />
                            <input name="password" type="password" placeholder="Masukkan password" />
                        </div>
                    </div>

                    {/* Status Message */}
                    <AnimatePresence mode="wait">
                        {status && (
                            <motion.div
                                key={status.type}
                                className={`login-status login-status--${status.type}`}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                            >
                                {status.type === 'loading' && (
                                    <LoadingCircle size={18} stroke={2.5} color="#3b82f6" />
                                )}
                                {status.type === 'error' && (
                                    <AlertCircle className="login-status-icon" size={18} strokeWidth={2.5} />
                                )}
                                {status.type === 'success' && (
                                    <CheckCircle2 className="login-status-icon" size={18} strokeWidth={2.5} />
                                )}
                                <span>{status.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        className="login-submit-btn"
                        type='submit'
                        disabled={status?.type === 'loading'}
                        whileHover={status?.type !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={status?.type !== 'loading' ? { scale: 0.98 } : {}}
                    >
                        {status?.type === 'loading' ? 'Memproses...' : 'Sign In'}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    )
}
