import {useState} from 'react';
import { Form } from "semantic-ui-react";
import FormTextBox from '../../common/forms/FormTextBox';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { validator } from '../../validators/validator';
import './RegisterForm.css';

export default observer(function RegisterForm() {
    const {userStore, warningFooterStore} = useStore();
    const [buttonDisable, setButtonDisable] = useState(true);
    const [registerForm, setRegisterForm] = useState({email: "", username: "", password: "", passwordRepeat: ""});
    const [registerFormError, setRegisterFormError] = useState(validator.UserRegisterValidation(registerForm));
    const navigate = useNavigate();

    const handleFormChange = (key: string, data: string | boolean) => {
        (registerForm as any)[key] = data;
        const tregisterForm = Object.assign({}, registerForm);
        const tregisterFormError = Object.assign({}, validator.UserRegisterValidation(registerForm));
        setRegisterForm(tregisterForm);
        setRegisterFormError(tregisterFormError);
        setButtonDisable(Object.values(tregisterFormError).filter(value => value !== null).length !== 0);
    }

    const handleSubmit = () => {
        userStore.register(registerForm)
            .then(() => navigate('/home'))
            .catch((error) => warningFooterStore.showErrorWarningFooter((error as Error).message));
    }

    return (
        <>
            <h2 className='form-header'>Register</h2>
            <Form onSubmit={handleSubmit} loading={userStore.loading}>
                <FormTextBox
                    required={true}
                    iconName="at"
                    placeholder="Email"
                    name='email'
                    value={registerForm.email}
                    error={registerFormError.email}
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    iconName="user"
                    placeholder="Username"
                    name='username'
                    value={registerForm.username}
                    error={registerFormError.username}
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    iconName="key"
                    placeholder="Password"
                    name='password'
                    value={registerForm.password}
                    error={registerFormError.password}
                    inputType="password"
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    iconName="key"
                    placeholder="Repeat Password"
                    name='passwordRepeat'
                    value={registerForm.passwordRepeat}
                    error={registerFormError.passwordRepeat}
                    inputType="password"
                    formHandler={handleFormChange}
                />
                <Form.Button content='Submit' fluid disabled={buttonDisable} loading={userStore.loading}/>
            </Form>
        </>
    )
})