//06:04:05
//2:49


// cdgb tpna vhvn evkp
// my-app
//mongodb+srv://iamakashcse:2jX1DR55F2Nb3HxB@cluster0.gg8unkw.mongodb.net/newCommerce


// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

//     const {id, token} = req.cookies
//     const {password} = req.body
  
//     jwt.verify(token, "JWT_SECRET", (err, decoded) => {
//         if(err) {
//             return res.json({Status: "Error with token"})
//         } else {
//             bcrypt.hash(password, 10)
//             .then(hash => {
//                 User.findByIdAndUpdate({_id: id}, {password: hash})
//                 .then(u => res.send({Status: "Success"}))
//                 .catch(err => res.send({Status: err}))
//             })
//             .catch(err => res.send({Status: err}))
//         }
//     })
   
    
  
  
   
//   });