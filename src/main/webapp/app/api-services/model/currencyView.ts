/**
 * Barclays 2022 CBDC Hackathon API
 * API for the Barclays 2022 CBDC Hackathon.  Please ensure you include your API key in the `x-api-key` header for your requests.
 *
 * OpenAPI spec version: 0.0.9
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { CBDCAccountChild } from './cBDCAccountChild';
import { CommercialBankChild } from './commercialBankChild';
import { Currency } from './currency';
import { PIPChild } from './pIPChild';

export interface CurrencyView {
  id?: number;
  status?: CurrencyView.StatusEnum;
  currencyDetails?: Currency;
  cbdcAccounts?: Array<CBDCAccountChild>;
  commercialBanks?: Array<CommercialBankChild>;
  pips?: Array<PIPChild>;
}
export namespace CurrencyView {
  export type StatusEnum = 'ACTIVE' | 'TERMINATED';
  export const StatusEnum = {
    ACTIVE: 'ACTIVE' as StatusEnum,
    TERMINATED: 'TERMINATED' as StatusEnum,
  };
}
