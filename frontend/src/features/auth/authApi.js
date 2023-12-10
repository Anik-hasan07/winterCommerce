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

    console.log('Response:', response.data); 
    return response.data; 
  } catch (error) {
    console.error('Error:', error.message); 
    throw error; 
  }
}


export function loadUser() {
  const serverURL = "http://localhost:4000";
  
  return axios.get(`${serverURL}/api/v1/me`)
  .then(response => {
    return { data: response.data };
  })
  .catch(error => {
    throw error;
  });
}



export function logoutUser() {
  const serverURL = "http://localhost:4000";
  
  return axios.get(`${serverURL}/api/v1/logout`)
  .then(response => {
    return { data: response.data };
  })
  .catch(error => {
    throw error;
  });
}


export function updateUser(name,email) {
  const serverURL = "http://localhost:4000";
  
  return axios.put(`${serverURL}/api/v1/me/update`, { name,email},{
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    return { data: response.data };
  })
  .catch(error => {
    throw error;
  });
}


