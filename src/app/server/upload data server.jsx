"use server"

import { createClient } from "../lib/protection"

export async function uploadData(file) {

    const supabase = await createClient()

    
            const {data, error} =supabase.from('data').insert(file)
            if (error) console.log(error)
            else console.log(data)
    
    
}

