import { useState } from "react";
import { useStore } from "../../../stores/store";
import { Form } from "semantic-ui-react";
import FormTextBox from "../../../common/forms/FormTextBox"
import { validator } from "../../../validators/validator";

export default function ChangeUsernameWidget() {
    const {userStore, warningFooterStore} = useStore();
    const [form, setForm] = useState({newUsername: ""})
    const [formError, setFormError] = useState(validator.UserChangeUsernameValidation(form));
    const [buttonDisable, setButtonDisable] = useState(false);  

    const handleFormChange = (key: string, data: string) => {
        (form as any)[key] = data;
        const tForm = Object.assign({}, form);
        const tformError = Object.assign({}, validator.UserChangeUsernameValidation(form));
        setForm(tForm);
        setFormError(tformError);
        setButtonDisable(Object.values(tformError).filter(value => value !== null).length !== 0);
    }

    const handleChange = () => {
        userStore.changeUsername(form)
            .then(() => warningFooterStore.showSuccessWarningFooter("Username changed successfuly"))
            .catch((error) => warningFooterStore.showErrorWarningFooter((error as Error).message));
    }

    return(
        <>
            <Form onSubmit={handleChange}>
                <FormTextBox
                    required={true}                    
                    placeholder="New username"
                    name='newUsername'
                    value={form.newUsername}
                    error={formError.newUsername}
                    formHandler={handleFormChange}
                />
                <Form.Button content='Submit' fluid disabled={buttonDisable} loading={userStore.loading}/>
            </Form>
        </>
    )
}