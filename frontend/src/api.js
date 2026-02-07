const BASE_URL = "/users";

export const getUsers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addUser = async (user) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
