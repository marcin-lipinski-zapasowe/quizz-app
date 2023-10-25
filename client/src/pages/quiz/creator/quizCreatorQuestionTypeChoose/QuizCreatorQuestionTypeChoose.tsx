import { Grid, Segment, Header, Divider, Button, Loader, Dimmer } from "semantic-ui-react";
import './QuizCreatorQuestionTypeChoose.css';
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export default observer(function QuizCreatorQuestionTypeChoose() {
    const {modalStore, quizStore} = useStore();
    const [firstLoad, setFirstLoad] = useState(true)
    const [secondLoad, setSecondLoad] = useState(true)
    const [thirdLoad, setThirdLoad] = useState(true)
    const [fourthLoad, setFourthLoad] = useState(true)

    const clickHandle = (func: () => void) => {
        func();
        modalStore.closeModal();
    }

    return(
        <Segment className="question-type-choose-segment">
            <Segment className="sticky-header">
                <Button icon='close' onClick={modalStore.closeModal}/>
            </Segment>
            <Header content='Choose type of new question'/>
            <Divider/>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column className="brick">
                        <div onClick={() => clickHandle(quizStore.questionsType[0].func)}>
                            <Dimmer active={firstLoad} style={{backgroundColor: 'rgba(0,0,0,0.4)', display: firstLoad ? "block" : "none"}} ><Loader/></Dimmer>
                            <img src={quizStore.questionsType[0].url} style={{display: !firstLoad ? "block" : "none"}} alt="profile" onLoad={() => setFirstLoad(false)}/>
                            <Header content={quizStore.questionsType[0].text} alt="profile"/>
                        </div>
                    </Grid.Column>
                    <Grid.Column className="brick">
                        <div onClick={() => clickHandle(quizStore.questionsType[1].func)}>
                            <Dimmer active={secondLoad} style={{backgroundColor: 'rgba(0,0,0,0.4)', display: secondLoad ? "block" : "none"}} ><Loader/></Dimmer>
                            <img src={quizStore.questionsType[1].url} style={{display: !secondLoad ? "block" : "none"}} alt="profile" onLoad={() => setSecondLoad(false)}/>
                            <Header content={quizStore.questionsType[1].text} alt="profile"/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column className="brick">
                        <div onClick={() => clickHandle(quizStore.questionsType[2].func)}>
                            <Dimmer active={thirdLoad} style={{backgroundColor: 'rgba(0,0,0,0.4)', display:thirdLoad ? "block" : "none"}} ><Loader/></Dimmer>
                            <img src={quizStore.questionsType[2].url} style={{display: !thirdLoad ? "block" : "none"}} alt="profile" onLoad={() => setThirdLoad(false)}/>
                            <Header content={quizStore.questionsType[2].text} alt="profile"/>
                        </div>
                    </Grid.Column>
                    <Grid.Column className="brick">
                        <div onClick={() => clickHandle(quizStore.questionsType[3].func)}>
                            <Dimmer active={fourthLoad} style={{backgroundColor: 'rgba(0,0,0,0.4)', display: fourthLoad ? "block" : "none"}} ><Loader/></Dimmer>
                            <img src={quizStore.questionsType[3].url} style={{display: !fourthLoad ? "block" : "none"}} alt="profile" onLoad={() => setFourthLoad(false)}/>
                            <Header content={quizStore.questionsType[3].text} alt="profile"/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})