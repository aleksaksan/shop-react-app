import { createSlice, PayloadAction, createAsyncThunk, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProductShortModel } from '../models/Product';
import { productstUrl } from '../consts/consts';

export type Item = {
  id: string;
  title: string;
  price: number;
  weight: string;
  quantity: number;
  description: string;
  src: string;
};

type CatalogState = {
  list: Item[];
  isLoading: boolean;
  error: string | null;
};

export const fetchCatalog = createAsyncThunk<Item[], undefined, {rejectValue: string}>(
    'catalog/fetchCatalog',
    async function (_, { rejectWithValue }) {
      const response = await axios.get(`${productstUrl}`);

      if (response.status !== 200) {
        return rejectWithValue('Server Error!');
      }
      const data = await response.data as IProductShortModel[];

      const res: Item[] = data.map(item => {
        return {
          id: item.id,
          title: item.title,
          price: item.price,
          weight: item.weight,
          quantity: 0,
          description: item.description,
          src: item.thumbnail,
        }
      })
      return res;
    }
);


const initialState: CatalogState = {
  list: [],
  isLoading: false,
  error: null,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    add (state, action: PayloadAction<string>) {
      const addedItem = state.list.find(item => item.id == action.payload);
      if (addedItem) {
        if (!addedItem.quantity) {
          addedItem.quantity = 0;
        }
        addedItem.quantity += 1;
      }
    },
    remove (state, action: PayloadAction<string>) {
      const removedItem = state.list.find(item => item.id == action.payload);
      if (removedItem) {
        removedItem.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { add, remove } = catalogSlice.actions;

export default catalogSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}
