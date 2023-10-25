import { Segment } from "semantic-ui-react";
import { ITrueOrFalseQuestion } from "../../../../../models/quiz";
import { useStore } from "../../../../../stores/store";
import SharedQuestionForm from "../shared/SharedQuestionForm";
import QuizQuestionBox from "../../../quizQuestionBox/QuizQuestionBox";
import TrueFalseAnswerBox from "../../../answerBoxes/trueFalseBox/TrueFalseAnswerBox";
import { validator } from "../../../../../validators/validator";
import { useState } from "react";


export default function TrueOrFalseQuestionForm(question: ITrueOrFalseQuestion) {
    const [form, setForm] = useState({title: question.title, content: question.content, correctAnswer: false, id: question.id});
    const [photo, setPhoto] = useState<Blob | null>();   

    const [formError, setFormError] = useState(validator.QuestionSharedValidation(form));
    const {quizStore} = useStore()

    const handleFormChange = (key: string, data: string | boolean) => {
        (form as any)[key] = data;
        let tformError = Object.assign({}, validator.QuestionSharedValidation(form));
        setForm(Object.assign({}, form));
        setFormError(tformError);
        quizStore.updateTrueFalseQuestion({...form, photo: photo} as ITrueOrFalseQuestion);
    }

    const setQuestionImage = (file: Blob | undefined) => {
        if(file !== undefined) {
            setPhoto(file);
            quizStore.updateTrueFalseQuestion(Object.assign(form, {photo: file}) as ITrueOrFalseQuestion);
        }
        else {
            setPhoto(null);
            quizStore.updateTrueFalseQuestion(Object.assign(form, {photo: null}) as ITrueOrFalseQuestion);
        };
    }

    return (
        <>
            <SharedQuestionForm title={form.title} error={formError.title} handleFormChange={handleFormChange}/>
            <Segment className="question-preview">
                <QuizQuestionBox
                    setImage={setQuestionImage}
                    content={form.content}
                    name='content'
                    onEditHandler={handleFormChange}
                />                
                <Segment className="selection-question-answers">
                    <TrueFalseAnswerBox
                        correctAnswer={form.correctAnswer}
                        placeholder="True"
                        name='correctAnswer'
                        onEditHandler={handleFormChange}
                    />
                    <TrueFalseAnswerBox
                        correctAnswer={form.correctAnswer}
                        placeholder="False"
                        name='correctAnswer'
                        onEditHandler={handleFormChange}
                    />
                </Segment>
            </Segment>
        </>
    )
}