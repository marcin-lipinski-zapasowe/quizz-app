export interface IQuizCreation {
    id: string,
    general : IGeneral,
    questions : IQuestion[]
}

export interface IGeneral {
    title: string,
    description: string,
    isPublic: boolean
}

export interface IQuestionValidationForm {
    title: string,
    content: string
}

export interface IQuestion extends IQuestionValidationForm  {
    id: string,
    type: EnumQuestionType | undefined,
    photo: Blob | null,
    number: number,
    questionImageUrl?: string
}

export interface ITrueOrFalseAnswers {
    correctAnswer: boolean
}

export interface IOpenAnswers {

}

export interface IRatingAnswers {
    min: number,
    max: number,
    step: number
}

export interface ISelectionAnswers {
    correctAnswers: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string
}

export interface ITrueOrFalseQuestion extends IQuestion, ITrueOrFalseAnswers {}
export interface IOpenQuestion extends IQuestion, IOpenAnswers {}
export interface IRatingQuestion extends IQuestion, IRatingAnswers {}
export interface ISelectionQuestion extends IQuestion, ISelectionAnswers {}

export enum EnumQuestionType {
    trueOrFalse,
    open,
    selection,
    rating
}