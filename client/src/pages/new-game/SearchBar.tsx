import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import './SearchBar.css';

export default observer(function SearchBar() {
    const { newSessionStore } = useStore();
    const { searchParams, updateSearchParams } = newSessionStore;

    const searchBarInputChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        updateSearchParams({ ...searchParams, searchPattern: evnt.currentTarget.value });
    };

    const searchBarButtonClick = () => {
        updateSearchParams({ ...searchParams, sortDesc: !searchParams.sortDesc });
    };

    return (
        <div className="search-bar">
            <input  onChange={searchBarInputChange} value={searchParams.searchPattern} placeholder="Search..." />
            <div>Sort by Title</div>
            <button onClick={searchBarButtonClick}>{searchParams.sortDesc ? '\u{1F80B}' : '\u{1F809}'}</button>
        </div>
    );
});