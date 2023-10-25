import { motion } from "framer-motion"
import { Button, Divider, Header, Pagination, PaginationProps, Segment } from "semantic-ui-react"
import { useStore } from "../../../../stores/store"
import './QuizPreview.css';
import SelectionQuestion from "./SelectionQuestion";
import { EnumQuestionType, IOpenQuestion, IQuestion, IRatingQuestion, ISelectionQuestion, ITrueOrFalseQuestion } from "../../../../models/quiz";
import RatingQuestion from "./RatingQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import OpenQuestion from "./OpenQuestion";
import { useState } from "react";

interface Props {
    quizId: string
}

const motionStyle: any = {
    initial: {marginTop: '100%'},
    animate: {marginTop: 0, transition: {duration: 0.5}},
    exit: {marginTop: '100%', transition: {duration: 0.5}}
}

export default function QuizPreview({quizId}: Props) {
    const {modalStore, quizDetailsStore} = useStore();
    const [paginationSettings, setPaginationSetting] = useState({
        activePage: 1,
        boundaryRange: 1,
        siblingRange: 1,
        showEllipsis: true,
        showFirstAndLastNav: true,
        showPreviousAndNextNav: true,
        totalPages: quizDetailsStore.quizQuestions.length,
    });

    const closeModal = () => {
        modalStore.closeModal();
    }

    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps) => {
        paginationSettings.activePage = Number(data.activePage!);
        setPaginationSetting(Object.assign({}, paginationSettings))
    }

    const getSpecificQuestionForm = (question: IQuestion): React.ReactNode => {
        switch(question.type) 
        {
            case EnumQuestionType.selection:
                return <SelectionQuestion question={question as ISelectionQuestion}/>;
            case EnumQuestionType.rating:
                return <RatingQuestion question={question as IRatingQuestion} />;
            case EnumQuestionType.trueOrFalse:
                return <TrueFalseQuestion question={question as ITrueOrFalseQuestion} />;
            case EnumQuestionType.open:
                return <OpenQuestion question={question as IOpenQuestion} />;
        }
    }

    return (
        <motion.div {...motionStyle}>
            <div className="question-preview-modal">
                <Segment className="sticky-header">
                    <Button icon='close' onClick={closeModal}/>
                </Segment>
                <Header content='Preview'/>
                <Divider/>
                <div className="questions-preview">
                    <Segment className="question-preview">
                        {getSpecificQuestionForm(quizDetailsStore.quizQuestions[paginationSettings.activePage - 1])}
                    </Segment>
                    <Pagination
                        onPageChange={handlePaginationChange}
                        ellipsisItem={paginationSettings.showEllipsis ? undefined : null}
                        firstItem={paginationSettings.showFirstAndLastNav ? undefined : null}
                        lastItem={paginationSettings.showFirstAndLastNav ? undefined : null}
                        prevItem={paginationSettings.showPreviousAndNextNav ? undefined : null}
                        nextItem={paginationSettings.showPreviousAndNextNav ? undefined : null}

                        {...paginationSettings}
                    />
                </div>
            </div>
        </motion.div>

        
    )
}