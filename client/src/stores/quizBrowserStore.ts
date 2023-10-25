import { makeAutoObservable, runInAction } from 'mobx';
import agents from '../api/agent';
import { IOpinion } from '../pages/quiz/browser/OpinionsModal';

export interface IQuizOverview {
    id: string;
    title: string;
    description: string;
    authorName: string;
    questionsAmount: number;
    averageOpinion: number;
    sessionsAmount: number;
    isFavourite: boolean;
}

export interface IPagedResult<T> {
    items: T[];
    pageSize: number;
    page: number;
    pagesAmount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ISearchParams {
    searchPattern: string,
    sortBy: string,
    sortDesc: boolean,
    pageNumber: number
}

export interface IFavouriteChange {
    isFavourite: boolean,
    quizId: string
}

export default class QuizBrowserStore {
    quizzes: IPagedResult<IQuizOverview> | null = null;
    loading: boolean = false;
    opinionsLoading: boolean = false;
    searchParams: ISearchParams;
    opinions: IOpinion[] = [];
    addFavouriteLoading: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
        this.searchParams = {
            searchPattern: "",
            sortBy: "title",
            sortDesc: false,
            pageNumber: 1
        }
    }

    getPublicQuizzes = async () => {
        this.loading = true;
        try {
            const quizzes = await agents.Quiz.getAllPublic(this.searchParams);
            this.quizzes = quizzes;
            console.log(quizzes)
            runInAction(() => {
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            this.loading = false;
        };
    }

    getSavedQuizzes = async () => {
        this.loading = true;
        try {
            const quizzes = await agents.Quiz.getSaved(this.searchParams);
            this.quizzes = quizzes;
            console.log(quizzes)
            runInAction(() => {
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            this.loading = false;
        };
    }

    getUserQuizzes = async () => {
        this.loading = true;
        try {
            const quizzes = await agents.Quiz.getUserQuizzes(this.searchParams);
            this.quizzes = quizzes;
            console.log(quizzes)
            runInAction(() => {
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            this.loading = false;
        };
    }

    addDeleteFavourite = async (quizId: string) => {
        runInAction(async () => {
            this.addFavouriteLoading = true;
            let quizIndex = this.quizzes?.items.findIndex(q => q.id === quizId);
            let data = {
                quizId: quizId, 
                isFavourite: !this.quizzes?.items.find(q => q.id === quizId)!.isFavourite
            };

            try{
                await agents.Quiz.addDeleteFavourite(data);                
                this.quizzes!.items[quizIndex!].isFavourite = data.isFavourite;
                this.addFavouriteLoading = false;
            }catch(error){
                console.log(error);
                this.addFavouriteLoading = false;
            }
        })
    }

    deleteFavouriteAndRemove = async (quizId: string) => {
        runInAction(async () => {
            this.addFavouriteLoading = true;
            let data = {
                quizId: quizId, 
                isFavourite: false
            };

            try{
                await agents.Quiz.addDeleteFavourite(data);                
                this.quizzes!.items = [...this.quizzes!.items.filter(quiz => quiz.id !== quizId)]
                this.addFavouriteLoading = false;
            }catch(error){
                console.log(error);
                this.addFavouriteLoading = false;
            }
        })
    }

    updateSearchParams = async (data: ISearchParams) => {
        runInAction(() => {
            this.searchParams.pageNumber = data.pageNumber;
            this.searchParams.searchPattern = data.searchPattern;
            this.searchParams.sortBy = data.sortBy
            this.searchParams.sortDesc = data.sortDesc;
        });        
        this.getFunction();
    }

    getOpinions = async (quizId: string) => {
        this.opinionsLoading = true;
        try{
            this.opinions = await agents.Quiz.getOpinions(quizId);
            this.opinionsLoading = false
        }catch(error){
            console.log(error);
            this.opinionsLoading = false;
        }
    }

    pageNumber = () => this.quizzes?.page;
    getFunction: () => void = this.getPublicQuizzes;
    buttonFunction: (quizId: string) => void = this.addDeleteFavourite;
}