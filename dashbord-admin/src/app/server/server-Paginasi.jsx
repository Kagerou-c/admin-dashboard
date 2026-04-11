"use server";
import { createClient } from "../lib/protection";



export async function Paginasi(curentPage, itemPerPage) {
    const supabase = await createClient()


    const from = (curentPage - 1) * itemPerPage
    const to = curentPage * itemPerPage - 1

    const { data, error, count } = await supabase
        .from('transaksi_normalize')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('tanggal', { ascending: true })

    if (error) {
        console.error('Error fetching paginated data:', error)
        return { data: null, error: error.message, count: 0 }
    }

    return { data, count }
}

