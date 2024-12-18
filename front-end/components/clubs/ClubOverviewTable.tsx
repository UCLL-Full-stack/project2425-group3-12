import React from "react";
import { Club } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
  clubs: Array<Club>;
};

const ClubOverviewtable: React.FC<Props> = ({ clubs }: Props) => {

  const { t } = useTranslation();

  return (
    <>
      {clubs && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t('clubs.table.overview.name')}</th>
              <th scope="col">{t('clubs.table.overview.description')}</th>
              <th scope="col">{t('clubs.table.overview.type')}</th>
              <th scope="col">{t('clubs.table.overview.organiser')}</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr key={index}>
                <td>{club.name}</td>
                <td>{club.description}</td>
                <td>{club.type}</td>
                <td>
                  {club.organiser.user.firstName.toString() +
                    " " +
                    club.organiser.user.lastName.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ClubOverviewtable;
