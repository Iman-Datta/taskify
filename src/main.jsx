import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fontsource-variable/cormorant-garamond";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster
        position="top-right"
        theme="system" // auto light/dark from your <html class="dark">
        richColors // beautiful semantic colors, no config needed
        expand // toasts stack and expand on hover
        toastOptions={{
          classNames: {
            toast: "font-sans rounded-[14px] border border-l-[3px] shadow-lg",
            title: "text-[13.5px] font-semibold",
            description: "text-[12.5px] font-light opacity-70",
            success: "border-l-emerald-500",
            error: "border-l-red-500",
            info: "border-l-blue-500",
            warning: "border-l-amber-500",
          },
        }}
      />
      <App />
    </Provider>
  </BrowserRouter>,
);
