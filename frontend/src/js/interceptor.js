const BASE_URL = 'http://localhost:3001/api/';

async function customFetch(url, options = {}) {
  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  // Add Authorization header if access token exists
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(BASE_URL + url, { ...options, headers });

  // If token expired, try refreshing
  if (response.status === 401) {
    const errorData = await response.json().catch(() => ({}));

    if (errorData.message === 'jwt expired') {
      try {
        const refreshResponse = await fetch(
          'http://localhost:3001/auth/refresh-token',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          }
        );

        if (!refreshResponse.ok) throw new Error('Refresh failed');

        const data = await refreshResponse.json();

        // Save new tokens
        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);

        // Retry the original request with the new token
        const retryHeaders = {
          ...headers,
          Authorization: `Bearer ${data.accessToken}`,
        };

        response = await fetch(BASE_URL + url, { ...options, headers: retryHeaders });
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        window.location.reload();
      }
    }
  }

  return response;
}

export default customFetch;