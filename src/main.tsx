import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import {NextUIProvider} from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Auth } from "./pages/Auth"
import { Layout } from "./components/Layout"
import { AuthGuard } from "./features/authGuard"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/channels/:id',
        element: <Layout />
      }
    ]
  }
]);

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
