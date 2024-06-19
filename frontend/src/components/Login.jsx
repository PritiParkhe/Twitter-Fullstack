import React, { useState } from 'react'
import { FaXTwitter } from "react-icons/fa6";


const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const loginSignupHandeller = () =>{
    setLogin(!isLogin);
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div >
          <FaXTwitter size="350px" style={{ fontWeight: 'lighter' }}/>
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now</h1>            
          </div>
          <label htmlFor="" className='mt-4 mb-4 text-2xl font-bold'>{isLogin? "Login" : "Signup"}</label>
          <form action="" className='flex flex-col w-[55%]'>
            {
              !isLogin && (
                <>
                  <input type="text" placeholder='Name' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold rounded-full' />
                  <input type="text" placeholder='Username' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold  rounded-full'/>

                </>
              )
            }
          
            <input type="text" placeholder='Email' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold  rounded-full' />
            <input type="text" placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold  rounded-full'/>
            <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Do not have an account? " : "Already have an account? "}<span  onClick={loginSignupHandeller} className='font-bold text-blue-400 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>

        </div>

      </div>
    </div>
  )
}

export default Login
