import { observer } from "mobx-react-lite";
import { useStore } from "../../../../stores/store";
import FormTextBox from "../../../../common/forms/FormTextBox";
import { IGeneral } from "../../../../models/quiz";
import { Form } from "semantic-ui-react";
import FormCheckbox from "../../../../common/forms/FormCheckBox";
import { validator } from "../../../../validators/validator";
import { useState } from "react";

export default observer(function GeneralForm(general: IGeneral){
    const {quizStore} = useStore();
    const [generalAnswers, setGeneralAnswers] = useState({...general});
    const [formError, setFormError] = useState(validator.QuizGeneralValidation(generalAnswers));

    const handleFormChange = (key: string, data: string | boolean) => {
        (generalAnswers as any)[key] = data;
        setGeneralAnswers(Object.assign({}, generalAnswers));
        let tformError = Object.assign({}, validator.QuizGeneralValidation(generalAnswers));
        setFormError(tformError);
        quizStore.updateGeneral(generalAnswers as IGeneral);
    }

    return(
        <>
            <h2 className='form-header'>General settings</h2>
            <Form>
                <FormTextBox
                    required={true}
                    placeholder="Quiz title"
                    value={general.title}
                    error={formError.title}
                    name='title'
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    placeholder="Quiz description"
                    value={general.description}
                    error={formError.description}
                    name='description'
                    formHandler={handleFormChange}
                />
                <FormCheckbox
                    label="Do you want to publish this quiz as public?"
                    name='isPublic'
                    value={general.isPublic}
                    formHandler={handleFormChange}
                />
            </Form>
        </>
    )
})