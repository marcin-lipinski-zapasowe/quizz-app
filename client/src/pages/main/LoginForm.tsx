import {useState} from 'react';
import { Form } from "semantic-ui-react";
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import FormTextBox from '../../common/forms/FormTextBox';
import { useNavigate } from 'react-router-dom';
import { validator } from '../../validators/validator';
import './LoginForm.css';

export default observer(function LoginForm() {
    const {userStore, warningFooterStore} = useStore();
    const [buttonDisable, setButtonDisable] = useState(true);
    const [loginForm, setLoginForm] = useState({emailOrUsername: "", password: ""});
    const [loginFormError, setLoginFormError] = useState(validator.UserLoginValidation(loginForm));
    const navigate = useNavigate();

    const handleFormChange = (key: string, data: string | boolean) => {
        (loginForm as any)[key] = data;
        const tloginForm = Object.assign({}, loginForm);
        const tloginFormError = Object.assign({}, validator.UserLoginValidation(loginForm));
        setLoginForm(tloginForm);
        setLoginFormError(tloginFormError);
        setButtonDisable(Object.values(tloginFormError).filter(value => value !== null).length !== 0);
    }

    const handleSubmit = () => {
        userStore.login(loginForm)
            .then(() => navigate('/home'))
            .catch((error) => warningFooterStore.showErrorWarningFooter((error as Error).message));
    }

    return(
        <>
            <h2 className='form-header'>Log in</h2>
            <Form onSubmit={handleSubmit}>
                <FormTextBox
                    required={true}
                    iconName="at"
                    name='emailOrUsername'
                    placeholder="Email / username"
                    value={loginForm.emailOrUsername}
                    error={loginFormError.emailOrUsername}
                    formHandler={handleFormChange}
                />
                <FormTextBox
                    required={true}
                    iconName="key"
                    placeholder="Password"
                    name='password'
                    value={loginForm.password}
                    error={loginFormError.password}
                    inputType="password"
                    formHandler={handleFormChange}
                />
                <Form.Button content='Submit' fluid disabled={buttonDisable} loading={userStore.loading}/>
            </Form>
        </>
    )
})