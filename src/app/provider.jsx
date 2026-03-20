import DashboardAuthContex from "./context/dashboard-auth";
import { redirect } from 'next/navigation';
import { createClient } from "./lib/protection";

export async function GetUser({ children }) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const { data: { session } } = await supabase.auth.getSession();
    console.log("Role:", user?.role);
    console.log("Token:", session?.access_token ? "✅ Ada" : "❌ Tidak ada");

    if (!user || error) {
        redirect('/');
    }



    return (
        <DashboardAuthContex initialUser={user}>
            {children}
        </DashboardAuthContex>
    )
}
