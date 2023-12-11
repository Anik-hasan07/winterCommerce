import axios from "axios";


//updae password
export function updatePassword(passwords) {
  const serverURL = "http://localhost:4000";
  
  return axios.put(`${serverURL}/api/v1/password/update`, passwords,{
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    return { data: response.data };
  })
  .catch(error => {
    throw error;
  });
}


//forgot password
export function forgotPassword(email) {
  const serverURL = "http://localhost:4000";
  
  return axios.post(`${serverURL}/api/v1/password/forgot`, email,{
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    return { data: response.data };
  })
  .catch(error => {
    throw error;
  });
}





