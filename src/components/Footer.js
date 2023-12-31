 import React from 'react'
 import Logout from './Auth/Logout' 
 import { useAuth } from '../Contexts/AuthContext'

 export default function Footer() {
   const { currentUser } = useAuth()

   return (
     <>
       {currentUser &&
         <Logout />
       }  
       
       <footer className="text-center text-black p-4">
           <strong>&copy; {new Date().getFullYear()} Andrew Cocroft, All Rights Reserved.</strong>
       </footer>
     </>     
   )
 }