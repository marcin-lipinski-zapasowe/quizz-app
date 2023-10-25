import { Segment, Header, Divider, Button, Dimmer, Loader } from "semantic-ui-react";
import './OpinionsModal.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";

interface Props {
    quizId: string
}

export interface IOpinion {
    author: string,
    value: number,
    text: string
}

export default observer(function OpinionsModal({quizId}: Props) {
    const {modalStore, quizBrowserStore} = useStore();

    useEffect(() => {
        quizBrowserStore.getOpinions(quizId)
    }, [])

    const closeModal = () => {
        quizBrowserStore.opinions = [];
        modalStore.closeModal();
    }

    if(quizBrowserStore.opinionsLoading) return <Dimmer active={true} style={{backgroundColor: 'rgba(0,0,0,0.4)'}}><Loader/></Dimmer>;


    return( 
        <Segment className="opinions-segment">
            <Segment className="sticky-header">
                <Button icon='close' onClick={closeModal}/>
            </Segment>
            <Header content='Opinions'/>
            <Divider/>
            <div className="opinions-container">
                {quizBrowserStore.opinions.map(opinion => 
                    <div>
                        <p className="opinion-text">{opinion.text}</p>
                        <p className="opinion-author">{opinion.author}</p>
                        <p className="opinion-value">
                            <span>★</span>
                            {Math.round(opinion.value * 10) / 10}
                        </p>
                    </div>    
                )}
            </div>
            
            
        </Segment>
    )
})