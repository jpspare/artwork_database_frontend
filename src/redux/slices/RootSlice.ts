import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: "Title",
        artist: "Artist",
        medium: "Medium",
        date: "Date",
        origin: "Origin",
    },
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload },
        chooseArtist: (state, action) => { state.artist = action.payload },
        chooseMedium: (state, action) => { state.medium = action.payload },
        chooseDate: (state, action) => { state.date = action.payload },
        chooseOrigin: (state, action) => { state.origin = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseTitle, chooseArtist, chooseMedium, chooseDate, chooseOrigin } = rootSlice.actions