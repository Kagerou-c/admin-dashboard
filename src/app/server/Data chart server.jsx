"use server";
import { supabase } from "../lib/supabase config";
import { dalyData } from "../process/processChartData";

export async function RawData() {
    const { data, error } = await supabase
        .from('monthly_user_stats')
        .select('*')
        

        const newData = dalyData(data)
        console.log(data)

    return newData

}