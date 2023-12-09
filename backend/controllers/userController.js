const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// const cloudinary = require("cloudinary");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "myCloud.public_id",
      url: "myCloud.secure_url",
    },
  });
  sendToken(user, 201, res);
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});


// Login User
// exports.loginUser = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHander("Please Enter Email & Password", 400));
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return next(new ErrorHander("Invalid email or password", 401));
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return next(new ErrorHander("Invalid email or password", 401));
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "5d",
//     });

//     const options = {
//       expiresIn: new Date(
//         Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//     };

//     res
//       .status(200)
//       .cookie("token", token, options)
//       .json({
//         user,
//         message: "Login successful!",
//         access_token: token,
//       });
//   } catch (error) {
//     return next(new ErrorHander("Error logging in", 500));
//   }
// });


// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
//Forgot Password
// exports.fotgotPassword = catchAsyncErrors(async (req, res, next) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     return next(new ErrorHander("Invalid email or password", 401));
//   }
//   const token = jwt.sign(
//     {
//       id: user.id,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "5d",
//     }
//   );
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "iamakashcse@gmail.com",
//       pass: "cdgb tpna vhvn evkp",
//     },
//   });

//   var mailOptions = {
//     from: "iamakashcse@gmail.com",
//     to: "adientertainment352@gmail.com",
//     subject: "Reset your password",
//     html:
//       'click here and <a href="http://127.0.0.1:3000/api/v1/reset-password?token=' +
//       token +
//       '"> reset your password</a>',
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       return res.send({ Status: `Email sent to ${user.email} successfully` });
//     }
//   });
// });
// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
//   const {email} = req.body;
//   const tokenData = await User.findOne({ email });
//   if (tokenData) {
//     const password = req.body.password;
//     let salt = bcrypt.genSaltSync(10);
//     const newPassword = await bcrypt.hash(password, salt);
//     const userData = await User.findByIdAndUpdate(
//       { _id: tokenData._id },
//       { $set: { password: newPassword } },
//       { new: true }
//     );
//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "User password had beer reset",
//         data: userData,
//       });
//   }
// });
// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;
  
//   const user = await User.findOne({ email });
  
//   if (user) {
//     const salt = bcrypt.genSaltSync(10);
//     const newPassword = await bcrypt.hash(password, salt);

//     // Generate a reset token (this is an example, adjust as needed)
//     const resetToken = crypto.randomBytes(20).toString('hex');
    
//     // Set the new password and reset token details
//     user.password = newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
    
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "User password has been reset",
//       data: user,
//     });
//   } else {
//     // Handle case where user with the provided email isn't found
//     res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }
// });// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //cloudinary
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });

})
// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});