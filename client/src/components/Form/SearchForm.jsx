import React from 'react';
import { useSearch } from '../../context/search';
import { AiOutlineSearch } from 'react-icons/ai';
import {  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Input,
    useDisclosure, Icon} from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      console.log(values.results)
      //navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="">
      
      <Box cursor={'pointer'} display={'flex'} p={3} borderRadius={'full'} _hover={{ bg: 'gray.300' }}>
       <Icon boxSize={5} alignSelf={'center'}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }} as={AiOutlineSearch}/>

       </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Enter, what you want to search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} alignItems={"center"}>
              <Input
                type="text"
                value={values.keyword}
                onChange={(e) => setValues({...values, keyword: e.target.value})}
                w={250}
                variant="filled"
                border={"1px"}
                borderColor={"gray.400"}
                bg={"gray.50"}
                placeholder="Search..."
              />
              <Button
                ml={5}
                colorScheme="telegram"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SearchForm
