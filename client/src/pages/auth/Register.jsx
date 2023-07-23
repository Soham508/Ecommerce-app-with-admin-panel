import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="w-full bg-gradient-to-r from-blue-400 to-blue-200 h-screen flex items-center opacity-80 justify-center">
      <div className="h-[65%] w-[25%] space-y-1 pb-12 pt-16 rounded-lg bg-blue-400 flex flex-col items-center">
        <form onSubmit={handleSubmit} action="" className="h-full w-full space-y-2 flex flex-col items-center"> 
          <div className="flex h-16 p-2 w-full justify-center">
              <input required onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border  border-transparent" type="text" />
          </div>
  
          <div className="flex h-16 p-2 w-full justify-center">
              <input required onChange={(e) => setEmail(e.target.value) } value={email} placeholder="Email" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border border-transparent" type="text" />
          </div>
  
          <div className="flex h-16 p-2 w-full justify-center">
              <input required onChange={(e) => setPhone(e.target.value) } value={phone} placeholder="Phone number" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border border-transparent" type="text" />
          </div>
  
          <div className="flex h-16 p-2 w-full justify-center">
              <input required onChange={(e) => setAddress(e.target.value) } value={address} placeholder="address" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border border-transparent" type="text" />
          </div>
  
          <div className="flex h-16 p-2 w-full justify-center mb-5">
              <input required onChange={(e) => setPassword(e.target.value) } value={password} placeholder="Password" type="password" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500 hover:bg-gray-200 bg-slate-100  border border-transparent" />
          </div>

          <button value="submit" type="submit" className="w-[50%] rounded-3xl h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-cyan-600 hover:to-blue-600 text-slate-50 font-sans" > Register</button>
        </form>
        <div className="flex flex-col gap-2 items-center">
           <span className="text-slate-100 font-semibold font-sans"> Already have a account? <Link to='/login' className="underline text-blue-900 font-serif "> Login</Link> </span>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Register;
