import  { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../layout/MetaData";
import { forgotPasswordAsync, setError } from "../../features/user/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPasswordAsync(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(setError());
    }

    if (message) {
        toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {status==="loading" ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;