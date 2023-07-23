import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMeun from '../../components/Layout/AdminMeun';

const CreateCategory = () => {
  return (
    <div>
 <Layout>
      
      <div className="h-screen w-full space-y-10 flex flex-row">
        <div className="ml-16 w-[20%] h-[40%] mt-10">
          <AdminMeun />
        </div>
       
      </div>
    </Layout>
    </div>
  )
}

export default CreateCategory
