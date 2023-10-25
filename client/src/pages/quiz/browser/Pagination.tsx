import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import './Pagination.css';

export default observer(function Pagination(){
    const {quizBrowserStore} = useStore();

    return(
        <div className="pagination">
            <div>
                <span>&#x27A2;</span>
                <a>Page {quizBrowserStore.quizzes?.page}</a>
                <span>&#x27A2;</span>
            </div>
        </div>
    )
})