import { Segment } from "semantic-ui-react";
import { ISelectionQuestion } from "../../../../../models/quiz";
import "./SelectionQuestionForm.css"
import SharedQuestionForm from "../shared/SharedQuestionForm";
import QuizQuestionBox from "../../../quizQuestionBox/QuizQuestionBox";
import { useStore } from "../../../../../stores/store";
import SelectionAnswerBox from "../../../answerBoxes/selectionBox/SelectionAnswerBox";
import { useState } from "react";
import { validator } from "../../../../../validators/validator";

export default function SelectionQuestionForm(question: ISelectionQuestion) {
    const [form, setForm] = useState({ 
        correctAnswers: question.correctAnswers,
        answerA: question.answerA,
        answerB: question.answerB,
        answerC: question.answerC,
        answerD: question.answerD,
        title: question.title,
        content: question.content,
        id: question.id,
    });
    const [photo, setPhoto] = useState<Blob | null>();   
    const [formError, setFormError] = useState({...validator.QuestionSharedValidation(form), ...validator.QuestionSelectionValidation(form)});
    const {quizStore} = useStore();


    const handleFormChange = (key: string, data: string | number) => {
        (form as any)[key] = data;
        let tformError = Object.assign({}, {...validator.QuestionSharedValidation(form), ...validator.QuestionSelectionValidation(form)});
        setForm(Object.assign({}, form));
        setFormError(tformError);
        quizStore.updateSelectionQuestion({...form, photo: photo} as ISelectionQuestion)
    }

    const setQuestionImage = (file: Blob | undefined) => {
        if(file !== undefined) {
            setPhoto(file);
            quizStore.updateSelectionQuestion(Object.assign(form, {photo: file}) as ISelectionQuestion);
        }
        else {
            setPhoto(null);
            quizStore.updateSelectionQuestion(Object.assign(form, {photo: null}) as ISelectionQuestion);
        }
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
                    <SelectionAnswerBox
                        name='answerA'
                        content={form.answerA}
                        correctAnswer={form.correctAnswers}
                        placeholder="Answer A"
                        editable={true}
                        onEditHandler={handleFormChange}
                    />
                    <SelectionAnswerBox
                        name='answerB'
                        content={form.answerB}
                        correctAnswer={form.correctAnswers}
                        placeholder="Answer B"
                        editable={true}
                        onEditHandler={handleFormChange}
                    />
                    <SelectionAnswerBox
                        name='answerC'
                        content={form.answerC}
                        correctAnswer={form.correctAnswers}
                        placeholder="Answer C"
                        editable={true}
                        onEditHandler={handleFormChange}
                    />
                    <SelectionAnswerBox
                        name='answerD'
                        content={form.answerD}
                        correctAnswer={form.correctAnswers}
                        placeholder="Answer D"
                        editable={true}
                        onEditHandler={handleFormChange}
                    />
                </Segment>
            </Segment>
        </>
    )
}