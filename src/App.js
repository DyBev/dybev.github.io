import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeScreen } from './components/home-screen';
import { PersonalProjects } from './components/personal-projects';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "PersonalProjects",
    element: <PersonalProjects />,
  },
]);

function App() {
  return (
		<RouterProvider router={router}/>
  );
}

export default App;
