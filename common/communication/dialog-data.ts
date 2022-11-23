import { Jardin } from "../tables/Jardin";
import { Parcelle } from "../tables/Parcelle";
import { VarieteContenuDansUnRang } from '../tables/VarieteContenuDansUnRang';
import { Variete } from "../tables/Variete";

export interface DialogData {
  jardin: Jardin;
  parcelles: Parcelle[];
  varietesInRangs: VarieteContenuDansUnRang[];
  variete: Variete;
  pending: boolean;
  success: boolean;
  update: boolean;
  delete: boolean;
  prodInsertError: boolean;
  adaptInsertError: boolean;
}
