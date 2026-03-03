import { motion } from "framer-motion";

export default function LoadingComponent(){
    const animate = {
        scale:[1, 1.8, 1.8, 1],
        opacity :[0.6, 1, 1, 0.6]
    }

     const circle = {
        width: 20,
        height: 20,
        backgroundColor: "#9911ff",
        borderRadius: '50%',
        pointerEvents: 'none'
    }

    // full-screen overlay centered container
    const overlay = {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',

    }

    return(
        <>
        <div style={overlay}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
                {[0,1,2,3].map((item)=>(
                    <motion.div
                    key={item}
                    style={circle}
                    initial = {{scale: 1, opacity : 0.6}}
                    animate={animate}
                    transition={{
                        duration : 1.25,
                        ease : "easeInOut",
                        repeat : Infinity,
                        repeatType : "loop",
                        delay : item * 0.20
                    }}>

                    </motion.div>
                ))}
            </div>
        </div>
        </>
    )
}