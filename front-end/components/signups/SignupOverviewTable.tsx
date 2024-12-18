import React from "react";
import { Event } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
  event: Event;
};

const SignupOverviewTable: React.FC<Props> = ({ event }: Props) => {

  const { t } = useTranslation();

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">{t('signup.firstname')}</th>
            <th scope="col">{t('signup.lastname')}</th>
            <th scope="col">{t('signup.email')}</th>
          </tr>
        </thead>
        <tbody>
          {event.participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.user.firstName}</td>
              <td>{participant.user.lastName}</td>
              <td>{participant.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SignupOverviewTable;