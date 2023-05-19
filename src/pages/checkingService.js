// checkService.js

// Function to fetch user data from the API
function getUserData(username, password) {
  const url = 'https://localhost:7162/api/User/GetUserData"';

  // Create the request body
  const body = {
    username: username,
    password: password
  };

  // Fetch user data from the API
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw error;
    });
}

export { getUserData };