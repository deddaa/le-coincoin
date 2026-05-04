import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.service";
import Title from "./Title";

function FormLogin() {
     const navigate = useNavigate();

      const [form, setForm] = useState({ email: "", password: "" });
      const [error, setError] = useState(null);

      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await api.post("/auth/login", form);
          console.log(form)
          navigate("/");
          console.log("Login réussi !");  
        } catch (error) {
          setError(error.message);
        }
      };

    return (
      <>
        <Title title="Sign in" />
        <form className="space-y-6 mt-10">
          <div>
            <label
              htmlFor="email"
              className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="lemail@coincoin.fr"
              required
              onChange={handleChange}
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              onChange={handleChange}
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Sign in
          </button>

          <div className="text-slate-900 text-sm text-center dark:text-slate-50">
            Pas de compte ?{" "}
            <a
              href="/Register"
              className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Inscription
            </a>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </>
    );
}

export default FormLogin;