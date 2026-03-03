'use server';
import { createClient } from "../lib/protection";
import { redirect } from 'next/navigation'

export async function ServerLogout() {
    const supabase = await createClient();

    // Clear Supabase session
    await supabase.auth.signOut();

    // Redirect ke login
    redirect('/');
}
