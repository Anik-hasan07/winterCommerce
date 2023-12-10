// import { Fragment, useState, useEffect } from "react";
// import "./UpdateProfile.css";
// import Loader from "../layout/Loader/Loader";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import { useNavigate } from 'react-router-dom';
// import FaceIcon from '@mui/icons-material/Face';
// import { useDispatch, useSelector } from "react-redux";

// import MetaData from "../layout/MetaData";
// import { resetUpdateStatus, setError, updateUserAsync } from "../../features/auth/authSlice";


// const UpdateProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const error = useSelector((state) => state.auth.error);
//   const user = useSelector((state) => state.auth.user);
//   const isUpdated = useSelector((state) => state.auth.isUpdated);
//   const status = useSelector((state) => state.auth.status);


//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");


//   const updateProfileSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     dispatch(updateUserAsync(myForm));
//   };



//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//     }

//     if (error) {
    
//       dispatch(setError());
//     }

//     if (isUpdated) {

//       dispatch(updateUserAsync());

//       navigate("/account");

//       dispatch(resetUpdateStatus());
//     }
//   }, [dispatch, user, isUpdated, navigate, error]);
//   return (
//     <Fragment>
//       {status==="loading" ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="Update Profile" />
//           <div className="updateProfileContainer">
//             <div className="updateProfileBox">
//               <h2 className="updateProfileHeading">Update Profile</h2>

//               <form
//                 className="updateProfileForm"
//                 encType="multipart/form-data"
//                 onSubmit={updateProfileSubmit}
//               >
//                 <div className="updateProfileName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="updateProfileEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

                
//                 <input
//                   type="submit"
//                   value="Update"
//                   className="updateProfileBtn"
//                 />
//               </form>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default UpdateProfile;

import { Fragment, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';

import MetaData from "../layout/MetaData";
import { resetUpdateStatus, setError, updateUserAsync } from "../../features/auth/authSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const isUpdated = useSelector((state) => state.auth.isUpdated);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const status = useSelector((state) => state.auth.status);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (user||isAuthenticated) {
      setValue("name", user.name);
      setValue("email", user.email);
    }

    if (error) {
      dispatch(setError());
    }

    if (isUpdated) {
      navigate("/account");
      dispatch(resetUpdateStatus());
    }
  }, [dispatch, user, isUpdated, navigate, error, setValue, isAuthenticated]);

  // const onSubmit = (data) => {
  //   const myForm = new FormData();
  //   myForm.set("name", data.name);
  //   myForm.set("email", data.email);
  //   dispatch(updateUserAsync(myForm));
  // };
  const onSubmit = (data) => {
    console.log("data-----",data) ;
    dispatch(updateUserAsync({ name: data.name, email: data.email}));
  };

  return (
    <Fragment>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span>Name is required</span>}
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>Email is required</span>}
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
