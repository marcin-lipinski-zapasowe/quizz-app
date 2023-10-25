import { useState} from "react";
import { Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {motion} from 'framer-motion';
import "./MainPage.css";

export default observer(function MainPage() {
    const [loginView, setLoginView] = useState(true);

    return(     
        <motion.div initial={{scale: 0.2, opacity: 0}} animate={{scale: 1, opacity: 1, transition: {duration: 0.6}}} exit={{scale: 0.2, opacity: 0, transition: {duration: 0.6}}}>
            <Segment className="main-segment" >
                {loginView 
                    ? <LoginForm/> 
                    : <RegisterForm/>
                } 
                <p className="change-form-button" onClick={() => setLoginView(!loginView)}>
                    {loginView
                        ? <>Don't have account yet? <a>Register</a></>
                        : <>Already registered? <a>Log In</a></>
                    }
                </p>
            </Segment>
        </motion.div>
    )
});