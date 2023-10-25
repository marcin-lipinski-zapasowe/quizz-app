import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";
import { useEffect} from "react";
import './NewQuizPage.css'
import { useStore } from "../../../stores/store";
import NewQuizMenu from "./menu/NewQuizMenu";
import QuestionCreator from "./questionCreator/QuestionCreator";

const motionStyle: any = {
    initial: {marginTop: '100%'},
    animate: {marginTop: 0, transition: {duration: 0.5}},
    exit: {marginTop: '100%', transition: {duration: 0.5}}
}

export default observer(function NewQuizPage() {
    const {quizStore} = useStore();

    useEffect(() => {
        quizStore.newQuizForm();        
    });

    return (
        <motion.div {...motionStyle}>
            <Segment className="quiz-create-segment">
                <NewQuizMenu/>
                {quizStore.quizData && <QuestionCreator/>}            
            </Segment>
        </motion.div>
    )
})