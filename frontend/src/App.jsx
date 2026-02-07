import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔹 Fetch all users
  const loadUsers = async () => {
    const res = await fetch("/users");   // ✅ FIX
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add user
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/users", {              // ✅ FIX
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", password: "" });
    loadUsers();
  };

  // 🔹 Delete user
  const handleDelete = async (id) => {
    await fetch(`/users/${id}`, {         // ✅ FIX
      method: "DELETE",
    });

    loadUsers();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <br /><br />

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br /><br />

        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br /><br />

        <button type="submit">Add User</button>
      </form>

      <hr />

      <h3>All Users</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
