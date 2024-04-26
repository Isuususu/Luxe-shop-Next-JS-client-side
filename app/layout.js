"use client";
import React, { useEffect, useRef, useState } from "react";
import { StateContext } from "../context/StateContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Search from "../components/Search/Search";
import ShoppingCartIcon from "../components/ShoppingCartIcon/ShoppingCartIcon";

// export const metadata = {
//   title: "Home",
//   description: "Welcome to Next.js",
// };

export default function RootLayout({ children }) {
  //Check is user using mobile device or desktop to define layout
  const [windowWidth, setWindowWidth] = useState("");
  useEffect(() => {
    if (typeof window != "undefined") {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    }
  }, [windowWidth]);
  const mobile = windowWidth < 500;

  //This is a reference to inner wrapper to keep searchbar animation logic
  const [innerWrapperReference, setInnerWrapperReference] =
    useState(null);
  const innerWrapperRef = useRef(null);
  useEffect(() => {
    if (innerWrapperRef !== null) {
      setInnerWrapperReference(innerWrapperRef);
    }
  }, []);

  return (
    <html lang="en">
      <UserProvider>
        <body suppressHydrationWarning={true}>
          <StateContext>
            {mobile ? (
              <>
                <Toaster />
                <Navbar />
                <ShoppingCartIcon />
                <Search />
                {children}
              </>
            ) : (
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  background: "#ffcd45",
                }}
              >
                <div className="desktop-layout" id="desktop-layout">
                  <div className="desktop-layout__outer-wrapper">
                    <Toaster />
                    <Navbar mobile={false} />
                    <ShoppingCartIcon />
                    <Search ref={innerWrapperReference} />
                    <div
                      className={
                        !mobile ? "desktop-layout__inner-wrapper" : ""
                      }
                      ref={innerWrapperRef}
                    >
                      <Image
                        src="/images/notch.png"
                        alt=""
                        width={113}
                        height={30}
                        style={{
                          zIndex: "99",
                          position: "absolute",
                          left: "50%",
                          top: "20px",
                          transform: "translate(-50%)",
                        }}
                      />
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </StateContext>
        </body>
      </UserProvider>
    </html>
  );
}
