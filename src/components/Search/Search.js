import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "~/hooks";
import * as searchServices from "~/services/searchServices";

const cx = classNames.bind(styles);

function Search({
    endpoint,
    setSearchResult,
    setIsSearching,
    page,
    size,
    setTotalPages,
    setTotalItems,
    reload,
}) {
    const [searchValue, setSearchValue] = useState("");

    const debouncedValue = useDebounce(searchValue, 500);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValue(searchValue);
        }
    };

    useEffect(() => {
        console.log(debouncedValue);
        if (debouncedValue.length === 0) {
            setIsSearching(false);
            return;
        }

        if (!debouncedValue.trim() || debouncedValue.length < 3) {
            return;
        }

        setIsSearching(true);

        const fetchApi = async () => {
            const response = await searchServices.search(
                endpoint,
                debouncedValue.trim(),
                page,
                size
            );
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalElements);
            console.log(response);
        };

        fetchApi();
    }, [debouncedValue, page, size, reload]);
    return (
        <input
            type="text"
            className="col-lg-3 col-sm-3 mt-3"
            placeholder="Nhập tên giáo viên"
            value={searchValue}
            onChange={handleChange}
        />
    );
}

export default Search;
