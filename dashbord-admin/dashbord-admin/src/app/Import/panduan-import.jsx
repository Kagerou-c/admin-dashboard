'use client'

import card from "../components/card";
import { motion } from "framer-motion";

const { Card, CardContent, CardHeder } = card

export default function PanduanImport() {
    const panduan = [
        { id: 1, titel: 'Siapkan file CSV', desc: 'Pastikan file yang diimpor berformat .CSV.' },
        { id: 2, titel: 'Masukkan file CSV', desc: 'Klik "Pilih File" dan pilih file CSV yang ingin diimpor.' },
        { id: 3, titel: 'Preview Data', desc: 'Pastikan data yang diimpor sudah benar dan sesuai dengan format yang telah ditentukan.' },
        { id: 4, titel: 'Import Data', desc: 'Klik "Import" dan tunggu hingga proses selesai.' },
    ]


    const variant = (sumbu, nilai, delay) => {
        return {
            hiden: {
                opacity: 0,
                [sumbu]: nilai
            },
            show: {
                opacity: 1,
                [sumbu]: 0,
                transition: {
                    duration: 0.5,
                    delay: delay
                }
            }
        }
    }
    return (

        <div className="panduan-import">
            {panduan.map((item) => (
                <motion.div
                    key={item.id}
                    variants={variant('y', 20, item.id * 0.1)}
                    initial="hiden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <Card className="panduan-import-item">
                        <CardHeder Name="panduan-import-item-header" Title={`${item.id}. ${item.titel}`} />
                        <CardContent Name="panduan-import-item-desc">
                            <p>{item.desc}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}