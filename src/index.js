import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider, useAuth } from "./context/auth";

import { middlewareLogin } from "./middleware/auth";
const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const user = useAuth();
  useEffect(() => {
    middlewareLogin();
  }, [user]);
  return <RouterProvider router={router} />;
};

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
