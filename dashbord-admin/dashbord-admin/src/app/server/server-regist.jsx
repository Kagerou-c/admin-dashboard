'use server'
import { createClient } from '../lib/protection';
import { redirect } from 'next/navigation'

export async function ServerRegist(email, password, namaUser) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: namaUser
            }
        }
    })

    if (error) {
        supabase.auth.signOut();
    }
    else {
        redirect('/Dashboard')
    }
}