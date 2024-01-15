import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';



interface LaunchObject extends Record<string, unknown> {}

interface State {
 launches: LaunchObject[];
}
const initialState: State = {
    launches: [],
   }
   
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<LaunchObject[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.launches=action.payload
    //   console.log(typeof(action.payload))
    },
   
  },
  
    extraReducers:(builder)=>{
        builder.addCase(getlaunches.fulfilled,(state,action)=>{
            state.launches=action.payload
            

        })
        
    }
})
export const getlaunches=createAsyncThunk("counter",async ()=>{
    const response= await axios("https://api.spacexdata.com/v3/launches")
        const data:any[] = response.data
        return data
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions

export default counterSlice.reducer