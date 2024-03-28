import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Button, Box, Input, Textarea,  Checkbox,  Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Portal} from '@chakra-ui/react'
import { AiOutlineDown } from "react-icons/ai";


const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
  

   //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  
  useEffect(() => {
    getSingleProduct();
    getAllCategory();
    //eslint-disable-next-line
  }, []);

   //create product function
   const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");

      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Layout>
        <div className="h-screen w-full space-x-40 flex flex-row">
          <div className="ml-16 w-[20%] h-max mt-10">
            <AdminMenu />
          </div>

          <div className="flex flex-col space-y-3 mt-10 gap-5 bg-slate-100 h-max items-center rounded-lg pb-8 pt-10 overflow-auto shadow-xl w-[50%]">
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

              <div onClick={() => setShipping("0")}>
                <Checkbox
                  ml={48}
                  pt={10}
                  size="md"
                  colorScheme="green"
                  defaultChecked
                >
                  Shipping
                </Checkbox>
              </div>

              <div className="w-full mt-10 flex flex-row items-center space-x-10 justify-center">
                <Button
                  onClick={handleUpdate}
                  colorScheme="twitter"
                  w={40}
                  cursor={"pointer"}
                >
                  Update product
                </Button>

                <Button
                  onClick={handleDelete}
                  colorScheme="red"
                  w='auto'

                  cursor={"pointer"}
                >
                  Delete
                </Button>

              </div>
            </Box>
          </div>
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default UpdateProduct;
