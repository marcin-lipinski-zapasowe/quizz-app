import { makeAutoObservable, runInAction } from 'mobx';
import { EnumQuestionType, IGeneral, IOpenQuestion, IQuestion, IQuizCreation, IRatingQuestion, ISelectionQuestion, ITrueOrFalseQuestion } from '../models/quiz';
import { Guid } from "typescript-guid";
import agents from '../api/agent';

export default class QuizStore {
    quizData: IQuizCreation | undefined = undefined;
    private counter: number = 0;
    private questionNumber: number = 0;
    loading: boolean = false;
    quizzes: IQuizCreation[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    newQuizForm = () => {
        if(this.quizData === undefined){
            runInAction(() => {
                this.quizData = {
                    id: Guid.create().toString(),
                    general : this.newGeneral(),
                    questions : []
                }
            })
        }        
    }

    clearQuizForm = () => {
        runInAction(() => {
            this.quizData = undefined;
        })        
    }

    private newGeneral = (): IGeneral => {
        return {
            title: "",
            description: "",
            isPublic: false
        }
    }

    private newQuestion = (qType: EnumQuestionType): IQuestion => {
        this.counter++;
        return {
            id: Guid.create().toString(),
            title: 'Question ' + this.counter,
            number: this.questionNumber++,
            content: "",
            type: qType,
            photo: null
        }
    }

    saveQuestion = async (quiz: IQuizCreation) => {
        this.loading = true;
        try {
            let q = this.createQuestionContractObject(quiz)
            await agents.Quiz.saveQuiz(q);
            runInAction(() => {
                this.loading = false;
            })
        }catch(error){
            console.log(error);
        };
    }

    createQuestionContractObject = (quiz: IQuizCreation) => {
        var r = {
            questionsSelection: [...quiz.questions.filter(que => que.type === EnumQuestionType.selection).map(q => q as ISelectionQuestion)],
            questionsOpen: [...quiz.questions.filter(que => que.type === EnumQuestionType.open).map(q => q as IOpenQuestion)],
            questionsRating: [...quiz.questions.filter(que => que.type === EnumQuestionType.rating).map(q => q as IRatingQuestion)],
            questionsTrueFalse: [...quiz.questions.filter(que => que.type === EnumQuestionType.trueOrFalse).map(q => q as ITrueOrFalseQuestion)],
        }

        const formData = new FormData();
        formData.append('id', quiz.id);
        formData.append('title', quiz.general.title);
        formData.append('description', quiz.general.description); 
        formData.append('isPublic', String(quiz.general.isPublic));

        r.questionsSelection.forEach((question, index) => {
            formData.append(`questionsSelection[${index}].id`, question.id)
            formData.append(`questionsSelection[${index}].type`, question.type!.toString() || '');
            formData.append(`questionsSelection[${index}].title`, question.title)
            formData.append(`questionsSelection[${index}].content`, question.content);
            formData.append(`questionsSelection[${index}].number`, question.number.toString());
            formData.append(`questionsSelection[${index}].photo`, question.photo || '');
            formData.append(`questionsSelection[${index}].correctAnswers`, '2');    ///!!!!!!!!!!!!!!!!!!!!!!!!!
            formData.append(`questionsSelection[${index}].answerA`, question.answerA);
            formData.append(`questionsSelection[${index}].answerB`, question.answerB);
            formData.append(`questionsSelection[${index}].answerC`, question.answerC);
            formData.append(`questionsSelection[${index}].answerD`, question.answerD);
        })

        r.questionsOpen.forEach((question, index) => {
            formData.append(`questionsOpen[${index}].id`, question.id)
            formData.append(`questionsOpen[${index}].type`, question.type!.toString() || '');
            formData.append(`questionsOpen[${index}].title`, question.title)
            formData.append(`questionsOpen[${index}].content`, question.content);
            formData.append(`questionsOpen[${index}].number`, question.number.toString());
            formData.append(`questionsOpen[${index}].photo`, question.photo || '');
        })

        r.questionsRating.forEach((question, index) => {
            formData.append(`questionsRating[${index}].id`, question.id)
            formData.append(`questionsRating[${index}].type`, question.type!.toString() || '');
            formData.append(`questionsRating[${index}].title`, question.title)
            formData.append(`questionsRating[${index}].content`, question.content);
            formData.append(`questionsRating[${index}].number`, question.number.toString());
            formData.append(`questionsRating[${index}].photo`, question.photo || '');
            formData.append(`questionsRating[${index}].min`, question.min.toString());
            formData.append(`questionsRating[${index}].max`, question.max.toString());
            formData.append(`questionsRating[${index}].step`, question.step.toString());
        })

        r.questionsTrueFalse.forEach((question, index) => {
            formData.append(`questionsTrueFalse[${index}].id`, question.id)
            formData.append(`questionsTrueFalse[${index}].type`, question.type!.toString() || '');
            formData.append(`questionsTrueFalse[${index}].title`, question.title)
            formData.append(`questionsTrueFalse[${index}].content`, question.content);
            formData.append(`questionsTrueFalse[${index}].number`, question.number.toString());
            formData.append(`questionsTrueFalse[${index}].photo`, question.photo || '');
            formData.append(`questionsTrueFalse[${index}].correctAnswer`, question.correctAnswer.toString());
        })    
        console.log(formData)
        return formData;
    }

    addTrueOrFalseQuestion = () => {   
        let question = this.newQuestion(EnumQuestionType.trueOrFalse);
        let particularQuestion: ITrueOrFalseQuestion = {
            ...question,
            correctAnswer: false
        };
        runInAction(() => this.quizData?.questions.push(particularQuestion))
    }

    addOpenQuestion = () => {   
        const particularQuestion = this.newQuestion(EnumQuestionType.open);
        runInAction(() => this.quizData?.questions.push(particularQuestion))
    }

    addSelectionQuestion = () => {   
        let question = this.newQuestion(EnumQuestionType.selection);
        let particularQuestion: ISelectionQuestion = {
            ...question,
            correctAnswers: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: ""
        };
        runInAction(() => this.quizData?.questions.push(particularQuestion))
    }

    addRatingQuestion = () => {   
        const question = this.newQuestion(EnumQuestionType.rating);
        let particularQuestion: IRatingQuestion = {
            ...question,
            min: 0,
            max: 100,
            step: 1
        };
        runInAction(() => this.quizData?.questions.push(particularQuestion))
    }

    updateGeneral = (general: IGeneral) => {     
        let g = this.quizData!.general;
        runInAction(() => {
            g.title = general.title;
            g.description = general.description;
            g.isPublic = general.isPublic;
        })
    }

    updateSelectionQuestion = (question: ISelectionQuestion) => {        
        console.log(question)
        let ind = this.quizData!.questions.findIndex(q => q.id === question.id);
        let q = this.quizData!.questions[ind] as ISelectionQuestion
        runInAction(() => {
            q.content = question.content;
            q.title = question.title;
            q.photo = question.photo;
            q.answerA = question.answerA;
            q.answerB = question.answerB;
            q.answerC = question.answerC;
            q.answerD = question.answerD;
            q.correctAnswers = question.correctAnswers;
        })
    }

    
    updateTrueFalseQuestion(question: ITrueOrFalseQuestion) {
        let ind = this.quizData!.questions.findIndex(q => q.id === question.id);
        let q = this.quizData!.questions[ind] as ITrueOrFalseQuestion
        runInAction(() => {
            q.content = question.content;
            q.title = question.title;
            q.photo = question.photo;
            q.correctAnswer = Boolean(question.correctAnswer);
        })
    }

    updateOpenQuestion(question: IOpenQuestion) {
        let ind = this.quizData!.questions.findIndex(q => q.id === question.id);
        let q = this.quizData!.questions[ind] as IOpenQuestion
        runInAction(() => {
            q.content = question.content;
            q.title = question.title;
            q.photo = question.photo;
        })
    }

    updateRatingQuestion(question: IRatingQuestion) {
        let ind = this.quizData!.questions.findIndex(q => q.id === question.id);
        let q = this.quizData!.questions[ind] as IRatingQuestion
        runInAction(() => {
            q.content = question.content;
            q.title = question.title;
            q.photo = question.photo;
            q.min = question.min;
            q.max = question.max;
            q.step = question.step;
        })
    }

    deleteQuestion = (deleteId: string) => {
        runInAction(() => this.quizData!.questions = [...this.quizData!.questions.filter(q => q.id !== deleteId)])
    }

    questionsType: any = {
        0: {                                        //EnumQuestionType.tf
            url: require("../assets/true-or-false.png"),
            text: 'True or false',
            func: this.addTrueOrFalseQuestion

         },
        1: {                                        //EnumQuestionType.open
            url: require("../assets/open.png"),
            text: 'Open question',
            func: this.addOpenQuestion,
        },
        2: {                                        //EnumQuestionType.selection
            url: require("../assets/selection.png"),
            text: 'Select from many',
            func: this.addSelectionQuestion
        },
        3: {                                        //EnumQuestionType.rating
            url: require("../assets/rating.png"),
            text: 'Rating',
            func: this.addRatingQuestion,
        }
    }
}