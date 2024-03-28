import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, Button, Box, Input, Textarea,  Checkbox,Text} from '@chakra-ui/react'
import { AiOutlineDown } from "react-icons/ai";



const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("1");
  const [photo, setPhoto] = useState("");
  
  
    //get all category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
        if (data.success) {
          setCategories(data.category);
        }
        else{
          console.log("Not success");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
      }
    };

   //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );
      
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        console.log(data)
       // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

    useEffect(() => {
      getAllCategory();
    
    }, []);

  return (
    <div>
      <Layout>
        <div className="h-screen w-full space-x-40 pt-10 flex flex-row">
          <div className="ml-16 w-[20%] h-max mt-10">
            <AdminMenu />
          </div>
          <div className="flex flex-col space-y-3 gap-5 bg-slate-100 h-max items-center rounded-lg pb-8 pt-10 overflow-auto shadow-xl w-[50%]">
            <Select
              variant="outline"
              border={"1px"}
              borderColor={"gray.400"}
              placeholder="choose a category"
              w={400}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories.map((c) => (
                <option value={c._id} key={c._id} h={20}>
                  
                  {c.name}
                </option>
              ))}
            </Select>
            
            <div>
              <Button colorScheme="twitter" cursor={"pointer"}>
                <label className="cursor-pointer" htmlFor="image">
              
                  {photo ? photo.name : "Upload Photo"}
                </label>
                    
              </Button>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
                id="image"
              />
            </div>
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                className="w-80 h-60"
              />
            )}

            <Box
              display={"flex"}
              flexDirection={"column"}
              p={10}
              bg="gray.200"
              h={550}
              w={600}
              borderRadius={"lg"}
            >
              <Input
                bg={"gray.100"}
                border="1px"
                borderColor={"gray.400"}
                variant="outline"
                h="12"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <Textarea
                mt={8}
                bg={"gray.100"}
                border={"1px"}
                borderColor={"gray.400"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                size="md"
              />

              <input
                type="number"
                value={price}
                placeholder="Price"
                className="rounded-md border w-28 mt-10 text-center bg-slate-100  border-slate-400"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="rounded-md border w-28 mt-10 text-center bg-slate-100 border-slate-400"
                onChange={(e) => setQuantity(e.target.value)}
              />
              
              <div onClick={() => setShipping('0')}>
              <Checkbox ml={48} pt={10} size="md" colorScheme="green" defaultChecked>
                Shipping 
              </Checkbox>
              </div>
              
              <Button onClick={handleCreate} colorScheme="twitter" w={28} ml={48} mt={10} cursor={"pointer"}>
                Submit
              </Button>
             
             
            </Box>
          </div>
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default CreateProduct
