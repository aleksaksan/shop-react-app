import { createSlice, PayloadAction, createAsyncThunk, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../assets/consts';

type Card = {
  id: string;
  title: string;
  price: number;
  weight: string;
  quantity: number;
  description: string;
  srcs: Image []
};

export type Image = {
  id: string,
  src: string
}

type CardState = {
  card: Card | undefined;
  isLoading: boolean;
  error: string | null;
};

export const fetchCard = createAsyncThunk<Card, string | undefined, {rejectValue: string}>(
    'catalog/fetchCard',
    async function (id, { rejectWithValue }) {
      const response = await axios.get(`${baseUrl}/api/products/${id}`);

      if (response.status !== 200) {
        return rejectWithValue('Server Error!');
      }
      const data = await response.data;
      
      return data;
    }
);


const initialState: CardState = {
  card: undefined,
  isLoading: false,
  error: null,
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    // add (state, action: PayloadAction<string>) {
    //   const addedItem = state.list.find(item => item.id === action.payload);
    //   if (addedItem) {
    //     if (!addedItem.quantity) {
    //       addedItem.quantity = 0;
    //     }
    //     addedItem.quantity += 1;
    //   }
    // },
    // remove (state, action: PayloadAction<string>) {
    //   const removedItem = state.list.find(item => item.id === action.payload);
    //   if (removedItem) {
    //     removedItem.quantity -= 1;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.card = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

// export const { add, remove } = catalogSlice.actions;

export default cardSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}
