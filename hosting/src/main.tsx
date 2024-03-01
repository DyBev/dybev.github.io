import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import Work from './Work.tsx'

const router = createBrowserRouter([
	{
		element: (
			<>
				<Outlet/>
			</>
		),
		children: [
			{
				path: "/",
				element: <App/>,
			},
			{
				path: "/work/:company",
				element: <Work/>
			},
		]
	},
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<RouterProvider router={router}/>
  </React.StrictMode>,
)
