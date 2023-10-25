import { useEffect } from "react";
import QuizzesList from "./QuizzesList";
import { useStore } from "../../stores/store";
import SearchBar from "./SearchBar";
import './NewSessionPage.css';


export default function NewSessionGame(){    
    const {newSessionStore} = useStore();
    
    useEffect(() => {
        newSessionStore.getQuizzesPreview()
    }, [])

    return(
        <div className="new-session-page">
            <header>Choose quiz</header>
            <SearchBar/>    
            <QuizzesList/>
        </div>
    )
}