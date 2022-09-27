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
import { CreateNewEnvironmentResponseBody } from '../model/createNewEnvironmentResponseBody';
import { ErrorResponseBody } from '../model/errorResponseBody';
import { GetEnvironmentDetailsPageResponseBody } from '../model/getEnvironmentDetailsPageResponseBody';
import { GetEnvironmentDetailsResponseBody } from '../model/getEnvironmentDetailsResponseBody';
import { NotFoundResponse } from '../model/notFoundResponse';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class SandboxEnvironmentService {
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
   * Create new environment.
   * Create a fresh, new environment which you can use to experiment with.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createNewEnv(observe?: 'body', reportProgress?: boolean): Observable<CreateNewEnvironmentResponseBody>;
  public createNewEnv(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CreateNewEnvironmentResponseBody>>;
  public createNewEnv(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CreateNewEnvironmentResponseBody>>;
  public createNewEnv(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

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

    return this.httpClient.request<CreateNewEnvironmentResponseBody>('post', `${this.basePath}/envs`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get a description of a specific environment.
   * Returns a description of a specific environment.
   * @param envId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getEnv(envId: number, observe?: 'body', reportProgress?: boolean): Observable<GetEnvironmentDetailsResponseBody>;
  public getEnv(envId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetEnvironmentDetailsResponseBody>>;
  public getEnv(envId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetEnvironmentDetailsResponseBody>>;
  public getEnv(envId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (envId === null || envId === undefined) {
      throw new Error('Required parameter envId was null or undefined when calling getEnv.');
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.request<GetEnvironmentDetailsResponseBody>('get', `${this.basePath}/envs/${encodeURIComponent(String(envId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get a page listing the environments you have created.
   * Get a page listing the environments you have created.  &lt;h2&gt; Paging &lt;/h2&gt;  This endpoint can potentially return quite a large result and so you must use paging to control the size of the response.  Pagination is handled by using the &#x60;pageIndex&#x60; and &#x60;pageSize&#x60; parameters.  - The &#x60;pageIndex&#x60; refers to the index of the page of data you want returned. It is 0-indexed meaning the first page will always have the &#x60;pageIndex&#x60; value of 0.  - The &#x60;pageSize&#x60; refers to the maximum number of entries you would like to see within a single page (hence page size).    - You cannot request a &#x60;pageSize&#x60; greater than  1000.
   * @param pageIndex Zero-based page index (0..N) of the page you want to return.
   * @param pageSize The max. number of items (size) a page will contain.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getEnvs(
    pageIndex?: number,
    pageSize?: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<GetEnvironmentDetailsPageResponseBody>;
  public getEnvs(
    pageIndex?: number,
    pageSize?: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetEnvironmentDetailsPageResponseBody>>;
  public getEnvs(
    pageIndex?: number,
    pageSize?: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetEnvironmentDetailsPageResponseBody>>;
  public getEnvs(pageIndex?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (pageIndex !== undefined && pageIndex !== null) {
      queryParameters = queryParameters.set('pageIndex', <any>pageIndex);
    }
    if (pageSize !== undefined && pageSize !== null) {
      queryParameters = queryParameters.set('pageSize', <any>pageSize);
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.request<GetEnvironmentDetailsPageResponseBody>('get', `${this.basePath}/envs`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Terminate a environment.
   * Terminates a environment so it will no longer be available for experimentation. All child resources of the environment (ledgers/accounts/etc.) must be terminated prior to issuing this request otherwise the request will fail.
   * @param envId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public terminateEnv(envId: number, observe?: 'body', reportProgress?: boolean): Observable<GetEnvironmentDetailsResponseBody>;
  public terminateEnv(
    envId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetEnvironmentDetailsResponseBody>>;
  public terminateEnv(
    envId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetEnvironmentDetailsResponseBody>>;
  public terminateEnv(envId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (envId === null || envId === undefined) {
      throw new Error('Required parameter envId was null or undefined when calling terminateEnv.');
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.request<GetEnvironmentDetailsResponseBody>(
      'delete',
      `${this.basePath}/envs/${encodeURIComponent(String(envId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}