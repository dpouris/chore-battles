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
    console.log(err);
    return;
  }
};

export const refreshToken = async (refreshTkn) => {
  try {
    const res = await fetch("http://localhost:8000/api/v1/auth/refresh/", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshTkn }),
      method: "POST",
    });

    const data = await res.json();
    return data.access;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const blackListToken = async (refreshTkn) => {
  try {
    await fetch("http://localhost:8000/api/v1/auth/logout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshTkn }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchChoreList = async (accessTkn) => {
  try {
    const res = await fetch("http://localhost:8000/api/v1/chores/", {
      headers: {
        Authorization: "Bearer " + accessTkn,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err.message;
  }
};
