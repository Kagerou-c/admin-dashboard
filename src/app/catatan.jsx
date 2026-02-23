// "use client"

// import { useAuth } from '../contex/useAuth'
// import { ChartLine } from 'lucide-react'
// import { useSelectedLayoutSegment } from 'next/navigation'

// export default function Navbar() {
//     const { user, isLogin, logout } = useAuth()
//     const segment = useSelectedLayoutSegment()

//     const displayName = user?.user_metadata?.display_name

//     const isActive = (name) => segment === name

//     return (
//         <nav>
//             {isLogin ? (
//                 <>
//                     <div className="Tittle">
//                         <h1>Admin Panel</h1>
//                         <ChartLine color="#1dcdff" />
//                     </div>

//                     <div className="Navigasi">
//                         <button className={isActive('dashboard') ? 'active' : ''}>
//                             Dashboard
//                         </button>

//                         <button className={isActive('setting') ? 'active' : ''}>
//                             Setting
//                         </button>

//                         <button className={isActive('reports') ? 'active' : ''}>
//                             Reports
//                         </button>

//                         <button className={isActive('stock') ? 'active' : ''}>
//                             Stock
//                         </button>

//                         <span>Halo, {displayName}</span>
//                         <button onClick={logout}>Logout</button>
//                     </div>
//                 </>
//             ) : (
//                 <span>Belum login</span>
//             )}
//         </nav>
//     )
// }
// Penjelasan dasar: apa itu useContext

// useContext adalah cara React untuk berbagi state/data secara global ke banyak komponen tanpa prop drilling.

// Biasanya dipakai untuk:

// data user (login, role)

// theme (dark/light)

// bahasa (i18n)

// config global

// Strukturnya selalu ada 3 komponen:

// createContext()

// Context.Provider

// useContext(Context)

// Contoh mental model sederhana:

// Context = “pipa air”
// Provider = “tandon”
// useContext = “keran di tiap komponen”

// .chart-header {
//   width: 100%;
//   max-width: 900px;
//   margin-left: 20px;
//   margin-bottom: 20px;
//   padding: 20px;
// }

// .chart-header h1 {
//   font-size: 2rem;
//   font-weight: 700;
//   color: #1e1e1e;
// }

// .chart-header p {
//   font-size: 1rem;
//   font-weight: 400;
//   color: rgb(131, 131, 131);
//   ;
// }









// .chart-wrap {
//   width: 100%;
//   max-width: 900px;
//   height: 64%;
//   aspect-ratio: 2 / 1;
//   margin: 20px auto;
//   padding: 20px;
//   box-sizing: border-box;
// }










// .Data-singkat-wrap {
//   width: 100%;
//   max-width: 1200px;
//   margin: 30px auto;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;
//   background-color: transparent;
//   padding: 0 20px;
//   box-sizing: border-box;
// }

// .Data-singkat-wrap .data {
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   padding: 16px;
//   border: solid gray 2px;
//   border-radius: 16px;
//   background-color: white;
//   transition: 0.3s;
//   width: 100%;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
// }

// .Data-singkat-wrap .data:hover {
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// }

// .Data-singkat-wrap .data span {
//   margin-top: 10px;
// }



// /* Responsive Mobile */
// @media (max-width: 768px) {
//   .chart-wrap {
//     aspect-ratio: 4 / 3;
//     padding: 10px;
//     margin: 10px auto;
//   }

//   .Data-singkat-wrap {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//     padding: 0 15px;
//   }

//   .hero-section-wrap {
//     width: 100%;
//     margin: 10px auto;
//     padding: 15px;
//     border-radius: 0;
//   }

//   .hero-section h1 {
//     font-size: 1.4rem;
//   }

//   .hero-section p {
//     font-size: 0.9rem;
//   }

//   .Shortcut {
//     flex-direction: column;
//     width: 100%;
//   }

//   .hero-section button {
//     width: 100%;
//   }

//   .data-wrap {
//     grid-template-columns: 1fr;
//     margin: 15px auto;
//     padding: 0 15px;
//   }
// }

// /* Responsive Tablet */
// @media (min-width: 769px) and (max-width: 1024px) {
//   .chart-wrap {
//     max-width: 700px;
//     aspect-ratio: 16 / 9;
//   }

//   .Data-singkat-wrap {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   .hero-section-wrap {
//     width: 100%;
//   }

//   .data-wrap {
//     grid-template-columns: repeat(2, 1fr);
//     padding: 0 15px;
//   }
// }