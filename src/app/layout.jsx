
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Dashboard Bank Mini SMK Budi Bhakti ",
  description: "Dashboard Admin Bank Mini SMK Budi Bhakti",
  icons: {
    icon: '/bank-mini.png',
  },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const theme = localStorage.getItem("admin_theme");
            document.documentElement.setAttribute("data-theme", theme);
          `,
          }}
        />
      </head>
      <body className="antialiased">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
