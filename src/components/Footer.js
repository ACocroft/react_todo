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
       
       <footer className="text-center text-white bg-info p-4">
           <strong>&copy; {new Date().getFullYear()} Centriq Training, All Rights Reserved.</strong>
       </footer>
     </>     
   )
 }