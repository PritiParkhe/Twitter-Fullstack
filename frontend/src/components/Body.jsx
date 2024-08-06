import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Feed from './Feed'
import Profile from './Profile'
import MobileRightsideBar from './MobileRightsidebar'
import ChatPage from '../pages/ChatPage'

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
    },
    {
      path : "/messages",
      element : <ChatPage/>
    }
  ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body