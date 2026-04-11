
import "./globals.css";

export const metadata = {
  title: "Dashboard Bank Mini SMK Budi Bhakti ",
  description: "Dashboard Admin Bank Mini SMK Budi Bhakti",
  icons: {
    icon: '/bank-mini.png',
  },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
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
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
