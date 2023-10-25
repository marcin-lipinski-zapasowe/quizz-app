import { useState } from "react";
import { useStore } from "../../../stores/store";
import './SearchBar.css';

const sortByOptions = [
    {
        key: 'title',
        text: 'Title'
    },
    {
        key: 'rating',
        text: 'Rating'
    },
    {
        key: 'sessions',
        text: 'Number of sessions'
    },
    {
        key: 'questions',
        text: 'Number of questions'
    }
];

export default function SearchBar(){
    const {quizBrowserStore} = useStore();
    const [searchParamsForm, setsearchParamsForm] = useState({...quizBrowserStore.searchParams});

    const searchBarInputChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        searchParamsForm.searchPattern = evnt.currentTarget.value;
        setsearchParamsForm(Object.assign({}, {...searchParamsForm}));
        quizBrowserStore.updateSearchParams(searchParamsForm);
    }

    const searchBarSelectChange = (evnt: React.ChangeEvent<HTMLSelectElement>) => {
        searchParamsForm.sortBy = evnt.currentTarget.value;
        setsearchParamsForm(Object.assign({}, {...searchParamsForm}));
        quizBrowserStore.updateSearchParams(searchParamsForm);
    }

    const searchBarButtonClick = (evnt: React.MouseEvent<HTMLButtonElement>) => {
        searchParamsForm.sortDesc = !searchParamsForm.sortDesc;
        evnt.currentTarget.textContent = searchParamsForm.sortDesc ? '\u{1F80B}' : '\u{1F809}';
        setsearchParamsForm(Object.assign({}, {...searchParamsForm}));
        quizBrowserStore.updateSearchParams(searchParamsForm);
    }

    return(
        <div className="search-bar">
            <input onChange={searchBarInputChange} value={searchParamsForm.searchPattern} placeholder="Search..."/>
            <div>Sort by</div>
            <select onChange={searchBarSelectChange}>
                {sortByOptions.map(option => <option value={option.key}>{option.text}</option>)}
            </select>
            <button onClick={searchBarButtonClick}>&#x1F809;</button>
        </div>
    )
}