import React from "react";
import "../styles/globals.css";

//Context
import { StateContext } from "../context/StateContext";

//Components
import Navbar from "../components/Navbar/Navbar";
import ShoppingCartIcon from "../components/ShoppingCartIcon/ShoppingCartIcon";
import DesktopLayout from "../components/DesktopLayout/DesktopLayout";
import { Toaster } from "react-hot-toast";

//Lib
import { Providers } from "./providers";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { isMobileDevice } from "@/lib/utils";

export const metadata = {
  title: "Luxe Shop",
  description: "Welcome to Luxe Shop",
};

export default async function RootLayout({ children }) {
  const mobile = isMobileDevice(headers());

  console.log("Is it mobile device", mobile);

  const session = await getServerSession(options);
  console.log(session);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* <Providers> */}
        <StateContext>
          {mobile === true ? (
            session === null ? (
              children
            ) : (
              <>
                <Toaster />
                <Navbar user={session.user} />
                <ShoppingCartIcon />
                {children}
              </>
            )
          ) : (
            <DesktopLayout user={session ? session.user : null}>
              {children}
            </DesktopLayout>
          )}
        </StateContext>
        {/* </Providers> */}
      </body>
    </html>
  );
}
