import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { UserData } from "../data/userData";
import Input from "../components/Input";
import Button from "../components/Button";
import { HOME_ROUTE } from "../constants/navigationConstants";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [retry, setRetry] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserId, setIsAdmin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  function handleClick(e) {
    e.preventDefault();
    let user = UserData.find((data) => {
      return data.name === userName && data.password === password;
    });

    if (user) {
      setIsAuthenticated(true);
      setUserId(user.id);
      if (user.isAdmin) setIsAdmin(true);
      navigate(HOME_ROUTE);
    } else {
      setRetry(false);
      setTimeout(() => {
        setRetry(true);
      }, 100);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center font-mono overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div 
        className={`bg-gray-200 bg-opacity-90 rounded-lg shadow-xl p-6 w-96 transition-all duration-700 transform ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h3 className="text-xl text-center font-bold mb-4 relative">
          Login to Proceed
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-700 ease-in-out" 
                style={{ transformOrigin: "left", transform: fadeIn ? "scaleX(1)" : "scaleX(0)" }} />
        </h3>
        
        <form onSubmit={handleClick} className="space-y-4">
          <div className={`flex gap-4 items-center justify-between transition-all duration-500 ${fadeIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
               style={{ transitionDelay: "200ms" }}>
            <label className="text-lg font-semibold">Username:</label>
            <Input
              type="text"
              name="userName"
              content="Enter Your Name"
              change={(e) => setUserName(e.target.value)}
            />
          </div>
          
          <div className={`flex gap-4 items-center justify-between transition-all duration-500 ${fadeIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
               style={{ transitionDelay: "400ms" }}>
            <label className="text-lg font-semibold">Password:</label>
            <Input
              type="password"
              name="password"
              content="Enter Password"
              change={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className={`flex items-center justify-between mt-4 transition-all duration-500 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
               style={{ transitionDelay: "600ms" }}>
            <p className="text-lg border rounded-lg px-3 py-1 shadow cursor-pointer hover:bg-gray-300 transition-colors duration-300 hover:text-blue-600">
              Forgot password?
            </p>
            <Button title="Login" />
          </div>
          
          {retry && (
            <p className="text-red-500 text-center mt-2 animate-pulse">
              Wrong Credentials, Retry!
            </p>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}