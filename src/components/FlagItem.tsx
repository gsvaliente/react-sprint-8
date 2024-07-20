import { useTranslation } from "react-i18next";

interface FlagItemProps {
  countryCode: string;
  lang: string;
}

export function FlagItem({ countryCode, lang }: FlagItemProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div onClick={() => changeLanguage(lang)}>
      <img
        src={countryCode}
        alt={countryCode}
        className="size-7 rounded-lg hover:border hover:border-stone-200 sm:size-10"
      />
    </div>
  );
}
