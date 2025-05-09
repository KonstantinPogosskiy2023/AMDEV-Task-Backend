import {IAuthorization} from "./IAuthorization";

export interface IAuthorizationService {
    singIn(auth: IAuthorization);
    singUp(payload);
    // logOut(user_id: number): void;
}