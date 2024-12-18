import { Club } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
  club: Club | null;
};

const ClubDetails: React.FC<Props> = ({ club }: Props) => {
  
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('clubs.table.details.title')}</h2>
      {club && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('clubs.table.details.parameter')}</th>
              <th scope="col">{t('clubs.table.details.value')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('clubs.table.details.id')}</td>
              <td>{club.id}</td>
            </tr>
            <tr>
              <td>{t('clubs.table.details.name')}</td>
              <td>{club.name}</td>
            </tr>
            <tr>
              <td>{t('clubs.table.details.description')}</td>
              <td>{club.description}</td>
            </tr>
            <tr>
              <td>{t('clubs.table.details.type')}</td>
              <td>{club.type}</td>
            </tr>
            <tr>
              <td>{t('clubs.table.details.members')}</td>
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
              <td>{t('clubs.table.details.organiser')}</td>
              <td>
                {club.organiser.user.firstName} {club.organiser.user.lastName}
              </td>
            </tr>
            <tr>
              <td>{t('clubs.table.details.events')}</td>
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
