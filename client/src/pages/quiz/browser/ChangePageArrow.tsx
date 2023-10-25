import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useState } from "react";
import './ChangePageArrow.css'

interface Props {
    direction: string
}

export default observer(function ChangePageArrow({direction}: Props){
    const {quizBrowserStore} = useStore();
    const className = direction === 'left' ? 'arrow-left' : 'arrow-right';
    const changeVal = direction === 'left' ? -1 : 1;
    const [searchParamsForm, setsearchParamsForm] = useState({...quizBrowserStore.searchParams});
    const isActive = direction === 'left' ? quizBrowserStore.quizzes?.hasPreviousPage : quizBrowserStore.quizzes?.hasNextPage;
    const changeValBorder = direction === 'left' ? 1 : quizBrowserStore.quizzes?.pagesAmount;

    const changePageClick = (evnt: React.MouseEvent<HTMLDivElement>) => {
        if(isActive){
            if(evnt.currentTarget.classList.contains('double')){
                searchParamsForm.pageNumber = changeValBorder!;
            }
            else searchParamsForm.pageNumber = quizBrowserStore.searchParams.pageNumber + changeVal;
            setsearchParamsForm(Object.assign({}, {...searchParamsForm}));
            quizBrowserStore.updateSearchParams(searchParamsForm);
        }
    }

    return(
        <div className={className}>
            <div>
                <div className={`change-page-button ${isActive ? 'active' : ''} ${direction === 'left' ? 'double' : ''}`} onClick={changePageClick}/>
                <div className={`change-page-button ${isActive ? 'active' : ''} ${direction === 'right' ? 'double' : ''}`} onClick={changePageClick}/>
            </div>
        </div>
    )
})