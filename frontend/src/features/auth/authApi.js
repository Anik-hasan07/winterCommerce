import axios from "axios";



export function createUser(name,email,password) {
  const serverURL = "http://localhost:4000";
  
  return axios.post(`${serverURL}/api/v1/register`, { name,email, password },{
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    return { data: response.data };
  })
  .catch(error => {
    // Handle error or throw it further if needed
    throw error;
  });
}




export async function loginUser(email, password) {
  const serverURL = 'http://localhost:4000';
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(
      `${serverURL}/api/v1/login`,
      { email, password },
      config
    );

    console.log('Response:', response.data); // Log the response data
    return response.data; // Return data or whatever is expected on success
  } catch (error) {
    console.error('Error:', error.message); // Log the error message
    throw error; // Throw the error to be caught by the caller
  }
}


// export function loginUser(email,password) {
//   const serverURL = "http://localhost:4000";
//   return new Promise(async (resolve, reject) => {
//     const config = {headers: { "content-type": "application/json" }}
//     const response = await axios.post(`${serverURL}/api/v1/login`, {email,password},config);
 
//     console.log("--data",data);
//     resolve({ response });
//   });
// }
//   export function loginUser(loginInfo) {
//     const serverURL = 'http://localhost:4000';
//     return new Promise(async (resolve, reject) => {
//       const email = loginInfo.email;
//       const password = loginInfo.password;
//       const response = await fetch(`${serverURL}/api/v1/login`);
//       const data = await response.json();
//       console.log({data})
//       if (data.length) {
//         if (password === data[0].password) {
//           resolve({ data: data[0] });
//         } else {
//           reject({ message: 'wrong credentials' });
//         }
//       } else {
//         reject({ message: 'user not found' });
//       }
//     });
//   }
