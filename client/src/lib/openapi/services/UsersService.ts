/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Register User
     * POST /users/
     * Creates a new user.
     * Accepts Firebase info (uid, email, names).
     * Plaid fields (access_token, item_id) are optional and null initially.
     * @param requestBody
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static registerUserUsersPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Fetch User
     * GET /users/{uid}
     * Fetch user by Firebase UID.
     * Plaid fields may be null if not linked yet.
     * @param uid
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static fetchUserUsersUidGet(
        uid: string,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
