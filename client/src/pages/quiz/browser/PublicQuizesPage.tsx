import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import ResultArea from "./ResultArea";
import ChangePageArrow from "./ChangePageArrow";
import Pagination from "./Pagination";
import { useNavigate, useParams } from "react-router-dom";
import QuizPreview from "./questionsPreview/QuizPreview";
import './PublicQuizesPage.css';

export default function PublicQuizesPage(){
    const {quizBrowserStore, modalStore, quizDetailsStore} = useStore();
    const {quizId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        quizBrowserStore.getFunction = quizBrowserStore.getPublicQuizzes;
        quizBrowserStore.buttonFunction = quizBrowserStore.addDeleteFavourite;
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
                <span>Public Quizzes</span>
            </div>
            <ChangePageArrow direction='left'/>
            <div className="quizzes-preview">
                <SearchBar/>
                <ResultArea/>
            </div>
            <ChangePageArrow direction='right'/>
            <Pagination/>
        </div>
    )
}