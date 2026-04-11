"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '../Hooks/use-auth'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const { user, isLogin, logout } = useAuth()
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const displayName = user?.user_metadata?.display_name

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    const navItem = (href, label) => (
        <Link className='Link' href={href} onClick={() => setMenuOpen(false)}>
            <button className={pathname === href ? 'active' : 'normal'}>
                {label}
            </button>
        </Link>
    )

    // ── Mobile Top Nav ──
    if (isMobile) {
        return (
            <>
                <header className="mobile-topbar">
                    <h1 className="mobile-title">Admin Dashboard</h1>
                    <button
                        className="hamburger-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </button>
                </header>

                <AnimatePresence>
                    {menuOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                className="mobile-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setMenuOpen(false)}
                            />

                            {/* Dropdown Menu */}
                            <motion.div
                                className="mobile-menu"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                {isLogin ? (
                                    <div className="mobile-menu-inner">
                                        <div className="mobile-greeting">
                                            Halo, {displayName}
                                        </div>
                                        <div className="mobile-nav-links">
                                            {navItem('/Dashboard', 'Dashboard')}
                                            {navItem('/Reports', 'Reports')}
                                            {navItem('/Import', 'Import Data')}
                                            {navItem('/Daftar-Transaksi', 'Daftar Transaksi')}
                                            {navItem('/Saldo-Siswa', 'Saldo Siswa')}
                                            {navItem('/Setting', 'Setting')}
                                        </div>
                                        <button className="mobile-logout" onClick={logout}>
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <span>Belum login</span>
                                )}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </>
        )
    }

    // ── Desktop Sidebar Nav ──
    return (
        <nav>
            {isLogin && (
                <>
                    <div className='Tittle'>
                        <h1>Admin Dashboard</h1>
                    </div>

                    <div className='Navigasi'>
                        {navItem('/Dashboard', 'Dashboard')}
                        {navItem('/Reports', 'Reports')}
                        {navItem('/Import', 'Import Data')}
                        {navItem('/Daftar-Transaksi', 'Daftar Transaksi')}
                        {navItem('/Saldo-Siswa', 'Saldo Siswa')}
                        {navItem('/Setting', 'Setting')}

                        <span>Halo, {displayName}</span>
                        <button className="normal" onClick={logout}>Logout</button>
                    </div>
                </>
            )}
        </nav>
    )
}
