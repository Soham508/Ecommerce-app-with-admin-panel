import React, { useEffect, useState, } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { BiChevronDown } from 'react-icons/bi';
import toast, {Toaster} from "react-hot-toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Table,
  Thead,
  Tbody,
  Input,
  Tr,
  Th,
  Td,
  Box,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useDisclosure,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null)
  const [edit, setEdit] = useState('');

   //handle Form
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

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

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http:localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: edit }
      );
      if (data.success) {
        toast.success(`${edit} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  const handleDelete = async(pId) => {
    try{
        const {data} = await axios.delete(
          `http://localhost:8080/api/v1/category/delete-category/${pId}`
        );
        if(data.success){
          toast.success('category is deleted');
          getAllCategory();
        }
        else{
          toast.error(data.message);
        }
    }
    catch(error){
          toast.error("something went wrong");    }
  } 

  useEffect(() => { 
    getAllCategory();
  }, [])

  //Chakra-UI
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(1px) '
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <div>
      <Layout>
        <div className="h-screen w-full space-x-40 pt-10 flex flex-row">
          <div className="ml-16 w-[20%] h-max mt-10">
            <AdminMenu />
          </div>
          <div className="flex bg-slate-100 h-[80%] rounded-lg pt-20 justify-center shadow-xl w-[60%]">
            <TableContainer flexDirection={"column"}>
              <Box mb="10">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  w={600}
                  variant="filled"
                  border={"1px"}
                  borderColor={"gray.400"}
                  bg={"gray.50"}
                  placeholder="Category name"
                />
                <Button ml={10} bg={"gray.200"} onClick={handleSubmit}>
                  Create category
                </Button>
              </Box>

              <Table
                variant="simple"
                boxShadow={"lg"}
                bg={"gray.200"}
                borderRadius={10}
              >
                <Thead>
                  <Tr>
                    <Th w={600}>
                      <Text fontSize={"18"} fontFamily={"sans"}>
                        Categories
                      </Text>
                    </Th>
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories?.map((c) => (
                    <>
                      <Tr>
                        <Td key={c._id}>{c.name}</Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<BiChevronDown />}
                              bg={"gray.300"}
                              onClick={() => setSelected(c)}
                            >
                              Actions
                            </MenuButton>
                            <MenuList>
                              <MenuItem>
                                <Button
                                  ml={5}
                                  w={150}
                                  bg={"blue.300"}
                                  onClick={() => {
                                    setOverlay(<OverlayOne />);
                                    onOpen();
                                  }}
                                >
                                  Edit
                                </Button>

                                <Modal
                                  isCentered
                                  isOpen={isOpen}
                                  onClose={onClose}
                                >
                                  {overlay}
                                  <ModalContent>
                                    <ModalHeader>
                                      Change category name
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Box  display={'flex'} alignItems={'center'}> 
                                          <Input
                                            type="text"
                                            value={edit}
                                            onChange={(e) =>
                                              setEdit(e.target.value)
                                            }
                                            w={250}
                                            variant="filled"
                                            border={"1px"}
                                            borderColor={"gray.400"}
                                            bg={"gray.50"}
                                            placeholder="New category name"
                                          />
                                          <Button ml={5} colorScheme='telegram' onClick={(e) => {handleUpdate(e)}}>Submit</Button>
                                        </Box>  
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                  </ModalContent>
                                </Modal>
                              </MenuItem>
                              <MenuDivider />
                              <MenuItem>
                                <Button
                                  ml={5}
                                  w={150}
                                  bg={"red.400"}
                                  onClick={() => {
                                    handleDelete(selected._id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default CreateCategory
