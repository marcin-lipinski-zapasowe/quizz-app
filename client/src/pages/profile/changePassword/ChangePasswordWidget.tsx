import FormTextBox from "../../../common/forms/FormTextBox"
import { useState } from "react"
import { Form } from "semantic-ui-react"
import { useStore } from "../../../stores/store"
import { validator } from "../../../validators/validator"

export default function ChangePasswordWidget(){
    const {userStore, warningFooterStore} = useStore();
    const [buttonDisable, setButtonDisable] = useState(false);
    const [form, setForm] = useState({oldPassword: "", newPassword: "", newPasswordRepeat: ""})
    const [formError, setFormError] = useState(validator.UserChangePasswordValidation(form));

    const handleFormChange = (key: string, data: string) => {
        (form as any)[key] = data;
        const tForm = Object.assign({}, form);
        const tformError = Object.assign({}, validator.UserChangePasswordValidation(form));
        setForm(tForm);
        setFormError(tformError);
        setButtonDisable(Object.values(tformError).filter(value => value !== null).length !== 0);
    }

    const handleChange = () => {
        userStore.changePassword(form)
            .then(() => warningFooterStore.showSuccessWarningFooter("Password changed successfuly"))
            .catch((error) => warningFooterStore.showErrorWarningFooter((error as Error).message));
    }

    return(
        <>
            <Form onSubmit={handleChange}>
                <FormTextBox
                    required={true}                    
                    placeholder="Old password"
                    name='oldPassword'
                    value={form.oldPassword}
                    error={formError.oldPassword}
                    inputType="password"
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    placeholder="New Password"
                    name='newPassword'
                    value={form.newPassword}
                    error={formError.newPassword}
                    inputType="password"
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    placeholder="Repeat new password"
                    name='newPasswordRepeat'
                    value={form.newPasswordRepeat}
                    error={formError.newPasswordRepeat}
                    inputType="password"
                    formHandler={handleFormChange}
                />
                <Form.Button content='Submit' fluid disabled={buttonDisable} loading={userStore.loading}/>
            </Form>
        </>
    )
}