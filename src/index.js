import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from './data/store';
import { AuthProvider } from "./api/Auth";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <AuthProvider >
      <QueryClientProvider client={queryClient}>
       <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

