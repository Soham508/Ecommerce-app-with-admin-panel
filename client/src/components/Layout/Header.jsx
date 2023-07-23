import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import {BiSolidUser} from "react-icons/bi";
import { Dropdown, } from "flowbite-react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton
} from '@chakra-ui/react'

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
      <nav className="w-full flex px-10 h-14 items-center justify-between m-auto bg-blue-600">
        <div className="">Ecoomerce app</div>

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
                   { auth?.user?.role === 1 ? 
                       <MenuItem
                         as={"a"}
                         href={`/dashboard/${
                           auth?.user?.role === 1 ? "admin" : "user"
                         }`}
                       >
                         Dashboard
                       </MenuItem> : 
                       <>
                          <MenuItem as='a' href="/user/profile">
                              Profile
                          </MenuItem>
                          <MenuItem as='a' href="/user/orders">
                              Orders
                          </MenuItem>
                       </>
                    }   
                  <MenuItem onClick={handleLogout} as={"a"} href="/login">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          <div className="rounded-full p-2 cursor-pointer hover:bg-blue-200">
            <AiOutlineShoppingCart className="w-6 h-6 " />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
