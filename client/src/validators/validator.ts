import { QuizValidator } from "./quizValidators";
import { UserValidator } from "./userValidators";

interface Validator {
    quizValidator: QuizValidator;
    userValidator: UserValidator;
}

const validationEntries: Validator = {
    quizValidator: new QuizValidator(),
    userValidator: new UserValidator()
}; 

export const validator = {
    ...validationEntries.quizValidator,
    ...validationEntries.userValidator
}