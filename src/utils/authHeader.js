export const requestOptions = (getState) => {
    // Get token
    const token = getState().auth.access;

    if (token) {
      const config = {
          headers: {
          }
        };
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    }
  
    return {};
};

export const requestFormOptions = (getState) => {
  // Get token
  const token = getState().auth.access;

  if (token) {
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
          // 'X-CSRFTOKEN': CSRF_TOKEN
        }
      };
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }

  return {};
};
  
// export default requestOptions;
