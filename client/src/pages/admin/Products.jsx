import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast, {Toaster} from "react-hot-toast";
import axios from 'axios';
import { Flex, Box, Image, chakra, SimpleGrid, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Products = () => {
     
    const [products, setProducts] = useState([]);

    const getAllProducts = async() => {
        try{
           const {data} = await axios.get('http://localhost:8080/api/v1/product/get-product')
           setProducts(data.products);
        } 
        catch(error){
          console.log(error)
          toast.error('Something went wrong')
        }
      };

      useEffect(() => {
         getAllProducts();
         console.log(products)
      }, [])

  return (
    <div>
      <Layout>
        <div className="h-screen w-full space-y-10 flex flex-row">
          <div className="ml-16 w-[20%] h-max mt-10">
            <AdminMenu />
          </div>
          <div className='ml-16'>
            <SimpleGrid columns={3} spacing={10}>
              {
                products.map((p) => (
                 <Link
                 key={p._id}
                 to={`/dashboard/admin/product/${p.slug}`}
                 className="product-link"
                 > 
                  <Box
                    w="sm"
                    h='380px'
                    mx="auto"
                    bg="gray.100"
                    _dark={{
                      bg: "gray.800",
                    }}
                    shadow="xl"
                    rounded="lg"
                    overflow="hidden"
                  >
                    <Image
                      w="full"
                      h={56}
                      fit="cover"
                      objectPosition="center"
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt="avatar"
                    />
  
                    <Box py={4} px={6}>
                      <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.800"
                        _dark={{
                          color: "white",
                        }}
                      >
                        {p.name}
                      </chakra.h1>
  
                      <chakra.p
                        py={2}
                        color="gray.700"
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                      {p.description.slice(0,120)}
                      </chakra.p>
  
  
                    </Box>
                  </Box>
                 </Link> 
                ))
              }
            </SimpleGrid>
          </div>
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default Products
