import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [byMail, setByMail] = useState(true);
    const [auth, setAuth] = useAuth();
    const [phone, setPhone] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
            email,
            password
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
              });
              localStorage.setItem("auth", JSON.stringify(res.data));
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

  return (
    <div className='w-full bg-gradient-to-r from-blue-400 to-blue-200 h-screen flex items-center opacity-80 justify-center'>
        <div className="h-[45%] w-[23%] pb-6 pt-16 rounded-lg bg-blue-400 flex flex-col items-center">
          <form onSubmit={handleSubmit} action="" className="h-full w-full space-y-5 flex flex-col items-center">
         
         {byMail?
          <div className="flex h-16 p-2 w-full justify-center">
              <input required onChange={(e) => setEmail(e.target.value) } value={email} placeholder="Email" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border border-transparent" type="text" />
          </div> :
         <div className="flex h-16 p-2 w-full justify-center">
            <input required onChange={(e) => setPhone(e.target.value) } value={phone} placeholder="Phone number" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border border-transparent" type="text" />
          </div>
          }  

          <button type="button" onClick={() => setByMail(False)} className="text-sm text-slate-200 mt-0 cursor-pointer"> Login with Phone number</button>
            
          <div className="flex h-16 p-2 w-full justify-center">
              <input required onChange={(e) => setPassword(e.target.value) } value={password} placeholder="Password" className="rounded-full w-2/3 text-center shadow-xl font-semibold placeholder:text-zinc-500  bg-slate-100 hover:bg-gray-200 border border-transparent" type="password" />
          </div>

          <button value="submit" type="submit" className="w-[50%]  rounded-3xl h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-cyan-600 hover:to-blue-600 text-slate-50 font-sans" > Login</button>
          </form>
          <div className="flex flex-col gap-2 items-center">
           <span className="text-slate-100 font-semibold font-sans"> Don't have a account? <Link to='/register' className="underline text-blue-900 font-serif "> Register</Link> </span>
          </div>
        </div>
        <Toaster/>
    </div>
  )
}

export default Login
