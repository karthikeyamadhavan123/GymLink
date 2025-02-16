import { useState } from "react";
import axios from "axios";

export default function Login() {
//   const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("user");
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("https://your-api-endpoint.com/login", {
        email,
        password,
      });
      
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("An error occurred during login");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
          
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-4 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full mb-4 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-2"
            >
              Login
            </button>
          </form>
        
      </div>
    </div>
  );
}