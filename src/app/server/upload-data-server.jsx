"use server"

import { supabase } from "../lib/supabase-config"

export async function uploadData(file) {
    const { data, error } = await supabase.from('data').insert(file)
    if (error) {

        return { success: false, error: error.message }
    }

    return { success: true, data }
}

