import type { Metadata } from "next";
import "@visa/nova-styles/styles.css";
import "@visa/nova-styles/themes/visa-light/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visa Component Suggester",
  description: "Generate Visa Nova React components from UI descriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="v-surface">
        {children}
      </body>
    </html>
  );
}
