// app/layout.js
"use client";

import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useState } from "react";
import { Light, Dark, AuthContextProvider } from "./index.js"; // ajusta si están en otra carpeta

export const ThemeContext = createContext(null);

export default function RootLayout({ children }) {
    const [themeuse, setTheme] = useState("dark");
    const theme = themeuse === "light" ? "light" : "dark";
    const themeStyle = theme === "light" ? Light : Dark;

    return (
        <html lang="en">
            <body>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <ThemeProvider theme={themeStyle}>
                        <AuthContextProvider>
                            {children}
                            <ReactQueryDevtools initialIsOpen={true} />
                        </AuthContextProvider>
                    </ThemeProvider>
                </ThemeContext.Provider>
            </body>
        </html>
    );
}
