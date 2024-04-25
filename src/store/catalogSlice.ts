import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type Item = {
  id: string;
  title: string;
  price: string;
  weight: string;
  quantity: number;
  description: string;
};

type CatalogState = {
  list: Item[];
  loading: boolean;
  error: string | null;
};

export const fetchItems = createAsyncThunk<Item[], undefined, {rejectValue: string}>(
    'catalog/fetchCatalog',
    async function (_, { rejectWithValue }) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();

      return data;
    }
);


const initialState: CatalogState = {
  list: [],
  loading: false,
  error: null,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    add (state, action: PayloadAction<string>) {
      const addedItem = state.list.find(item => item.id === action.payload);
      if (addedItem) {
        addedItem.quantity + 1
      }
    },
    remove (state, action: PayloadAction<string>) {
      const removedItem = state.list.find(item => item.id === action.payload);
      if (removedItem) {
        removedItem.quantity - 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

// export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;
export const { add, remove } = catalogSlice.actions;

export default catalogSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}