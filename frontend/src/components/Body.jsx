import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Feed from './Feed'
import Profile from './Profile'
import MobileRightsideBar from './MobileRightsidebar'

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Home/>,
      children: [
        {
          path : "/",
          element : <Feed/>

        },
        {
          path : "/profile/:id",
          element : <Profile/>
        },
        
      ]
    },
    {
      path : "/search",
      element : <MobileRightsideBar/>
    },
    {
      path : "/login",
      element : <Login/>
    }
  ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body