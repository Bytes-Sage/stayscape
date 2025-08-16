export const BASE_URL = "https://stayscape.theparcel.com.ng/api";

const TokenStorage = {
  setToken(token) {
    localStorage.setItem("accessToken", token);
  },

  getToken() {
    return localStorage.getItem("accessToken");
  },

  removeToken() {
    localStorage.removeItem("accessToken");
  },
};

async function apiFetch(url, options = {}) {
  try {
    const token = TokenStorage.getToken();

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      if (response.status === 401) {
        TokenStorage.removeToken();
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API request failed with status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

export async function registerUser(data) {
  return apiFetch(`${BASE_URL}/account/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data) {
  const response = await apiFetch(`${BASE_URL}/account/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  // Store the token after successful login
  if (response.data.accessToken || response.accessToken) {
    TokenStorage.setToken(response.data.accessToken || response.accessToken);
  }

  return response;
}

export async function createRoom(data) {
  return apiFetch(
    `${BASE_URL}/rooms`,
    { withCredentials: true },
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function updateRoom(roomId, data) {
  return apiFetch(`${BASE_URL}/rooms/${roomId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export async function deleteRoom(roomId, data) {
  return apiFetch(`${BASE_URL}/rooms/${roomId}`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

export async function getRooms() {
  return apiFetch(`${BASE_URL}/rooms`, {
    method: "GET",
  });
}

export function logout() {
  TokenStorage.removeToken();
}
export function isAuthenticated() {
  return !!TokenStorage.getToken();
}

// const BASE_URL = "https://stayscape.theparcel.com.ng/api";

// async function apiFetch(url, options = {}) {
//   try {
//     // Default options that include credentials
//     const defaultOptions = {
//       credentials: 'include', // This enables cookies to be sent and received
//       headers: {
//         "Content-Type": "application/json",
//         ...options.headers, // Merge with any custom headers
//       },
//       ...options, // Merge with any other options
//     };

//     const response = await fetch(url, defaultOptions);

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(
//         errorData.message ||
//           `API request failed with status: ${response.status}`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Fetch Error:", error);
//     throw error;
//   }
// }

// export async function registerUser(data) {
//   return apiFetch(`${BASE_URL}/account/register`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// export async function loginUser(data) {
//   return apiFetch(`${BASE_URL}/account/login`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// export async function createRoom(data) {
//   return apiFetch(`${BASE_URL}/rooms`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// export async function updateRoom(roomId, data) {
//   return apiFetch(`${BASE_URL}/rooms/${roomId}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });
// }

// // Example of a GET request function
// export async function getRooms() {
//   return apiFetch(`${BASE_URL}/rooms`, {
//     method: "GET",
//   });
// }

// // If you need to make a request without cookies for some reason
// export async function apiRequestWithoutCookies(url, options) {
//   return apiFetch(url, {
//     ...options,
//     credentials: 'omit', // This will exclude cookies
//   });
// }

// const BASE_URL = "https://stayscape.theparcel.com.ng/api";

// async function apiFetch(url, options) {
//   try {
//     const response = await fetch(url, options);

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(
//         errorData.message ||
//           `API request failed with status: ${response.status}`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Fetch Error:", error);
//     throw error;
//   }
// }

// export async function registerUser(data) {
//   return apiFetch(`${BASE_URL}/account/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// }

// export async function loginUser(data) {
//   return apiFetch(`${BASE_URL}/account/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// }

// export async function createRoom(data) {
//   return apiFetch(`${BASE_URL}/rooms`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${token}`, // Include the auth token
//     },
//     body: JSON.stringify(data),
//   });
// }

// export async function updateRoom(roomId, data, token) {
//   return apiFetch(`${BASE_URL}/rooms/${roomId}`, {
//     method: "PUT", // Use PUT or PATCH for updates, depending on the API spec
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, // Include the auth token
//     },
//     body: JSON.stringify(data),
//   });
// }
