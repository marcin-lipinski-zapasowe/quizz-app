import { Segment } from "semantic-ui-react";
import { IRatingQuestion} from "../../../../../models/quiz";
import { useStore } from "../../../../../stores/store";
import QuizQuestionBox from "../../../quizQuestionBox/QuizQuestionBox";
import SharedQuestionForm from "../shared/SharedQuestionForm";
import './RatingQuestionForm.css'
import RatingSlider from "../../../answerBoxes/ratingSlider/RatingSlider";
import { useState } from "react";
import { validator } from "../../../../../validators/validator";


export default function RatingQuestionForm(question: IRatingQuestion) {
    const [form, setForm] = useState({
        title: question.title,
        content: question.content,
        min: question.min,
        max: question.max,
        step: question.step,
        id: question.id
    });
    const [photo, setPhoto] = useState<Blob | null>();   
    const [formError, setFormError] = useState({...validator.QuestionSharedValidation(form), ...validator.QuestionRatingValidation(form)});
    const {quizStore} = useStore();
    

    const handleFormChange = (key: string, data: string | number) => {
        (form as any)[key] = data;
        let tformError = Object.assign({}, {...validator.QuestionSharedValidation(form), ...validator.QuestionRatingValidation(formError)});
        setForm(Object.assign({}, form));
        setFormError(tformError);
        quizStore.updateRatingQuestion({...form, photo: photo} as IRatingQuestion)
    }

    const setQuestionImage = (file: Blob | undefined) => {
        if(file !== undefined) {
            setPhoto(file);
            quizStore.updateRatingQuestion(Object.assign(form, {photo: file}) as IRatingQuestion);
        }
        else {
            setPhoto(null);
            quizStore.updateRatingQuestion(Object.assign(form, {photo: null}) as IRatingQuestion);
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
                <Segment className="rating-question-answers">
                    <div className="rating-own">
                        <RatingSlider question={question} setMinMaxStepValue={handleFormChange}/>
                    </div>
                </Segment>
            </Segment>
        </>
    )
}