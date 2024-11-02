import { Club } from "@types";

type Props = {
  club: Club | null;
};

const ClubDetails: React.FC<Props> = ({ club }: Props) => {
  return (
    <>
      <h2>Club Details</h2>
      {club && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{club.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{club.name}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{club.description}</td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{club.type}</td>
            </tr>
            <tr>
              <td>Members:</td>
              <td>
                <ul>
                  {club.members.map((member) => (
                    <li key={member.id}>
                      {member.user.firstName} {member.user.lastName}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Organiser:</td>
              <td>
                {club.organiser.user.firstName} {club.organiser.user.lastName}
              </td>
            </tr>
            <tr>
              <td>Events:</td>
              <td>
                <ul>
                  {club.events.map((event) => (
                    <li key={event.id}>{event.title}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default ClubDetails;
