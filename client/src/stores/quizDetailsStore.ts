import { makeAutoObservable } from 'mobx';
import agents from '../api/agent';
import { IOpenQuestion, IQuestion, IRatingQuestion, ISelectionQuestion, ITrueOrFalseQuestion } from '../models/quiz';

export interface IQuizDetails {
    questionsSelection: ISelectionQuestion[],
    questionsOpen: IOpenQuestion[],
    questionsRating: IRatingQuestion[],
    questionsTrueFalse: ITrueOrFalseQuestion[]
}

export default class QuizDetailsStore {
    loading: boolean = false;
    quizQuestions: IQuestion[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getQuizDetails = async (quizId: string) => {
        try {
            this.loading = true;
            let result = await agents.Quiz.details(quizId);
            this.quizQuestions = [...result.questionsOpen, ...result.questionsRating,...result.questionsSelection,...result.questionsTrueFalse].sort((a, b) => a.number > b.number ? 1 : -1);
            console.log(result);
            this.loading = false;
        }catch(error){
            console.log(error);
            this.loading = false;
            throw new Error((error as Error).message);
        }
    }
}