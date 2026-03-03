"use server";
import { supabase } from "../lib/supabase-config";



export async function AmbilData(bulan) {


    let query = supabase.from('monthly_stats').select('*')

    if (bulan) {
        query = query.in('month', bulan)
    }

    const { data, error } = await query.order('month', { ascending: true })


    if (error) {
        console.error('Error call data:', error)
    }








    return data
}

