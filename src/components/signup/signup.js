import React from "react";
import "./signup.css";
import { Link, useHistory } from "react-router-dom";
// import M from "materialize-css";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormHelperText } from "@material-ui/core";
import api from '../../api.js'

export default function Signup() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Email: "",
      PasswordAgain: "",
      password: "",
    },

    validationSchema: yup.object({
      Password: yup
        .string()
        .max(40, "Password too long")
        .required("Please Enter a password")
        .min(6, "Password must be at least 6 charecters"),

      Email: yup
        .string()
        .email("Invalid email address")
        .required("Please Enter Email Address"),

      UserName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40, "Username is too long")
        .required("Please Enter a username")
        .min(6, "username should contain atleast 6 charecters"),

      PasswordAgain: yup
      
      .string()
      .required("please confirm your password")
      .when("Password", {
          is: val => (val && val.length > 0 ? true : false),
          then: yup.string().oneOf(
            [yup.ref("Password")],
            "Password must be match"
          )
        }),
     PhoneNumber: yup.string()
    .required("Phone number is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "Please Enter A Valid Phone Number"
    ),
    }),

    onSubmit: (userInfo) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };
      console.log(userInfo);
      fetch(api+"/api/v1/signUp", requestOptions)
        .then(response => response.json())
        .then((data) => {
          // alert(data);

          if (data.error) {
            document.getElementById("error").innerHTML = data.error;
          } else {
            document.getElementById("error").innerHTML = data.message;
            history.push("/login");
          }
        });
    },
  });
  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <img className="home-image" src="/assets/Theme-image.svg"  alt=""/>
            {/* <h3 className="loginLogo">Singram</h3> */}
            <span className="loginDesc">Express...Explore....</span>
          </div>
          <div className="loginRight">
            
              {/* <div className="card LoginCard input-field">
          <form onSubmit={formik.handleSubmit}>
        <h2>LOGO</h2>
        <input
          type="text"
          placeholder="UserName"
          {...formik.getFieldProps("UserName")}
        ></input>
        <FormHelperText>
              {formik.touched.UserName && formik.errors.UserName ? (
                <span style={{ color: "red" }}>{formik.errors.UserName}</span>
              ) : (
                <span>Enter your User name</span>
              )}
            </FormHelperText>


        <input
          type="text"
          placeholder="Email"
          {...formik.getFieldProps("Email")}
        ></input>
        <FormHelperText>
              {formik.touched.Email && formik.errors.Email ? (
                <span style={{ color: "red" }}>{formik.errors.Email}</span>
              ) : (
                <span>We'll never share your email. </span>
              )}
            </FormHelperText>
        <input
          type="text"
          placeholder="Contact Number"
         
        ></input>
        <input
          type="text"
          placeholder="Password"
          {...formik.getFieldProps("Password")}
        ></input>
        <FormHelperText>
              {formik.touched.Password && formik.errors.Password ? (
                <span style={{ color: "red" }}>{formik.errors.Password}</span>
              ) : (
                <span>Enter Your Password</span>
              )}
            </FormHelperText>
            <input
          type="text"
          placeholder="PasswordAgain"
          {...formik.getFieldProps("PasswordAgain")}
        ></input>
        <FormHelperText>
              {formik.touched.PasswordAgain && formik.errors.PasswordAgain ? (
                <span style={{ color: "red" }}>{formik.errors.PasswordAgain}</span>
              ) : (
                <span>Re-enter password</span>
              )}
            </FormHelperText>
        <button
          className="btn btn-primary #212121 grey darken-4"
          type="submit"
        >
          Sign up
        </button>
        <p>
          <Link to="/login">already have an account? sign in</Link>
        </p>
        </form>
      </div> */}
              
              <form onSubmit={formik.handleSubmit}  className="loginBox">
              <span style={{ color: "red"}} id="error"></span>
                <input
                  placeholder="Username"
                  {...formik.getFieldProps("UserName")}
                  className="loginInput"
                />
                <FormHelperText>
                  {formik.touched.UserName && formik.errors.UserName ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.UserName}
                    </span>
                  ) : (
                    <span>Enter your User name</span>
                  )}
                </FormHelperText>

                <input
                  placeholder="Email"
                  {...formik.getFieldProps("Email")}
                  className="loginInput"
                />
                <FormHelperText>
                  {formik.touched.Email && formik.errors.Email ? (
                    <span style={{ color: "red" }}>{formik.errors.Email}</span>
                  ) : (
                    <span>We'll never share your email. </span>
                  )}
                </FormHelperText>
                <input
                  placeholder="PhoneNumber"
                  {...formik.getFieldProps("PhoneNumber")}
                  className="loginInput"
                />
                <FormHelperText>
                  {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
                    <span style={{ color: "red" }}>{formik.errors.PhoneNumber}</span>
                  ) : (
                    <span>We'll never share your phone number. </span>
                  )}
                </FormHelperText>
                <input
                  placeholder="Password"
                  {...formik.getFieldProps("Password")}
                  className="loginInput"
                />
                <FormHelperText>
                  {formik.touched.Password && formik.errors.Password ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.Password}
                    </span>
                  ) : (
                    <span>Enter Your Password</span>
                  )}
                </FormHelperText>
                <input
                  placeholder="Password Again"
                  {...formik.getFieldProps("PasswordAgain")}
                  className="loginInput"
                />
                <FormHelperText>
                  {formik.touched.PasswordAgain &&
                  formik.errors.PasswordAgain ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.PasswordAgain}
                    </span>
                  ) : (
                    <span>Re-enter password</span>
                  )}
                </FormHelperText>
                <button className="loginButton" type="submit">
                  Sign Up
                </button>
                <div className="links">

                <Link to="/login">
                Already have a account? sign in</Link>
                </div>
              </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}
