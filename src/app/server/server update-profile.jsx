"use server"

import { createClient } from "../lib/protection"

export async function updateProfile(displayName) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
    })

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: "Nama berhasil diperbarui" }
}
