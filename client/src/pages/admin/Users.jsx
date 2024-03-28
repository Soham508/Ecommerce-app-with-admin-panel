import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const Users = () => {
  return (
    <div>
      <Layout>
      
      <div className="h-screen w-full space-y-10 flex flex-row">
        <div className="ml-16 w-[20%] h-max mt-10">
          <AdminMenu />
        </div>
        
      </div>
    </Layout>
    </div>
  )
}

export default Users
