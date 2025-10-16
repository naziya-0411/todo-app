async function fetchAuth(url, options = {}, retry = true) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    window.location.href = "/pages/login";
    return;
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 401 && !retry) {
      const resData = await res.json();
      if (resData.message === "jwt expired") {
        const renewToken = await 
      }
    }
  } catch {}
}
