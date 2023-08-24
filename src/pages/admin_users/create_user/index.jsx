import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/reusable_components/header";
import Button from "../../../components/reusable_components/button";
import SideBar from "../../../components/reusable_components/sidebar";
import TitleBar from "../../../components/reusable_components/titlebar";
import TextField from "../../../components/reusable_components/custom_textfield";
import { addUser } from "../../../global/fetch_requests";
import { useSelector } from "react-redux";

const AddUser = () => {
  const auth = useSelector((state)=>state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"£$@#%^&*])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const validateFirstName = () => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(firstName);
  };

  const validateLastName = () => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(lastName);
  };

  const validateAll = () => {
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validName = validateFirstName();
    const validLastName = validateLastName();
    return validEmail && validPassword && validName && validLastName;
  };

  const addUserHandler = () => {
    setIsLoading(true);
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      countryId: 1,
      createdby: auth?.profile?.id,
    };
    addUser(data)
      .then((res) => {
        setEmail("");
        setLastName("");
        setFirstName("");
        setPassword("");
        console.log(res);
        if (res.code === 0) {
          navigate("/add_permission", {
            state: {
              id: res.result.id,
            },
          });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Header />
      <TitleBar />
      <SideBar activeIndex={0}>
        <div className="p-5">
          <form onSubmit={addUserHandler}>
            <TextField
              label="First Name"
              placeholder="Type First Name"
              type="text"
              value={firstName}
              onHandleChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              label="Last Name"
              placeholder="Type Last Name"
              type="text"
              value={lastName}
              onHandleChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              label="Email"
              placeholder="Enter Email Address"
              type="email"
              value={email}
              onHandleChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onHandleChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </form>
          <div className="mt-5 d-flex justify-content-end">
            <Button
              className="me-4"
              isGreyButton={true}
              onClickHandler={() => navigate("/users_list")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClickHandler={addUserHandler}
              disabled={!validateAll() || isLoading}
            >
              Create
            </Button>
          </div>
        </div>
      </SideBar>
    </>
  );
};
export default AddUser;
