"use server"

import { createClient } from "../lib/protection"

export async function uploadData(file) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('data').insert(file)
    if (error) {

        return { success: false, error: error.message }
    }

    return { success: true, data }
}

