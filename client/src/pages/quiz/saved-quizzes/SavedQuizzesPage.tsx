import ChangePageArrow from "../browser/ChangePageArrow";
import ResultArea from "../browser/ResultArea";
import Pagination from "../browser/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import QuizPreview from "../browser/questionsPreview/QuizPreview";
import SearchBar from "../browser/SearchBar";

export default function SavedQuizzesPage(){
    const {quizBrowserStore, modalStore, quizDetailsStore} = useStore();
    const {quizId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        quizBrowserStore.getFunction = quizBrowserStore.getSavedQuizzes;
        quizBrowserStore.buttonFunction = quizBrowserStore.deleteFavouriteAndRemove;
        quizBrowserStore.getFunction();
    }, [])

    if(quizId){
        quizDetailsStore.getQuizDetails(quizId)
            .then(() => modalStore.openModal(<QuizPreview quizId={quizId}/>))
            .catch(() => navigate('/notfound'))
    }

    return(
        <div className="public-quizees-page">
            <div className="header">
                <span>Your Quizzes</span>
            </div>
            <ChangePageArrow direction='left' />
            <div className="quizzes-preview">
                <SearchBar />
                <ResultArea />
            </div>
            <ChangePageArrow direction='right'/>
            <Pagination/>
        </div>
    )
}