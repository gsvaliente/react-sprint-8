import es from "../assets/es.svg";
import fr from "../assets/fr.svg";
import gb from "../assets/gb.svg";
import { FlagItem } from "./FlagItem";

export function FlagList() {
  return (
    <ul className="flex cursor-pointer justify-end gap-3">
      <FlagItem countryCode={gb} lang="en" />
      <FlagItem countryCode={es} lang="es" />
      <FlagItem countryCode={fr} lang="fr" />
    </ul>
  );
}
