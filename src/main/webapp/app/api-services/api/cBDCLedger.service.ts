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
 */ /* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { BadRequestResponse } from '../model/badRequestResponse';
import { ErrorResponseBody } from '../model/errorResponseBody';
import { GetCBDCAccountResponseBody } from '../model/getCBDCAccountResponseBody';
import { MakeDepositRequestBody } from '../model/makeDepositRequestBody';
import { MakeWithdrawalRequestBody } from '../model/makeWithdrawalRequestBody';
import { NotFoundResponse } from '../model/notFoundResponse';
import { OpenAccountResponseBody } from '../model/openAccountResponseBody';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class CBDCLedgerService {
  protected basePath = 'https://cbdchackathon-dev.barclays.nayaone.com/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   * Deposit a cash amount into the account.
   * Simulation of depositing cash into the account.  &lt;h2&gt; Amount details &lt;/h2&gt;  The amount must be given in the units of the currency (for GBP that means pence, for  USD/EUR: cents, etc.).  For example if you wanted £1/$1/€1 to be the amount you would give the value 100 (as the value refers to the amount of pence/cents).
   * @param body
   * @param xEnvId Identifier for the environment.
   * @param xCurrencyId Identifier for the currency.
   * @param xPipId Identifier for the pip which you are simulating is making this API call.
   * @param accountId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public depositIntoCbdcAccount(
    body: MakeDepositRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetCBDCAccountResponseBody>;
  public depositIntoCbdcAccount(
    body: MakeDepositRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetCBDCAccountResponseBody>>;
  public depositIntoCbdcAccount(
    body: MakeDepositRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetCBDCAccountResponseBody>>;
  public depositIntoCbdcAccount(
    body: MakeDepositRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling depositIntoCbdcAccount.');
    }

    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling depositIntoCbdcAccount.');
    }

    if (xCurrencyId === null || xCurrencyId === undefined) {
      throw new Error('Required parameter xCurrencyId was null or undefined when calling depositIntoCbdcAccount.');
    }

    if (xPipId === null || xPipId === undefined) {
      throw new Error('Required parameter xPipId was null or undefined when calling depositIntoCbdcAccount.');
    }

    if (accountId === null || accountId === undefined) {
      throw new Error('Required parameter accountId was null or undefined when calling depositIntoCbdcAccount.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
    }
    if (xCurrencyId !== undefined && xCurrencyId !== null) {
      headers = headers.set('x-currency-id', String(xCurrencyId));
    }
    if (xPipId !== undefined && xPipId !== null) {
      headers = headers.set('x-pip-id', String(xPipId));
    }

    // authentication (x-api-key) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['x-api-key']) {
      headers = headers.set('x-api-key', this.configuration.apiKeys['x-api-key']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<GetCBDCAccountResponseBody>(
      'post',
      `${this.basePath}/cbdc-ledger/accounts/${encodeURIComponent(String(accountId))}/deposit`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Get details about a specific CBDC account.
   * Retrieve details about a specific CBDC account including its balance.  As these details are for an account on the core ledger there is no information about the party which owns the account. This is because the core ledger, by design, does not store any information which can directly identify the party.  This API endpoint is intended to be used by PIPs.
   * @param xEnvId Identifier for the environment.
   * @param xCurrencyId Identifier for the currency.
   * @param xPipId Identifier for the pip which you are simulating is making this API call.
   * @param accountId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetCBDCAccountResponseBody>;
  public getCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetCBDCAccountResponseBody>>;
  public getCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetCBDCAccountResponseBody>>;
  public getCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling getCbdcAccount.');
    }

    if (xCurrencyId === null || xCurrencyId === undefined) {
      throw new Error('Required parameter xCurrencyId was null or undefined when calling getCbdcAccount.');
    }

    if (xPipId === null || xPipId === undefined) {
      throw new Error('Required parameter xPipId was null or undefined when calling getCbdcAccount.');
    }

    if (accountId === null || accountId === undefined) {
      throw new Error('Required parameter accountId was null or undefined when calling getCbdcAccount.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
    }
    if (xCurrencyId !== undefined && xCurrencyId !== null) {
      headers = headers.set('x-currency-id', String(xCurrencyId));
    }
    if (xPipId !== undefined && xPipId !== null) {
      headers = headers.set('x-pip-id', String(xPipId));
    }

    // authentication (x-api-key) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['x-api-key']) {
      headers = headers.set('x-api-key', this.configuration.apiKeys['x-api-key']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<GetCBDCAccountResponseBody>(
      'get',
      `${this.basePath}/cbdc-ledger/accounts/${encodeURIComponent(String(accountId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Open a CBDC account on the central bank&#x27;s core ledger.
   * Open a CBDC account on the core ledger of the central bank.  This API endpoint is intended to be used by PIPs.
   * @param xEnvId Identifier for the environment.
   * @param xCurrencyId Identifier for the currency.
   * @param xPipId Identifier for the pip which you are simulating is making this API call.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public openCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<OpenAccountResponseBody>;
  public openCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<OpenAccountResponseBody>>;
  public openCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<OpenAccountResponseBody>>;
  public openCbdcAccount(
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling openCbdcAccount.');
    }

    if (xCurrencyId === null || xCurrencyId === undefined) {
      throw new Error('Required parameter xCurrencyId was null or undefined when calling openCbdcAccount.');
    }

    if (xPipId === null || xPipId === undefined) {
      throw new Error('Required parameter xPipId was null or undefined when calling openCbdcAccount.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
    }
    if (xCurrencyId !== undefined && xCurrencyId !== null) {
      headers = headers.set('x-currency-id', String(xCurrencyId));
    }
    if (xPipId !== undefined && xPipId !== null) {
      headers = headers.set('x-pip-id', String(xPipId));
    }

    // authentication (x-api-key) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['x-api-key']) {
      headers = headers.set('x-api-key', this.configuration.apiKeys['x-api-key']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<OpenAccountResponseBody>('post', `${this.basePath}/cbdc-ledger/accounts`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Withdraw a cash amount from the account.
   * Simulation of withdrawing money from the account.  &lt;h2&gt; Amount details &lt;/h2&gt;  The amount must be given in the units of the currency (for GBP that means pence, for  USD/EUR: cents, etc.).  For example if you wanted £1/$1/€1 to be the amount you would give the value 100 (as the value refers to the amount of pence/cents).
   * @param body
   * @param xEnvId Identifier for the environment.
   * @param xCurrencyId Identifier for the currency.
   * @param xPipId Identifier for the pip which you are simulating is making this API call.
   * @param accountId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public withdrawFromCbdcAccount(
    body: MakeWithdrawalRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetCBDCAccountResponseBody>;
  public withdrawFromCbdcAccount(
    body: MakeWithdrawalRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetCBDCAccountResponseBody>>;
  public withdrawFromCbdcAccount(
    body: MakeWithdrawalRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetCBDCAccountResponseBody>>;
  public withdrawFromCbdcAccount(
    body: MakeWithdrawalRequestBody,
    xEnvId: number,
    xCurrencyId: number,
    xPipId: number,
    accountId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling withdrawFromCbdcAccount.');
    }

    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling withdrawFromCbdcAccount.');
    }

    if (xCurrencyId === null || xCurrencyId === undefined) {
      throw new Error('Required parameter xCurrencyId was null or undefined when calling withdrawFromCbdcAccount.');
    }

    if (xPipId === null || xPipId === undefined) {
      throw new Error('Required parameter xPipId was null or undefined when calling withdrawFromCbdcAccount.');
    }

    if (accountId === null || accountId === undefined) {
      throw new Error('Required parameter accountId was null or undefined when calling withdrawFromCbdcAccount.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
    }
    if (xCurrencyId !== undefined && xCurrencyId !== null) {
      headers = headers.set('x-currency-id', String(xCurrencyId));
    }
    if (xPipId !== undefined && xPipId !== null) {
      headers = headers.set('x-pip-id', String(xPipId));
    }

    // authentication (x-api-key) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['x-api-key']) {
      headers = headers.set('x-api-key', this.configuration.apiKeys['x-api-key']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<GetCBDCAccountResponseBody>(
      'post',
      `${this.basePath}/cbdc-ledger/accounts/${encodeURIComponent(String(accountId))}/withdrawal`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}