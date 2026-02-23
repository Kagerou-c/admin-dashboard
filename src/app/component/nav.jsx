"use client"

import { useAuth } from '../contex/useAuth'
import { ChartLine } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const { user, isLogin, logout } = useAuth()
    const pathname = usePathname()

    const displayName = user?.user_metadata?.display_name

    const navItem = (href, label) => (
        <Link className='Link' href={href}>
            <button className={pathname === href ? 'active' : 'normal'}>
                {label}
            </button>
        </Link>
    )

    return (
        <nav>
            {isLogin ? (
                <>
                    <div className='Tittle'>
                        <h1>Admin Dashboard</h1>

                    </div>

                    <div className='Navigasi'>
                        {navItem('/Dashboard', 'Dashboard')}
                        {navItem('/Setting', 'Setting')}
                        {navItem('/Reports', 'Reports')}
                        {navItem('/Import', 'Import Data')}

                        <span>Halo, {displayName}</span>
                        <button className="normal" onClick={logout}>Logout</button>
                    </div>
                </>
            ) : (
                <span>Belum login</span>
            )}
        </nav>
    )
}
