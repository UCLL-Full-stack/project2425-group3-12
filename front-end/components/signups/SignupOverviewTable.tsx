import React from "react";
import { Event } from "@types";

type Props = {
  event: Event;
};

const SignupOverviewTable: React.FC<Props> = ({ event }: Props) => {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
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