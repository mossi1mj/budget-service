/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlaidService {
    /**
     * Create Link Token
     * Generate a new Plaid Link token using a Firebase UID.
     * @param uid
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createLinkTokenPlaidCreateLinkTokenPost(
        uid: string,
        authorization?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plaid/create_link_token',
            headers: {
                'authorization': authorization,
            },
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Exchange Token
     * Exchange a public token for an access token and save it to the user's record.
     * @param publicToken
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static exchangeTokenPlaidExchangePublicTokenPost(
        publicToken: string,
        authorization?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plaid/exchange_public_token',
            headers: {
                'authorization': authorization,
            },
            query: {
                'public_token': publicToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Accounts
     * Get linked bank accounts using the stored access token.
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAccountsPlaidAccountsGet(
        authorization?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plaid/accounts',
            headers: {
                'authorization': authorization,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Balance
     * Get real-time balance for all accounts.
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getBalancePlaidBalanceGet(
        authorization?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plaid/balance',
            headers: {
                'authorization': authorization,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transactions
     * Get recent transactions for the user.
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransactionsPlaidTransactionsGet(
        authorization?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plaid/transactions',
            headers: {
                'authorization': authorization,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
