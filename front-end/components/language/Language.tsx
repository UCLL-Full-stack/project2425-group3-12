import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    // get new locale from event and push it to the router
    const newLocale = event.target.value;
    const {pathname, asPath, query} = router;
    router.push({pathname, query}, asPath, {locale: newLocale});
  };

  const { t } = useTranslation();
  return (
    <div className="ml-6">
      <label htmlFor="language" className="text-white">
        {t('language')}
      </label>
      <select
        id="language"
        className="ml-2 p-1"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default Language;
