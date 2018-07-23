import { IUserInformation } from "../Server/IUserInformation";

export class UserInformationManager {
    private _displayName: JQuery = $("#DisplayName");
    private _displayNameLB: JQuery = $("#DisplayNameLB");
    private _you: JQuery = $("#You");
    private _youLB: JQuery = $("#YouLB");

    constructor(userInformation: IUserInformation) {
        this._displayName.text(userInformation.Name);
        this._displayNameLB.text(userInformation.Name);
        this._you.attr("src", userInformation.Photo);
        this._youLB.attr("src", userInformation.Photo);
    }
}