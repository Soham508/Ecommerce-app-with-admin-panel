import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const ProductDetails = () => {
  const params = useParams();  
  const [product, setProduct] = useState({});

  useEffect(() => {
    if(params?.slug) getProduct();
  }, [params?.slug])

  const getProduct = async() => {
    try{ 
         const {data} = await axios.get(
            `http://localhost:8080/api/v1/product/get-product/${params.slug}`
          );       
          console.log(data.product)
         setProduct(data.product) 
        }
    catch(error){
        console.log(error)
    }
  };

  return (
   <Layout> 
    <div className='h-screen w-full flex pt-10  gap-20'>
      <div className=' w-full h-[70%] mt-10 space-x-80 flex flex-row'> 
       <div className='h-[20%] w-[20%] ml-20 '>
           <img 
           src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
           alt="Green double couch with wooden legs"
           
           className='w-full hover:opacity-80 cursor-pointer active:opacity-70'
           />
       </div>

       <div className='w-[40%] h-max  max-h-max overflow-auto rounded-xl drop-shadow-xl bg-slate-100'> 
           <h1 className='text-2xl text-slate-600 text-center mt-2 font-semibold'> Product details</h1>
           <div className='flex flex-col ml-10 mt-10 gap-3'>
               <span className='text-xl font-normal'> Name : {product.name}</span>
               <span className='text-xl font-normal'> Description : {product.description}</span>
               <span className='text-xl font-normal'> Price : ${product.Price}</span>
               <span className='text-xl font-normal'> Category :  {product.category.name}</span>
           </div>
           <button className='m-10 ml-[40%] hover:bg-gray-200 active:bg-zinc-300 duration-500 bg-slate-300 p-2 pl-4 pr-4 rounded-lg'>
             Add to Card
           </button>
       </div>
      </div> 
    </div>
   </Layout> 
  )
}

export default ProductDetails
