import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getEventContent = createAsyncThunk('/event/content', async () => {
	const response = await axios.get('/get_all_events', {})
    console.log(response,"responce")
	return response.data;
})

export const eventSlice = createSlice({
    name: 'event',
    initialState: {
        isLoading: false,
        event : []
    },
    // reducers: {


    //     addNewLead: (state, action) => {
    //         let {newLeadObj} = action.payload
    //         state.leads = [...state.leads, newLeadObj]
    //     },

    //     deleteLead: (state, action) => {
    //         let {index} = action.payload
    //         state.leads.splice(index, 1)
    //     }
    // },

    extraReducers: {
		[getEventContent.pending]: state => {
			state.isLoading = true
		},
		[getEventContent.fulfilled]: (state, action) => {
			state.event = action.payload
			state.isLoading = false
           
		},
		[getEventContent.rejected]: state => {
			state.isLoading = false
		},
    }
})


export const { addNewLead, deleteLead } = eventSlice.actions

export default eventSlice.reducer