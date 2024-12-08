"use client"

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Provider store={store} >
        <Navbar />
          {children}
        <Footer />
      </Provider>
    </div>
  );
}