// import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import bob from "../images/BOB_CMYK_complogo-01.webp";
// import "./Login.css";

// import loginImage from "../images/mandir.webp";

// const Login = () => {
//   const navigate = useNavigate();

//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [change, setChange] = useState(false);

//   const [userData] = useState({
//     id: "admin",
//     password: "123",
//   });

//   // localStorage
//   let user = localStorage.getItem("user");

//   useEffect(() => {
//     if (user) {
//       navigate("/billing");
//     }
//   }, [user, change, navigate]);

//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (userData.id !== id) {
//       return alert("User not found");
//     }
//     if (userData.password !== password) {
//       return alert("User and password doesn't match");
//     }
//     localStorage.setItem("user", true);
//     setChange(!change);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "absolute",
//         top: "0",
//         left: "0",
//         zIndex: "9999",
//         backgroundColor: "#fafbfb",
//       }}
//     >
//       <Box sx={{ my: 3 }}>
//         <Typography
//           variant="h5"
//           sx={{
//             color: "eighth.main",
//             textAlign: "center",
//             mb: 2,
//           }}
//         >
//           SMT LAXMIBAI DAGDUSHETH HALWAI DATTA MANDIR TRUST
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { sm: "1fr 1.5fr", xs: "1fr" },
//             gap: 2,
//             maxWidth: "700px",
//             alignItems: "center",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow:
//               "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
//             overflow: "hidden",
//           }}
//         >
//           {/* side image login left side */}
//           <img src={loginImage} className="loginImg" alt="loginImage" />

//           {/* login form right site  */}
//           <div>
//             <Box component="form" onSubmit={submitHandler}>
//               <Box sx={{ p: 4 }}>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     color: "eighth.main",
//                   }}
//                 >
//                   Billing Software Login
//                 </Typography>

//                 <FormControl sx={{ display: "block", my: 2 }}>
//                   <TextField
//                     required
//                     value={id}
//                     onChange={(e) => setId(e.target.value)}
//                     fullWidth
//                     id="id"
//                     color="eighth"
//                     size="small"
//                     placeholder="Username"
//                   />
//                 </FormControl>
//                 <FormControl sx={{ display: "block", my: 2 }}>
//                   <TextField
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     fullWidth
//                     id="password"
//                     color="eighth"
//                     size="small"
//                     type="password"
//                     placeholder="Password"
//                   />
//                 </FormControl>

//                 <Box sx={{ mt: 3, textAlign: "center" }}>
//                   <Button
//                     variant="contained"
//                     sx={{ px: 6, textTransform: "capitalize" }}
//                     type="submit"
//                     color="eighth"
//                     disableElevation
//                   >
//                     {" "}
//                     Login
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </div>
//         </Box>

//         <Box sx={{ textAlign: "center", mt: 3 }}>
//           <Typography paragraph sx={{ color: "eighth.main", mb: 0 }}>
//             powered by
//           </Typography>
//           <img src={bob} style={{ maxWidth: "200px" }} alt="logo" />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bob from "../images/BOB_CMYK_complogo-01.webp";
import ReCAPTCHA from "react-google-recaptcha";
import Hcaptcha from "react-hcaptcha";

import loginImage from "../images/mandir.webp";

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const [userData] = useState([
    {
      id: "admin",
      password: "Dattamandir@admin456",
      role: "admin",
    },
    {
      id: "accountant",
      password: "456",
      role: "accountant",
    },
  ]);
  let user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      navigate("/billing");
    }
  }, [user, change, navigate]);

  const setCookie = (name, value, secure = false) => {
    const cookieOptions = {
      path: "/",
      sameSite: "lax",
      // Set the HTTPOnly flag to prevent client-side JavaScript from accessing the cookie
      httpOnly: true,
    };

    // If the application is accessed over HTTPS, set the secure flag
    if (window.location.protocol === "https:") {
      cookieOptions.secure = true;
    }

    const cookieString = Object.entries(cookieOptions)
      .map(([key, val]) => `${key}=${val}`)
      .join("; ");

    document.cookie = `${name}=${value}; ${cookieString}`;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const currentUser = userData.find((u) => u.id === id);
    if (!captchaToken) {
      alert("Please complete the captcha!");
      return;
    }
    if (!currentUser) {
      return alert("User and password not found");
    }
    if (currentUser.password !== password) {
      return alert("User and password not found");
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ id: currentUser.id, role: currentUser.role })
    );
    setChange(!change);
    setCookie(
      "user",
      JSON.stringify({ id: currentUser.id, role: currentUser.role }),
      true
    );
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "9999",
        backgroundColor: "#fafbfb",
      }}
    >
      <Box sx={{ my: 3 }}>
        <Typography
          variant="h5"
          sx={{
            color: "eighth.main",
            textAlign: "center",
            mb: 2,
          }}
        >
          SMT Laxmibai Dagdusheth Halwai Datta Mandir Trust
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1.5fr", xs: "1fr" },
            gap: 2,
            maxWidth: "700px",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            overflow: "hidden",
          }}
        >
          {/* side image login left side */}
          <img src={loginImage} className="loginImg" alt="loginImage" />

          {/* login form right site  */}
          <div>
            <Box component="form" onSubmit={submitHandler} autocomplete="off">
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "eighth.main",
                  }}
                >
                  Billing Software Login
                </Typography>

                <FormControl sx={{ display: "block", my: 2 }}>
                  <TextField
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    fullWidth
                    id="id"
                    color="eighth"
                    size="small"
                    placeholder="Username"
                    autocomplete="off"
                  />
                </FormControl>
                <FormControl sx={{ display: "block", my: 2 }}>
                  <TextField
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    id="password"
                    color="eighth"
                    size="small"
                    type="password"
                    placeholder="Password"
                    autocomplete="off"
                  />
                </FormControl>
                <Hcaptcha
                  sitekey="29c1c5da-4977-472a-be41-6862ba94aa36"
                  onVerify={handleCaptchaChange}
                />

                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ px: 6, textTransform: "capitalize" }}
                    type="submit"
                    color="eighth"
                    disableElevation
                  >
                    {" "}
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography paragraph sx={{ color: "eighth.main", mb: 0 }}>
            powered by
          </Typography>
          <img src={bob} style={{ maxWidth: "200px" }} alt="logo" />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
