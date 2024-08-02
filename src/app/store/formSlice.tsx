// store/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShutterDetail {
  shutterName: string;
  width: number;
  height: number;
  area: number;
}

interface GeneralDetails {
  personName: string;
  date: string;
  selectedCustomer: string;
  customers: string[];
}

interface Discount {
  type: 'Amount' | 'Percentage' | '';
  value: number | '';
  totalAfterDiscount: number;
}

interface FormState {
  generalDetails: GeneralDetails;
  shutterDetails: ShutterDetail[];
  discount: Discount;
}

const initialState: FormState = {
  generalDetails: {
    personName: '',
    date: '',
    selectedCustomer: '',
    customers: [],
  },
  shutterDetails: [],
  discount: {
    type: '',
    value: '',
    totalAfterDiscount: 0,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setGeneralDetails(state, action: PayloadAction<GeneralDetails>) {
      state.generalDetails = action.payload;
    },
    addCustomer(state, action: PayloadAction<string>) {
      state.generalDetails.customers.push(action.payload);
    },
    setShutterDetails(state, action: PayloadAction<ShutterDetail[]>) {
      state.shutterDetails = action.payload;
    },
    addShutter(state, action: PayloadAction<ShutterDetail>) {
      state.shutterDetails.push(action.payload);
    },
    removeShutter(state, action: PayloadAction<number>) {
      state.shutterDetails = state.shutterDetails.filter((_, index) => index !== action.payload);
    },
    cloneShutter(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.shutterDetails.push({ ...state.shutterDetails[index] });
    },
    setDiscount(state, action: PayloadAction<Discount>) {
      state.discount = action.payload;
    },
    updateTotalAfterDiscount(state) {
      const totalArea = state.shutterDetails.reduce((acc, shutter) => acc + shutter.area, 0);
      const total = state.discount.type === 'Percentage'
        ? totalArea - (totalArea * (state.discount.value as number)) / 100
        : totalArea - (state.discount.value as number);

      state.discount.totalAfterDiscount = total;
    },
  },
});

export const {
  setGeneralDetails,
  addCustomer,
  setShutterDetails,
  addShutter,
  removeShutter,
  cloneShutter,
  setDiscount,
  updateTotalAfterDiscount,
} = formSlice.actions;

export default formSlice.reducer;
