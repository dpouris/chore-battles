export const fetchUserDetails = async (user_id, accessTkn) => {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessTkn,
      },
      method: "GET",
    });
    const data = await res.json();
    return { ...data };
  } catch (err) {
    return err.message;
  }
};

export const refreshToken = async (refreshTkn) => {
  const res = await fetch("http://localhost:8000/api/v1/auth/refresh/", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshTkn }),
    method: "POST",
  });

  const data = await res.json();

  data.refresh && localStorage.setItem("refresh", data.refresh);
  data.access && localStorage.setItem("access", data.access);
  !data.access && localStorage.removeItem("refresh");
};

export const blackListToken = async (refreshTkn) => {
  await fetch("http://localhost:8000/api/v1/auth/logout/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshTkn }),
  });
  return;
};

export const newFetch = async (toFetch, options) => {
  const accessTkn = localStorage.getItem("access");
  options = options || null;

  const res = await fetch(`http://localhost:8000/api/v1/${toFetch}/`, {
    ...options,
    headers: {
      Authorization: "Bearer " + accessTkn,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
