// app/layout.tsx
"use client";
interface LayoutProps {
  children: React.ReactNode;
  components: any; // Make this required
}
import React from "react";
import { GContextProvider } from "./contextApi/contextApi";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Store, persistor } from "./redux/store/Store";
// styles Vendors
import "./globals.scss";

export default function RootLayout({
  children,
  components, // Ensure components is included
}: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200 "
        />
      </head>
      <body>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <GContextProvider>{children}</GContextProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
