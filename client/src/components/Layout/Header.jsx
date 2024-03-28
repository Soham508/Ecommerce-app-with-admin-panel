/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { BiSolidUser } from "react-icons/bi";
import { Dropdown } from "flowbite-react";
import SearchForm from "../Form/SearchForm";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  chakra,
  Flex,
  Icon,
} from "@chakra-ui/react";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div className="w-full items-center ">
      <nav className="w-full flex px-10 h-14 items-center justify-between m-auto bg-blue-600 opacity-90">
        <div className="text-2xl font-bold text-yellow-300 border p-2 pt-1 pb-1 border-yellow-100 bg-yellow-500/90 rounded-xl">
          Smart Kart
        </div>

        <div className="items-center flex space-x-8">
          <div className=" bg-blue-500 rounded-lg p-1 hover:bg-blue-700 ">
            <NavLink to="/" className="text-white no-underline m-3 ">
              Home
            </NavLink>
          </div>

          <div className="bg-blue-500 rounded-lg p-1 hover:bg-blue-700 ">
            <NavLink to="/category" className="text-white no-underline m-3 ">
              Category
            </NavLink>
          </div>

          <div className="bg-blue-500 rounded-lg p-1 hover:bg-blue-700 ">
            <NavLink to="/about" className="text-white no-underline m-3 ">
              About
            </NavLink>
          </div>
        </div>
        <div className="flex space-x-8 items-center">
          <SearchForm />
          {!auth.user ? (
            <>
              <div className="text-white font-semibold  hover:bg-blue-500 rounded-lg px-3 py-2">
                <NavLink to="/login" className="no-underline text-white">
                  {" "}
                  Login
                </NavLink>
              </div>
              <div className="text-white font-semibold  hover:bg-blue-500 rounded-lg px-3 py-2">
                <NavLink to="/Register" className="no-underline text-white">
                  {" "}
                  Register
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<AiOutlineUser />}
                  variant="ghost"
                  _hover={{ bg: "gray.300" }}
                />
                <MenuList>
                  <MenuItem>{auth?.user?.name}</MenuItem>
                  <MenuDivider />
                  {auth?.user?.role === 1 ? (
                    <MenuItem
                      as={"a"}
                      href={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem as="a" href="/user/profile">
                        Profile
                      </MenuItem>
                      <MenuItem as="a" href="/user/orders">
                        Orders
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={handleLogout} as={"a"} href="/login">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          <div className="rounded-full p-2 cursor-pointer hover:bg-blue-200">
            <chakra.span pos="relative" display="inline-block">
              <Icon
                boxSize={6}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </Icon>
              <chakra.span
                pos="absolute"
                top="-1px"
                right="-1px"
                px={2}
                py={1}
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(50%,-50%)"
                bg="red.600"
                rounded="full"
              >
                0
              </chakra.span>
            </chakra.span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
