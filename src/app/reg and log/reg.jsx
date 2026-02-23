'use client';
import { ServerRegist } from "../server/server Regist";
import { motion } from "framer-motion";
import "../regist.css"

export default function Register({ setIsLogin }) {

    async function handlerReg(e) {
        e.preventDefault()
        const namaUser = e.target.name.value
        const emailUser = e.target.email.value
        const passwordUser = e.target.password.value

        ServerRegist(emailUser, passwordUser, namaUser)
    }

    return (
        <motion.div
            className="Regist-Component"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="Regist-wrap"
                style={{ width: '500px' }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Admin Dashboard</h1>
                <p>Sign in to your account or create a new one</p>
                <div className="tab-container">
                    <motion.button
                        className="tab"
                        onClick={() => setIsLogin(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </motion.button>
                    <motion.button
                        className="tab active"
                        onClick={() => setIsLogin(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Register
                    </motion.button>
                </div>
                <form className="Regist-From" onSubmit={handlerReg}>
                    <span>Full name</span>
                    <input name="name" type="text" placeholder="isi nama"></input>
                    <span>email</span>
                    <input name="email" type="email" placeholder="isi email"  ></input>
                    <span>password</span>
                    <input name="password" type="password" placeholder="isi password" />
                    <motion.button
                        type='submit'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Register</motion.button>
                </form>
            </motion.div>
        </motion.div>
    )
}
