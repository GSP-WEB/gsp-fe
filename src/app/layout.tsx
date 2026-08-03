import type { Metadata } from "next";
import "../styles/globals.scss";
import AppShell from "@/components/AppShell/AppShell";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "[GT] GSP Performance Dashboard",
  description: "GSP Performance Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
