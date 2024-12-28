import { Link } from "react-router-dom";
import { useAuthContext } from "../authcontext/AuthContext"; // Adjust the path if necessary
import Cookies from "js-cookie"; // Import js-cookie for reading cookies

const Navbar = ({ unreadNotifications }) => {  // Accept unreadNotifications as a prop
  const { authUser } = useAuthContext(); // Get the user from context
  const tokenFromCookies = Cookies.get("token"); // Retrieve token from cookies

  // Check if the user is authenticated
  const isAuthenticated = authUser || tokenFromCookies;

  return (
    <div>
      <div className="wrapper z-50 fixed bottom-0 left-0 right-0 bg-white border">
        <nav>
          <ul className="flex justify-evenly items-center h-[90px]">
            <li className="duration-200 hover:text-green-400 hover:-translate-y-1">
              <Link to="/" className="flex flex-col items-center">
                <i className="fa-solid fa-house text-xl"></i>
                <span className="font-[300] max-[400px]:text-sm">Home</span>
              </Link>
            </li>
            <li className="duration-200 hover:text-green-400 hover:-translate-y-1">
              <Link to="/notification" className="flex flex-col items-center">
                <i className="fa-solid fa-bell text-xl relative">
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                      {unreadNotifications}
                    </span>
                  )}
                </i>
                <span className="font-[300] max-[400px]:text-sm">Notification</span>
              </Link>
            </li>
            <li className="duration-200 hover:text-green-400 hover:-translate-y-1">
              <Link to="/account" className="flex flex-col items-center">
                <i className="fa-solid fa-user text-xl"></i>
                <span className="font-[300] max-[400px]:text-sm">
                  {isAuthenticated ? "Profile" : "Login"}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
