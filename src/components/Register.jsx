import React from 'react';
import { useState, useEffect } from 'react';
import { register } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from './partials/Header';

const Register = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      return navigation('/');
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const result = await register(form);

    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }  if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        navigation('/');
        return;
      } if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("Error happened");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-md-center mt-4">
          <div className="col-lg-5 card border-primary mb-3">
            <form onSubmit={handleSubmit}>
              <div className="card-header h4 text-center">Register Here</div>
              <div className="card-body">
                <div className="form-group">
                  <label className="col-form-label mt-4">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  {errors?.name && (
                    <small id="emailHelp" className="form-text  text-danger">
                      {errors.name.msg}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4">Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your username"
                  />
                  {errors?.username && (
                    <small id="emailHelp" className="form-text  text-danger">
                      {errors.username.msg}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-form-label mt-4">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  {errors?.email && (
                    <small id="emailHelp" className="form-text text-danger">
                      {errors.email.msg}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-form-label mt-4">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your Password"
                  />
                  {errors?.password && (
                    <small id="emailHelp" className="form-text  text-danger">
                      {errors.password.msg}
                    </small>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary justify-content-md-center">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
