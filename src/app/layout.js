 "use client";
 
import "./globals.css";
import Layoutwraper from "@/layoutwraper";
import { Provider } from "react-redux";
import { appStore } from "./Redux/store";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Provider store={appStore} >
          <Layoutwraper>
            {children}
          </Layoutwraper>
        </Provider>
      </body>
    </html>
  );
}
