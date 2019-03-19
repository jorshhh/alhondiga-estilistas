
const api = {
  backend: { 
    staging: {
      root: 'http://107.170.233.83/api/',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    endpoint: {
      login: {
        name: 'login',
        method: 'POST',
      },
      getLocations: {
        name: 'location',
        method: 'GET',
      },
      createLocation: {
        name: 'location',
        method: 'PUT',
      },
      updateLocation: {
        name: id => `location/${id}`,
        method: 'POST',
      },
      deleteLocation: {
        name: id => `location/${id}`,
        method: 'DELETE',
      },
    },
    response: {
      unauthorized: 401,
      refresh: 401,
      forbidden: 403,
    },
  },
};

export default api;