import { createSlice } from "@reduxjs/toolkit";
import { SortOrderElements } from "../constants";

const repoSlice = createSlice({
  name: "repo",
  initialState: {
    allData: [],
    searchTerm: "",
    typeFilter: "ALL",
    language: "ALL",
    allLanguages: ["ALL"],
    sort: SortOrderElements[0].field,
    showResult: false,
    isLoading: true
  },
  reducers: {
    setAllRepoData: (state, action) => {
      state.allData = action.payload;
      state.isLoading = false;
      state.allLanguages = [
        "ALL",
        ...new Set(
          action.payload
            ?.map((item) => item?.language)
            ?.filter((item) => item?.length) || []
        ),
      ];
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.showResult = true;
    },
    setType: (state, action) => {
      state.typeFilter = action.payload;
      state.showResult = true;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    clearFilter: (state) => {
      state.language = "ALL";
      state.searchTerm = "";
      state.typeFilter = "ALL";
      state.sort = SortOrderElements[0].field;
      state.showResult = false;
    },
  },
});

export const {
  setAllRepoData,
  setLanguage,
  setSearchTerm,
  setType,
  setSort,
  clearFilter,
} = repoSlice.actions;
export default repoSlice.reducer;
