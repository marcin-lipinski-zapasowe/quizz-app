import { IGeneral } from "../models/quiz";


export class QuizValidator {
    QuizGeneralValidation = (data: IGeneral): any => {
        return {
            title: this.QuizTitleValidation(data.title),
            description: this.QuizDescriptionValidation(data.description)
        }
    }

    QuestionSharedValidation = (data: any): any => {
        return {
            title: this.QuestionTitleValidation(data.title),
            content: this.QuestionContentValidation(data.content)
        }
    }

    QuestionRatingValidation = (data: any) => {        
        return {
            min: this.QuestionRatingMinValidation(data.min),
            max: this.QuestionRatingMaxValidation(data.max),
            step: this.QuestionRatingStepValidation(data.step)
        }
    }

    private QuestionRatingMinValidation(data: number){

        return null;
    }

    private QuestionRatingMaxValidation(data: number){

        return null;
    }

    private QuestionRatingStepValidation(data: number){

        return null;
    }

    private QuestionSelectionAnswerValidation(data: string, name: string){
        if(!data.minLength(8)) return `The answer ${name} must be at least 8 characters long.`;
        if(!data.maxLength(100)) return `The answer ${name} can not be longer than 50 characters.`;
        return null;
    }

    QuestionSelectionValidation = (data: any): any => {
        this.QuestionSelectionAnswerValidation(data.answerA, 'A');
        this.QuestionSelectionAnswerValidation(data.answerB, 'B');
        this.QuestionSelectionAnswerValidation(data.answerC, 'C');
        this.QuestionSelectionAnswerValidation(data.answerD, 'D');
    }

    private QuestionTitleValidation(data: string){
        if(!data.minLength(8)) return "The question title must be at least 8 characters long.";
        if(!data.maxLength(100)) return "The question title can not be longer than 100 characters.";
        return null;
    }

    private QuestionContentValidation(data: string){
        if(!data.minLength(15)) return "The question title must be at least 15 characters long.";
        if(!data.maxLength(100)) return "The question title can not be longer than 150 characters.";
        return null
    }


    private QuizTitleValidation(data: string) {
        if(!data.minLength(10)) return "The quiz title must be at least 10 characters long.";
        if(!data.maxLength(100)) return "The quiz title can not be longer than 100 characters.";
        return null;
    }

    private QuizDescriptionValidation(data: string) {
        if(!data.minLength(30)) return "The quiz title must be at least 30 characters long.";
        if(!data.maxLength(300)) return "The quiz title can not be longer than 300 characters.";
        return null;
    }
}

