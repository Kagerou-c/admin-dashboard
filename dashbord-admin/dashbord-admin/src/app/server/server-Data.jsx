"use server";
import { createClient } from "../lib/protection";



export async function TestingAmbilData(bulan) {
    const supabase = await createClient()

    let query = supabase.from('monthly_reports').select('*')

    if (bulan) {
        query = query.in('bulan', bulan)
    }

    const { data, error } = await query.order('bulan', { ascending: true })


    if (error) {
        return error.message
    }

    return data
}
