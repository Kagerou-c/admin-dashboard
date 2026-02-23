import DashboardAuthContex from "./contex/DashboardAuth";
import { redirect } from 'next/navigation';
import { createClient } from "./lib/protection";

export async function GetUser({ children }) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        redirect('/');
    }
    
 

    return (
        <DashboardAuthContex initialUser={user}>
            {children}
        </DashboardAuthContex>
    )
}
