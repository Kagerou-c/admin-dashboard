'use server';

import { createClient } from "../lib/protection";

export async function AmbilDataSiswa(inputUser, curentPage, itemPerPage) {
    const supabase = await createClient()

    const from = (curentPage - 1) * itemPerPage
    const to = curentPage * itemPerPage - 1

    let query = supabase.from('saldo_users').select('*', { count: 'exact' })

    if (inputUser) {
        query = query.ilike('nama', `%${inputUser}%`)
    }

    if (curentPage && itemPerPage) {
        query = query.range(from, to)
    }

    const { data, error, count } = await query.order('nama', { ascending: true })

    if (error) {
        console.error('Error fetching saldo siswa:', error)
        return { data: null, error: error.message, count: 0, totalSaldo: 0 }
    }

    // Query total saldo (with same search filter)

    const totalSaldo = error ? 0 : (data || []).reduce((acc, row) => acc + (row.saldo || 0), 0)

    return { data, count, totalSaldo}
}
