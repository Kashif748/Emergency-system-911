import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";


export interface RtoStateModel {
  page: BcActivityFrequencies[];
  rto: BcActivityFrequencies;
  loading: boolean;
  blocking: boolean;
}
