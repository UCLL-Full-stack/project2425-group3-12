import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      setNameError(t('login.validate.name'));
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError(t('login.validate.password'));
      result = false;
    }

    return result;
  };

  //mogelijke oplossingen:
    // event  
    // event: React.FormEvent<HTMLFormElement>
    // event: { preventDefault: () => void; }
  const handleSubmit = async (event: { preventDefault: () => void; }) => {    
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { username: name, password};
    const response = await UserService.loginUser(user);

    if(response.status === 200){
      setStatusMessages([
        {
          message: t("login.success"),
          type: "success",
        },
      ]);

      const user = await response.json();

      localStorage.setItem(
        "loggedInUser", 
        JSON.stringify({ 
          token: user.token, 
          fullname: user.fullname, 
          username: user.username, 
          role: user.role
        })
      );

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (response.status === 401){
      const { errorMessage } = await response.json();
      setStatusMessages([{ message: errorMessage, type: 'error'}])
    } else {
      setStatusMessages([
        {
          message: t('general.error'),
          type: 'error'
        }
      ])
    }
  };

  const { t } = useTranslation();

  return (
    <>
      {/* <div className="center-container"> */}
      {/* <div className="login-form-wrapper"></div> */}
      <h3 className="px-0 login-title">{t('login.title')}</h3>
      <div className="center-container">
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="nameInput" className=" block mb-2 text-sm font-medium"> */}
        <label htmlFor="nameInput" className="form-label">
          {t('login.label.username')}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            // className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            className="input-field"
          />
          {nameError && <div className="text-red-800 ">{nameError}</div>}
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              // className="block mb-2 text-sm font-medium"
              className="form-label"
            >
              {t('login.label.password')}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              // className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              className="input-field"
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
        </div>
        <button
          // className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          className="login-button"
          type="submit"
        >
          {t('login.button')}
        </button>
      </form>
    </div>
    </>
  );
};

export default UserLoginForm;