export function fetchAllProducts() {
    const serverURL = 'http://localhost:4000';
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch(`${serverURL}/api/v1/products`);
      const data = await response.json()
      console.log("-----data",data);
      resolve({data})
    }
    );
  }

export function fetchProductById(id) {
  const serverURL = 'http://localhost:4000';
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch(`${serverURL}/api/v1/product/${id}`); 
      const data = await response.json()
      resolve({data})
    }
    );
  }