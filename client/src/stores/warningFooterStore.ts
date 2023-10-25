import { makeAutoObservable } from 'mobx';

export default class WarningFooterStore {
    header: string = "";
    text: string  = "";
    visible: boolean = false;
    positive: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    showErrorWarningFooter = (message: string) => {
        this.visible = true;
        this.positive = false;
        this.text = message;
        setTimeout(() => this.hideWarningFooter(), 5000);
    };

    showSuccessWarningFooter = (message: string) => {
        this.visible = true;
        this.positive = true;
        this.text = message;
        setTimeout(() => this.hideWarningFooter(), 5000);
    };

    hideWarningFooter = () => {
        this.visible = false;
    };
}