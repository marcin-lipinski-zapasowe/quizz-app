import { Segment } from "semantic-ui-react";

interface Props {
    id: string,
    node: React.ReactNode;
}

export default function QuestionCreatorElement({id, node}: Props) {
    return(
        <Segment id={id} className="quiz-create-main-elem">
            <Segment className="quiz-create-main-elem-son">
                {node}
            </Segment>                       
        </Segment>
    )
}