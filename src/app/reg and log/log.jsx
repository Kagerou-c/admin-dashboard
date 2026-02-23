'use client';
import { ServerLogin } from "../server/server Login";
import { motion } from "framer-motion";

import { useEffect } from "react";
import { supabase } from "../lib/supabase config";
import "../login.css"

export default function Login({ setIsLogin }) {

    async function handlerLog(e) {
        e.preventDefault()

        const emailUser = e.target.email.value
        const passwordUser = e.target.password.value

        ServerLogin(emailUser, passwordUser)
    }

    // function generate(){
    //     let hasil = []

    //     for(let i = 1; i <=30 ; i++){
    //         const mathPenghasilan = Math.floor(Math.random()*600000)+100000
    //         const mathUser = Math.floor(Math.random()*200)+76
    //         const mathBuku = Math.floor(Math.random()*100)+30
    //         hasil.push( {penghasilan : mathPenghasilan, UserBerkunjung : mathUser, BukuDiPinjam : mathBuku} )
    //     }
    //     return hasil
    // }



    useEffect(() => {

        // const arr = generate()



        // async function query(item) {


        //     const { data, error } = await supabase
        //         .from('Data Perbulan')
        //         .insert([item])
        //     if (error) {
        //         console.error('Error inserting data:', error)
        //     } else {
        //         console.log('Data inserted:', data)
        //     }
        // }

        //   arr.map((item, i)=>{

        //     console.log(i)
        //     query(item)})

    }, [])

    return (

        <motion.div
            className="Login-Component"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="Login-wrap"
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
                        className="tab active"
                        onClick={() => setIsLogin(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </motion.button>
                    <motion.button
                        className="tab"
                        onClick={() => setIsLogin(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Register
                    </motion.button>
                </div>
                <form className="Login-From" onSubmit={handlerLog}>
                    <span>email</span>
                    <input name="email" type="email" placeholder="isi email"  ></input>
                    <span>password</span>
                    <input name="password" type="password" placeholder="isi password" />
                    <motion.button
                        type='submit'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >sumbit</motion.button>
                </form>

            </motion.div>
        </motion.div>
    )
}
