import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import Work from './Work.tsx'
import { DataProvider } from './firebase.tsx'
import Footer from './Footer.tsx';

const router = createBrowserRouter([
	{
		element: (
			<>
				<Outlet/>
				<Footer/>
			</>
		),
		children: [
			{
				path: "/*",
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
	<DataProvider>
		<RouterProvider router={router}/>
	</DataProvider>
  </React.StrictMode>,
)
