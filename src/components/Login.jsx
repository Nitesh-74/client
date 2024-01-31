import React, { useEffect, useState } from "react";
import { login } from "../services/api";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./partials/Header";
// const loginUser = async (formData) => {

//   return new Promise((resolve) => {
//     setTimeout(() => {
     
//       resolve({ success: true, user: formData.username });
//     }, 1000);
//   });
// };

const Login = () => {
  // State for form data and error
  const navigation =useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
 
  useEffect(()=>{
    const user=localStorage.getItem('user');
    if(user){
       navigation('/');
    }
   },[])



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
   
   
      // const result = await loginUser(form);
      // console.log("Login successful:", result);

      const result =await login(form);
      console.log("form",result);
      setError(null);

      if(result.status===200){
        if(result.data.status===200){
          localStorage.setItem('user',JSON.stringify(result.data.data));
          navigation('/');
          return ;
        }
        if(result.data.status===201){
          setError(result.data.data);
          return ;
        }
         if(result.data.status===202){
              toast(result.data.message);
         }
      }

    
      
    // } catch (error) {
    //   console.error("Login error:", error);
    //   setError("Invalid credentials. Please try again.");
    // }
  };

  return (
    <>
      <Header/>
   
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="form-group row">
        <h4 className="card-title">Login Now</h4>
        <ToastContainer/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label mt-4">
          Email address or username
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={form.username} // Bind input value to state
          className="form-control"
          name="username"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        {
          error?.username && ( <small id="emailHelp" className="form-text text-muted">
         {error.username.msg}
        </small>)
        }
       
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1" className="form-label mt-4">
          Password
        </label>
        <input
          type="password"
          onChange={handleChange}
          value={form.password} // Bind input value to state
          className="form-control"
          name="password"
          id="exampleInputPassword1"
          placeholder="Password"
          autoComplete="off"
        />
        {
          error?.password &&( <small id="emailHelp" className="form-text text-muted">
          {error.password.msg}
        </small>)
        }
      </div>

      <button type="submit" className="btn btn-primary">
       Login
      </button>

      
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
    </>
  );
};

export default Login;
