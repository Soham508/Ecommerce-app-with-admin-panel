import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import toast, {Toaster} from "react-hot-toast";
import axios from 'axios';
import {Icon,Checkbox,Radio, RadioGroup , Box, Image, chakra,Button, Card, Heading, ButtonGroup, CardBody, CardFooter, Divider,Text, Stack , SimpleGrid, } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import {FcLike} from 'react-icons/fc'
import { Prices } from '../components/Prices';
import { useSearch } from '../context/search';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const getTotal = async() => {
    try{
      const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count');
      setTotal(data?.total);
    }
    catch(error){
       console.log(error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      } else {
        console.log("Not success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])

  const getAllProducts = async () => {
    try {
      if(values.results.length < 1){
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.products);
    }
      else{
        setProducts(values.results)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if(!checked.length && !radio.length  ) getAllProducts();
    //eslint-disable-next-line
  
  }, [checked.length, radio.length, values.results]);

   //get filterd product
   const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(checked.length || radio.length) filterProduct();
  
  }, [radio, checked]);


  return (
    <Layout >
      <div className="w-full h-screen flex flex-row ">
        <div className="h-full flex flex-col space-y-10 w-[20%] bg-sky-100">
          <div className="w-max grid-cols-2 gap-2 grid ml-5 items-center  mt-10">
           
            {categories?.map((c) => (
              <Checkbox
                id={c._id}
                borderColor={"gray.400"}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                colorScheme="green"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <div className='flex items-center ml-5'>
            <RadioGroup className='grid grid-cols-2 gap-3'>    
                          
                {
                  Prices?.map((p) => (
                    <div id={p._id}>
                      <Radio  onChange={(e) => setRadio(e.target.value)} value={p.array} colorScheme="green" >
                         {p.name} 
                      </Radio>
                    </div>
                  ))
                }
               
            </RadioGroup>
          </div>
          <Button onClick={() => window.location.reload()}
           colorScheme='blue' alignSelf={'center'} w={28} variant='ghost'>
            Reset filters
          </Button>
        </div>
        <div className="h-full p-5 bg-slate-50 w-[80%]">
          <SimpleGrid columns={4} h={"max"} spacing={5}>
            {products.map((p) => (
              <Link key={p._id} to={`/product/${p.slug}`} className="product-link">
                <Card w="320px" boxShadow={"xl"} h="450px">
                  <CardBody>
                    <Box display={"flex"}>
                      <Image
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                        h="200px"
                        w="200px"
                      />
                      <Icon ml={10} mt={5} boxSize={7} as={FcLike} />
                    </Box>
                    <Stack mt="3" h="110px" spacing="3">
                      <Heading size="md">{p.name}</Heading>
                      <Text>{p.description.slice(0, 60)}...</Text>
                      <Text color="blue.600" fontSize="2xl">
                        ${p.price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="10" h="30px" j>
                      <Button variant="solid" colorScheme="blue">
                        Buy now
                      </Button>
                      <Button variant="ghost" colorScheme="blue">
                        Add to cart
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;