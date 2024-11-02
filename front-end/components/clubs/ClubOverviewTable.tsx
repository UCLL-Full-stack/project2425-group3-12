import React from "react";
import { Club } from "@types";

type Props = {
  clubs: Array<Club>;
};

const ClubOverviewtable: React.FC<Props> = ({ clubs }: Props) => {
  return (
    <>
      {clubs && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">organiser</th>
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
