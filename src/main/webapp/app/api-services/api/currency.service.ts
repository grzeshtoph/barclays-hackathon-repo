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
import { CreateCurrencyRequestBody } from '../model/createCurrencyRequestBody';
import { CreateCurrencyResponseBody } from '../model/createCurrencyResponseBody';
import { ErrorResponseBody } from '../model/errorResponseBody';
import { GetCurrencyDetailsPageResponseBody } from '../model/getCurrencyDetailsPageResponseBody';
import { GetCurrencyDetailsResponseBody } from '../model/getCurrencyDetailsResponseBody';
import { NotFoundResponse } from '../model/notFoundResponse';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class CurrencyService {
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
   * Create a new currency within an environment.
   * Create a new currency.
   * @param body
   * @param xEnvId Identifier for the environment.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createCurrency(
    body: CreateCurrencyRequestBody,
    xEnvId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CreateCurrencyResponseBody>;
  public createCurrency(
    body: CreateCurrencyRequestBody,
    xEnvId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CreateCurrencyResponseBody>>;
  public createCurrency(
    body: CreateCurrencyRequestBody,
    xEnvId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CreateCurrencyResponseBody>>;
  public createCurrency(
    body: CreateCurrencyRequestBody,
    xEnvId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createCurrency.');
    }

    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling createCurrency.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
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

    return this.httpClient.request<CreateCurrencyResponseBody>('post', `${this.basePath}/currencies`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get a page listing the currencies you have created.
   * Get a page listing the currencies you have created.  &lt;h2&gt; Paging &lt;/h2&gt;  This endpoint can potentially return quite a large result and so you must use paging to control the size of the response.  Pagination is handled by using the &#x60;pageIndex&#x60; and &#x60;pageSize&#x60; parameters.  - The &#x60;pageIndex&#x60; refers to the index of the page of data you want returned. It is 0-indexed meaning the first page will always have the &#x60;pageIndex&#x60; value of 0.  - The &#x60;pageSize&#x60; refers to the maximum number of entries you would like to see within a single page (hence page size).    - You cannot request a &#x60;pageSize&#x60; greater than  1000.
   * @param xEnvId Identifier for the environment.
   * @param pageIndex Zero-based page index (0..N) of the page you want to return.
   * @param pageSize The max. number of items (size) a page will contain.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCurrenciesPage(
    xEnvId: number,
    pageIndex?: number,
    pageSize?: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetCurrencyDetailsPageResponseBody>;
  public getCurrenciesPage(
    xEnvId: number,
    pageIndex?: number,
    pageSize?: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetCurrencyDetailsPageResponseBody>>;
  public getCurrenciesPage(
    xEnvId: number,
    pageIndex?: number,
    pageSize?: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetCurrencyDetailsPageResponseBody>>;
  public getCurrenciesPage(
    xEnvId: number,
    pageIndex?: number,
    pageSize?: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling getCurrenciesPage.');
    }

    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (pageIndex !== undefined && pageIndex !== null) {
      queryParameters = queryParameters.set('pageIndex', <any>pageIndex);
    }
    if (pageSize !== undefined && pageSize !== null) {
      queryParameters = queryParameters.set('pageSize', <any>pageSize);
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
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

    return this.httpClient.request<GetCurrencyDetailsPageResponseBody>('get', `${this.basePath}/currencies`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get details about a specific currency.
   * Retrieve details about a specific currency including the CBDC accounts on the currency&#x27;s core ledger, as well as the commercial banks and pips registered to operate within that currency.
   * @param xEnvId Identifier for the environment.
   * @param currencyId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCurrency(
    xEnvId: number,
    currencyId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetCurrencyDetailsResponseBody>;
  public getCurrency(
    xEnvId: number,
    currencyId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetCurrencyDetailsResponseBody>>;
  public getCurrency(
    xEnvId: number,
    currencyId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetCurrencyDetailsResponseBody>>;
  public getCurrency(xEnvId: number, currencyId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling getCurrency.');
    }

    if (currencyId === null || currencyId === undefined) {
      throw new Error('Required parameter currencyId was null or undefined when calling getCurrency.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
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

    return this.httpClient.request<GetCurrencyDetailsResponseBody>(
      'get',
      `${this.basePath}/currencies/${encodeURIComponent(String(currencyId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Terminate a currency (and by extension it&#x27;s CBDC Ledger and other child resources).
   * Terminates a currency. This will mean the CBDC ledger for that currency will no longer be available for experimentation. All child resources of the currency (the CBDC ledger accounts, the PIPs, the Commercial Banks) must be terminated prior to issuing this request, otherwise the request will fail.
   * @param xEnvId Identifier for the environment.
   * @param currencyId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public terminateCurrency(
    xEnvId: number,
    currencyId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetCurrencyDetailsResponseBody>;
  public terminateCurrency(
    xEnvId: number,
    currencyId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetCurrencyDetailsResponseBody>>;
  public terminateCurrency(
    xEnvId: number,
    currencyId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetCurrencyDetailsResponseBody>>;
  public terminateCurrency(xEnvId: number, currencyId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (xEnvId === null || xEnvId === undefined) {
      throw new Error('Required parameter xEnvId was null or undefined when calling terminateCurrency.');
    }

    if (currencyId === null || currencyId === undefined) {
      throw new Error('Required parameter currencyId was null or undefined when calling terminateCurrency.');
    }

    let headers = this.defaultHeaders;
    if (xEnvId !== undefined && xEnvId !== null) {
      headers = headers.set('x-env-id', String(xEnvId));
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

    return this.httpClient.request<GetCurrencyDetailsResponseBody>(
      'delete',
      `${this.basePath}/currencies/${encodeURIComponent(String(currencyId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}