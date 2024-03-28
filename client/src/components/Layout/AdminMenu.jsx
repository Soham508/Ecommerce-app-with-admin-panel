import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className='border pt-5 flex flex-col items-center drop-shadow-xl rounded-lg h-full w-full bg-gradient-to-r from-slate-100 to-slate-200'>
       <h2 className='font-semibold text-2xl text-gray-500'>Admin Panel</h2>
       <div className='space-y-8 flex flex-col items-center pt-10 pb-10 w-full'>
          <NavLink to="/dashboard/admin/create-category" className='bg-slate-300  font-sans hover:bg-slate-400 active:bg-slate-500 text-lg text-center p-3 w-[60%] rounded-2xl'> 
             Create category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className='bg-slate-300  font-sans hover:bg-slate-400 active:bg-slate-500 text-lg text-center p-3 w-[60%] rounded-2xl'> 
             Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/users" className='bg-slate-300  font-sans hover:bg-slate-400 active:bg-slate-500 text-lg text-center p-3 w-[60%] rounded-2xl'> 
             Users
          </NavLink>
          <NavLink to="/dashboard/admin/products" className='bg-slate-300  font-sans hover:bg-slate-400 active:bg-slate-500 text-lg text-center p-3 w-[60%] rounded-2xl'> 
             Products
          </NavLink>
       </div>
    </div>
  )
}

export default AdminMenu
