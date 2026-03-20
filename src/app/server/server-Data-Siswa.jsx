import { createClient } from "../lib/protection";

export async function AmbilDataSiswa(inputUser) {
    const supabase = await createClient()

    let query = supabase.from('saldo_user').select('*')

    if (inputUser) {
        query = query.ilike('nama', `%${inputUser}%`)
    }

    const { data, error } = await query.order('nama', { ascending: true })

    if (error) {
        return error.message
    }

    return data
}