import { observable, action } from "mobx";

export interface ICommonStore {
  isAlert: boolean;
  isTypeAlert: string;
  messageAlert: string;
  toggleNotif(condition: boolean, type?: string, message?: string): void;
}

class commonStore {
  @observable
  isAlert = false;

  @observable
  isTypeAlert = "";

  @observable
  messageAlert = "";

  @action
  toggleNotif = (condition: boolean, type?: string, message?: string) => {
    this.isAlert = condition;
    if (type && message) {
      this.isTypeAlert = type;
      this.messageAlert = message;
    }
  };
}

export default new commonStore();
