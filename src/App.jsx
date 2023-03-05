import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Root from './components/Root'
import Home from './components/Home'
import SignIn from './components/SignIn';
import Projects from './components/Projects'
import NewProject from './components/NewProject'
import Admins from './components/Admins'
import NewAdmin from './components/NewAdmin'
import EditAdmin from './components/EditAdmin'
import EditProject from './components/EditProject'



function App() {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/newproject' element={<NewProject />} />
        <Route path='/admins' element={<Admins />} />
        <Route path='/newadmin' element={<NewAdmin />} />
        <Route path='/editadmin' element={<EditAdmin />} />
        <Route path='/editproject' element={<EditProject />} />
      </Route>
    )
  )


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
