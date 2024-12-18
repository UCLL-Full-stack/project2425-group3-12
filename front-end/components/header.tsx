import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {" "}
        Game Club App
      </a>
      <nav className="nav justify-content-center">
        {/* <Link href="/" className="nav-link px-4 fs-5 text-white"> */}
        <Link href="/" className="header-button">
          Home
        </Link>
        {/* <Link href="/clubs" className="nav-link px-4 fs-5 text-white"> */}
        <Link href="/clubs" className="header-button">
          Clubs
        </Link>
        {/* <Link href="/events" className="nav-link px-4 fs-5 text-white"> */}
        <Link href="/events" className="header-button">
          Events
        </Link>

        {/* when logged out */}
        {!loggedInUser && (
          <Link
            href="/login"
            // className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
            className="header-button"
          >
            Login
          </Link>
        )}

         {/* when logged in */}
        {loggedInUser && (
          <a
            href="#"
            // className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
            className="header-button"
            onClick={handleClick}
          >
            Logout
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            Welcome, {loggedInUser}!
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
