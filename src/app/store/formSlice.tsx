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
  discountType: 'Amount' | 'Percentage' | '';
  discountValue: number | '';
  totalAfterDiscount: number;
}

interface FormState {
  generalDetails: GeneralDetails;
  shutterDetails: ShutterDetail[];
  discount: Discount;
  shutters: string[];
  totalAmount: number;
}

const initialState: FormState = {
  generalDetails: {
    personName: '',
    date: '',
    selectedCustomer: '',
    customers: []
  },
  shutterDetails: [],
  discount: {
    discountType: '',
    discountValue: 0,
    totalAfterDiscount: 0,
  },
  shutters:[],
  totalAmount:0
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
    addShutter(state, action: PayloadAction<string>){
      state.shutters.push(action.payload);
    },
    setShutterDetails(state, action: PayloadAction<ShutterDetail[]>) {
      state.shutterDetails = action.payload;
    },
    addShutterDetails(state, action: PayloadAction<ShutterDetail>) {
      state.shutterDetails.push(action.payload);
    },
    removeShutter(state, action: PayloadAction<number>) {
      state.shutterDetails = state.shutterDetails.filter((_, index) => index !== action.payload);
    },
    cloneShutter(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.shutterDetails.push({ ...state.shutterDetails[index] });
    },
    setTotalAmount(state, action: PayloadAction<number>){
      state.totalAmount = action.payload;
    },
    setDiscount(state, action: PayloadAction<Discount>) {
      state.discount = action.payload;
    },
    updateTotalAfterDiscount(state) {
      const totalArea = state.shutterDetails.reduce((acc, shutter) => acc + shutter.area, 0);
      const total = state.discount.discountType === 'Percentage'
        ? totalArea - (totalArea * (state.discount.discountValue as number)) / 100
        : totalArea - (state.discount.discountValue as number);

      state.discount.totalAfterDiscount = total;
    },
  },
});

export const {
  setGeneralDetails,
  addCustomer,
  setShutterDetails,
  addShutterDetails,
  addShutter,
  removeShutter,
  cloneShutter,
  setTotalAmount,
  setDiscount,
  updateTotalAfterDiscount,
} = formSlice.actions;

export default formSlice.reducer;
