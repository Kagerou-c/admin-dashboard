'use client';
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingCircle({
    size = 32,
    stroke = 2.5,
    color = "#3b82f6",
    fullPage = false,
    text = ""
}) {
    const spinner = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Loader2 
                    size={size} 
                    strokeWidth={stroke} 
                    color={color} 
                    className="lucide-spinner"
                />
            </motion.div>

            {text && (
                <motion.span
                    style={{
                        fontSize: Math.max(12, size * 0.35),
                        color: color,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                    }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {text}
                </motion.span>
            )}
        </div>
    );

    return (
        <AnimatePresence>
            {fullPage ? (
                <motion.div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 9999,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {spinner}
                </motion.div>
            ) : (
                spinner
            )}
        </AnimatePresence>
    );
}
