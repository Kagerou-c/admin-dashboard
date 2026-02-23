'use server';
import { createClient } from "../lib/protection";
import { redirect } from 'next/navigation'


export async function ServerLogin(email, password) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        supabase.auth.signOut();
    }
    else{
        redirect('/Dashboard')
    }
}