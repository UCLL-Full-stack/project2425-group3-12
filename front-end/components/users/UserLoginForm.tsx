// import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    //reset errors and status messages
    setNameError("");
    
    setStatusMessages([]);
    // setStatusMessages(null);
  };

  const validate = (): boolean => {
    let result = true;
    clearErrors();

    if (!name && name.trim() === "") {
      // set error / throw error
      setNameError("Name cannot be empty.")
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if(!validate()) {
      return;
    }

    sessionStorage.setItem("loggedInUser", name);
    setStatusMessages([{ type: "success", message: "Login successful. Redirecting to homepage..." }]);
    setTimeout(() => {
      router.push("/");
    }, 2000);
    //check loggedInUser in browser with inspect => application => Session storage => localhost
  }

  return (
    <>
      <h3 className="px-0">Login</h3>
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
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Username:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;
