import { makeAutoObservable, runInAction } from "mobx";
import agents from "../api/agent";
import { IPagedResult, ISearchParams } from "./quizBrowserStore";
import { INewSessionsSettings } from "../pages/new-game/NewSessionModal";

export interface ISessionQuizPreview {
    id: string,
    title: string
}

export interface IHostingSessionQuizPreview {
    pin: string,
    title: string
}

export class NewSessionStore {
    pagedResult: IPagedResult<ISessionQuizPreview> | null = null;
    loading: boolean = false;
    searchParams: ISearchParams = {
        searchPattern: "",
        sortBy: "title",
        sortDesc: false,
        pageNumber: 1
    };
    quiz: IHostingSessionQuizPreview | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getQuizzesPreview = async () => {
        runInAction(() => this.loading = true);
        try {
            const result = await agents.Session.getQuizzesPreview(this.searchParams);
            runInAction(() => this.pagedResult = result);
        } catch(error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    updateSearchParams = (data: ISearchParams) => {
        runInAction(() => this.searchParams = data);
        this.getQuizzesPreview();
    }

    createSession = async (settings: INewSessionsSettings) => {
        console.log(settings)
        runInAction(() => this.loading = true);
        try {
            this.quiz = {pin: '', title: settings.quiz.title}
            this.quiz.pin = await agents.Session.createSession(settings);
            this.quiz.pin = this.quiz.pin.substring(3, 9);
        } catch(error) {
            console.log(error);
            throw new Error((error as Error).message);
        } finally {
            runInAction(() => this.loading = false);
        }
    }


}