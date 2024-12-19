import React, { useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const CreateEventForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [statusMessages, setStatusMessages] = useState<{ message: string; type: string }[]>([]);
  const [showNameError, setShowNameError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const router = useRouter();
  const { clubId } = router.query;
  const { t } = useTranslation();

  const clearErrors = () => {
    setShowNameError(false);
    setShowDescriptionError(false);
    setShowDateError(false);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!name && name.trim() === "") {
      setShowNameError(true);
      isValid = false;
    }

    if (!description && description.trim() === "") {
      setShowDescriptionError(true);
      isValid = false;
    }

    if (!date && date.trim() === "") {
      setShowDateError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      return;
    }

    const newEvent = {
      name,
      description,
      date,
      clubId,
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setStatusMessages([
          {
            message: errorData.errorMessage || t("general.error"),
            type: "error",
          },
        ]);
        return;
      }

      setStatusMessages([
        {
          message: t("events.create.success"),
          type: "success",
        },
      ]);

      setTimeout(() => {
        router.push(`/clubs/${clubId}`);
      }, 2000);
    } catch (error) {
      setStatusMessages([
        {
          message: t("general.error"),
          type: "error",
        },
      ]);
    }
  };

  return (
    <div className="center-container">
      <h3 className="px-0 login-title">{t("events.create.title")}</h3>
      {statusMessages.length > 0 && (
        <ul className="list-none mb-3 mx-auto">
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
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="form-label">
          {t("events.create.name")}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-field"
          />
          {showNameError && <div className="text-red-800">{t("events.create.validate.name")}</div>}
        </div>
        <label htmlFor="descriptionInput" className="form-label">
          {t("events.create.description")}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="input-field"
          />
          {showDescriptionError && (
            <div className="text-red-800">{t("events.create.validate.description")}</div>
          )}
        </div>
        <label htmlFor="dateInput" className="form-label">
          {t("events.create.date")}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="dateInput"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="input-field"
          />
          {showDateError && <div className="text-red-800">{t("events.create.validate.date")}</div>}
        </div>
        <button className="login-button" type="submit">
          {t("events.create.submit")}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;