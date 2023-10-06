import React, { useCallback, useContext, useEffect } from "react";
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

  const debounceRouteSwitch = useCallback(
    debounce(() => router.push("/search"), 500),
    []
  );

  const handleSearchResult = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    if (searchText.length && router.asPath !== "/search") {
      debounceRouteSwitch();
    }
  }, [searchText]);

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
