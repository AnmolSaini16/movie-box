import React, { useCallback, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { Search, SearchIconWrapper, StyledInputBase } from "./StyledComponents";
import { useRouter } from "next/router";
import { AppContext, AppContextType } from "@/context/appContext";
import { debounce } from "lodash";

export const SearchBox = () => {
  const router = useRouter();
  const { searchText, setSearchText } = useContext(
    AppContext
  ) as AppContextType;

  const debounceSearch = useCallback(
    debounce(
      (query: string) =>
        router.push({ pathname: "/search", query: { q: query } }, undefined, {
          shallow: true,
        }),
      500
    ),
    []
  );

  const handleSearchResult = (value: string) => {
    debounceSearch(value);
    setSearchText(value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="movies..."
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => handleSearchResult(e.target.value)}
        value={searchText}
        type="text"
      />
    </Search>
  );
};
