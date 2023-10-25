import { Segment } from "semantic-ui-react";
import { IOpenQuestion } from "../../../../../models/quiz";
import { useStore } from "../../../../../stores/store";
import QuizQuestionBox from "../../../quizQuestionBox/QuizQuestionBox";
import SharedQuestionForm from "../shared/SharedQuestionForm";
import './OpenQuestionForm.css'
import { useState } from "react";
import { validator } from "../../../../../validators/validator";


export default function OpenQuestionForm(question: IOpenQuestion) {
    const [form, setForm] = useState({title: question.title, content: question.content, id: question.id});
    const [photo, setPhoto] = useState<Blob | null>();   

    const [formError, setFormError] = useState(validator.QuestionSharedValidation(form));
    const {quizStore} = useStore()

    const handleFormChange = (key: string, data: string | boolean) => {
        (form as any)[key] = data;
        let tformError = Object.assign({}, validator.QuestionSharedValidation(form));
        setForm(Object.assign({}, form));
        setFormError(tformError);
        quizStore.updateOpenQuestion({...form, photo: photo} as IOpenQuestion)
    }

    const setQuestionImage = (file: Blob | undefined) => {
        if(file !== undefined) {
            setPhoto(file);
            quizStore.updateOpenQuestion(Object.assign(form, {photo: file}) as IOpenQuestion);
        }
        else {
            setPhoto(null);
            quizStore.updateOpenQuestion(Object.assign(form, {photo: null}) as IOpenQuestion);
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
                <Segment className="selection-question-answers open">
                    <div className="open-user-answer">User answer</div>
                </Segment>
            </Segment>
        </>
    )
}