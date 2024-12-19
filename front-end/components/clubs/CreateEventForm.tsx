import React, { useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import EventService from "@services/EventService";
import { Club, Member} from "@types";
import ClubService from "@services/ClubService";

const CreateEventForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState<string>();

  const [statusMessages, setStatusMessages] = useState<{ message: string; type: string }[]>([]);
  
  const [showNameError, setShowNameError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);
  
  const router = useRouter();
  const { clubId } = router.query;
  const { t } = useTranslation();

  const clearErrors = () => {
    setError("");
    setShowNameError(false);
    setShowDescriptionError(false);
    setShowLocationError(false);
    setShowDateError(false);
    setShowTimeError(false);
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

    if (!location && location.trim() === "") {
        setShowLocationError(true);
        isValid = false;
      }

    if (!date && date.trim() === "") {
      setShowDateError(true);
      isValid = false;
    }

    if (!time && time.trim() === "") {
        setShowTimeError(true);
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

    // Ensure clubId is treated as a string
    if (!clubId || Array.isArray(clubId)) {
        throw new Error("Invalid clubId"); // Handle the error case explicitly
    }

    const clubResponse = await ClubService.getClubById(clubId);
    const club: Club = await clubResponse.json();

    const members: Member[] = [];

    const newEvent = {
      title: name,
      description: description,
      location: location,
      date: new Date(date),
      time: Number(time),
      participants: members,
      club: club,
    };

    const response = await EventService.createNewEvent(newEvent);

    try {
    //   const response = await fetch("/api/events", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
        // body: JSON.stringify(newEvent),
    //   });

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

      if(response.status === 200){
        setStatusMessages([
            {
            message: t("events.create.success"),
            type: "success",
            },
      ]);
    };

      setTimeout(() => {
        router.push(`/events`);
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
      <h3 className="px-0 login-title"></h3>
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
                {t('clubs.create.form.name')}
            </label>
            <div className="block mb-2 text-sm font-medium">
                <input
                    id="nameInput"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="input-field"
                />
                {showNameError && <div className="text-red-800 ">{t('clubs.create.form.validate.name')}</div>}
            </div>

            <label htmlFor="descriptionInput" className="form-label">
                {t('clubs.create.form.description')}
            </label>
            <div className="block mb-2 text-sm font-medium">
                <input
                    id="descriptionInput"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="input-field"
                />
                {showNameError && <div className="text-red-800 ">{t('clubs.create.form.validate.description')}</div>}
            </div>

            <label htmlFor="locationInput" className="form-label">
                {t('clubs.create.form.location')}
            </label>
            <div className="block mb-2 text-sm font-medium">
                <input
                    id="locationInput"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="input-field"
                />
                {showNameError && <div className="text-red-800 ">{t('clubs.create.form.validate.location')}</div>}
            </div>

            <label htmlFor="dateInput" className="form-label">
                {t('events.create.form.date')}
            </label>
            <div className="block mb-2 text-sm font-medium">
                <input
                    id="dateInput"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="input-field"
                />
                {showDateError && <div className="text-red-800">{t('events.create.form.validate.date')}</div>}
            </div>

            <label htmlFor="timeInput" className="form-label">
                {t('events.create.form.time')}
            </label>
            <div className="block mb-2 text-sm font-medium">
                <input
                    id="timeInput"
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="input-field"
                />
                {showTimeError && <div className="text-red-800">{t('events.create.form.validate.time')}</div>}
            </div>
            
            <button className="login-button" type="submit">
            {t("events.create.submit")}
            </button>
        </form>
    </div>
  );
};

export default CreateEventForm;