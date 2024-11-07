import React, { useEffect, useState } from "react";
import Loading from "../Components/LoadingError/LoadingError";
import Toast from "../Components/LoadingError/Toast";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../hooks/useMutationHooks";
import Message from "./../Components/LoadingError/Error";
import * as UserService from "../Services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../features/userSlide/userSlide";

import jwt_decode from "jwt-decode";

const Toastobjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Login = () => {
  window.scrollTo(0, 0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false)
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const { email } = userLogin;
  const toastId = React.useRef(null);
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  // const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const mutation = useMutationHooks(
    async (data) => {
      try {
        return await UserService.loginUser(data);
      } catch (error) {
        throw error
      }
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: async (data) => {
        const access_token = data.data.access_token;
        setShowLoader(false);
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Thành công", Toastobjects);
        }
        localStorage.setItem("access_token", JSON.stringify(access_token));
        const res = await UserService.getDetailsUser(access_token);
        dispatch(updateUser({ ...res.data, access_token: access_token }));
        history("/");
      },
      onError: (error) => {
        setShowLoader(false);

        // Extract the error message from the error object
        const errorMessage = error?.message || "Login Failed";
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(errorMessage, Toastobjects);
        }
        // Show the error message in the toast
        // showErrorToast(`Login failed: ${errorMessage}`);
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (username === "" && password === "") {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(
            "Vui lòng điền đẩy đủ thông tin",
            Toastobjects
          );
        }
      } else {
        await mutation.mutateAsync({
          email: username,
          password,
        });
      }
    } catch (error) {
      console.log("🚀 ~ submitHandler ~ error:", error)
      // throw error
    }
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res, access_token: token }));
  };

  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {/* {error && <Message variant="alert-danger">{error}</Message>} */}
          {/* {loading && <Loading />} */}
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
