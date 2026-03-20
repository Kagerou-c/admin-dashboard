"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/use-auth"
import { updateProfile } from "../server/server-update-profile"
import { Save, Check, Moon, Sun, Monitor } from "lucide-react"
import "../setting.css"

export default function SettingPage() {
    const { user } = useAuth()

    // Nama
    const [displayName, setDisplayName] = useState("")
    const [saving, setSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState(null)

    // Notifikasi
    const [notifEmail, setNotifEmail] = useState(true)
    const [notifPush, setNotifPush] = useState(true)
    const [notifReport, setNotifReport] = useState(false)

    // Tema
    const [theme, setTheme] = useState("light")

    // Load data saat pertama kali
    useEffect(() => {
        if (user) {
            setDisplayName(user.user_metadata?.display_name || "")
        }

        // Ambil pengaturan notifikasi dari penyimpanan
        const saved = localStorage.getItem("admin_notifications")
        if (saved) {
            try {
                const data = JSON.parse(saved)
                setNotifEmail(data.email ?? true)
                setNotifPush(data.push ?? true)
                setNotifReport(data.report ?? false)
            } catch { }
        }

        // Ambil tema dari penyimpanan
        const savedTheme = localStorage.getItem("admin_theme") || "light"
        setTheme(savedTheme)

    }, [user])

    // Terapkan tema ke halaman
    function applyTheme(t) {
        if (t === "system") {
            const gelap = window.matchMedia("(prefers-color-scheme: dark)").matches
            document.documentElement.setAttribute("data-theme", gelap ? "dark" : "light")
        } else {
            document.documentElement.setAttribute("data-theme", t)
        }
    }


    // Simpan nama
    async function handleSave(e) {
        e.preventDefault()
        setSaving(true)
        setSaveMessage(null)

        const result = await updateProfile(displayName)
        setSaveMessage(result)
        setSaving(false)

        if (result.success) {
            setTimeout(() => setSaveMessage(null), 3000)
        }
    }

    // Simpan notifikasi
    function saveNotif(email, push, report) {
        localStorage.setItem("admin_notifications", JSON.stringify({ email, push, report }))
    }

    // Pilih tema
    function pilihTema(t) {
        setTheme(t)
        localStorage.setItem("admin_theme", t)
        applyTheme(t)
    }

    return (
        <div className="setting-container">

            {/* Judul Halaman */}
            <div className="setting-header">
                <h1>⚙️ Pengaturan</h1>
                <p>Kelola akun dan tampilan dashboard Anda</p>
            </div>

            {/* ────────────────────────────────────
                BAGIAN 1: UBAH NAMA
            ──────────────────────────────────── */}
            <div className="setting-card">
                <h2>👤 Ubah Nama</h2>
                <p className="card-desc">Ganti nama yang ditampilkan di dashboard. Email tidak bisa diubah.</p>

                <form onSubmit={handleSave} className="profile-form">
                    <div className="form-group">
                        <label>Nama Anda</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Ketik nama Anda di sini"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email (tidak bisa diubah)</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="input-disabled"
                        />
                    </div>

                    {saveMessage && (
                        <div className={`save-message ${saveMessage.success ? "success" : "error"}`}>
                            {saveMessage.success && <Check size={16} />}
                            {saveMessage.message}
                        </div>
                    )}

                    <button type="submit" className="btn-save" disabled={saving}>
                        <Save size={16} />
                        {saving ? "Menyimpan..." : "Simpan Nama"}
                    </button>
                </form>
            </div>

            {/* ────────────────────────────────────
                BAGIAN 2: PILIH TEMA
            ──────────────────────────────────── */}
            <div className="setting-card">
                <h2>🎨 Pilih Tema</h2>
                <p className="card-desc">Ubah tampilan dashboard sesuai selera Anda.</p>

                <div className="theme-grid">
                    <button
                        className={`theme-card ${theme === "light" ? "selected" : ""}`}
                        onClick={() => pilihTema("light")}
                    >
                        <Sun size={28} />
                        <h3>Terang</h3>
                        <p>Tampilan putih cerah</p>
                        {theme === "light" && <div className="theme-check"><Check size={14} /></div>}
                    </button>

                    <button
                        className={`theme-card ${theme === "dark" ? "selected" : ""}`}
                        onClick={() => pilihTema("dark")}
                    >
                        <Moon size={28} />
                        <h3>Gelap</h3>
                        <p>Tampilan hitam gelap</p>
                        {theme === "dark" && <div className="theme-check"><Check size={14} /></div>}
                    </button>
                </div>
            </div>
        </div>
    )
}
