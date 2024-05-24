import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Modding with Nyfaria',
    description: 'A website for the Mod Developer Nyfaria.',
}
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png"/>
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json"/>
        </head>
        <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>

        </body>
        </html>
    )
}