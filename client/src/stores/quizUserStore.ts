import { makeAutoObservable, runInAction } from 'mobx';
import agents from '../api/agent';
import { IOpinion } from '../pages/quiz/browser/OpinionsModal';
import { IPagedResult, IQuizOverview, ISearchParams } from './quizBrowserStore';

export default class QuizUserStore{
    quizzes: IPagedResult<IQuizOverview> | null = null;
    loading: boolean = false;
    opinionsLoading: boolean = false;
    searchParams: ISearchParams;
    opinions: IOpinion[] = [];
    editLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.searchParams = {
            searchPattern: "",
            sortBy: "title",
            sortDesc: false,
            pageNumber: 1
        }
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

    updateSearchParams = async (data: ISearchParams) => {
        runInAction(() => {
            this.searchParams.pageNumber = data.pageNumber;
            this.searchParams.searchPattern = data.searchPattern;
            this.searchParams.sortBy = data.sortBy
            this.searchParams.sortDesc = data.sortDesc;
        });        
        await this.getUserQuizzes();
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
}