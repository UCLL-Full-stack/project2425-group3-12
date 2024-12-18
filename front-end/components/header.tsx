import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "@components/language/Language";
import { useTranslation } from "next-i18next";
import { User } from "@types";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<String | null>(null);
  // const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  // useEffect(() => {
  //   setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  // }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  const { t } = useTranslation();

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {" "}
        {t('header.title')}
      </a>
      <nav className="nav justify-content-center">
        {/* <Link href="/" className="nav-link px-4 fs-5 text-white"> */}
        <Link href="/" className="header-button">
          {t('header.nav.home')}
        </Link>
        {/* <Link href="/clubs" className="nav-link px-4 fs-5 text-white"> */}
        <Link href="/clubs" className="header-button">
        {t('header.nav.clubs')}
        </Link>
        {/* <Link href="/events" className="nav-link px-4 fs-5 text-white"> */}
        <Link href="/events" className="header-button">
        {t('header.nav.events')}
        </Link>

        {/* when logged out */}
        {!loggedInUser && (
          <Link
            href="/login"
            // className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
            className="header-button"
          >
            {t('header.nav.login')}
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
            {t('header.nav.logout')}
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t('header.welcome')}, {loggedInUser}!
          </div>
        )}
        <Language/>
      </nav>
    </header>
  );
};

export default Header;
