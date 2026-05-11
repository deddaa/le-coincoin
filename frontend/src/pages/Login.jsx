import { Link } from "react-router-dom";
import FormLogin from "../components/FormLogin/FormLogin";
function Login() {

  return (
    <>
      <main className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-md w-full">
            <div className="flex justify-center align-middle mb-15">
              <Link
                to="/"
                className="text-6xl font-bold text-gray-900 tracking-tight"
              >
                Le <span className="text-purple-600">CoinCoin</span>
              </Link>
            </div>
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
              <FormLogin />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
