import { createSlice } from "@reduxjs/toolkit";
import { Navbar_Items } from "../constants";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {},
        activeTab: Navbar_Items[1].name,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const { setUserData, setActiveTab } = userSlice.actions
export default userSlice.reducer