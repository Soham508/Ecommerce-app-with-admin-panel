import React from "react";
import AdminMeun from "../../components/Layout/AdminMeun";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Stack,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      
      <div className="h-screen w-full space-y-10 flex flex-row">
        <div className="ml-16 w-[20%] h-[40%] mt-10">
          <AdminMeun />
        </div>
        <div className="ml-40 h-full pt-10">
          <Card w={350} boxShadow="xl" bg="gray.50">
            <CardHeader>
              <Heading size="md">Admin details</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Name
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {auth?.user?.name}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Email
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {auth?.user?.email}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Phone
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {auth?.user?.phone}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
