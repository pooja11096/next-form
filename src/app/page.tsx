'use client'
import Image from "next/image";
import GeneralDetails from "./form-sections/GeneralDetails";
import ShutterDetails from "./form-sections/ShutterDetails";
import DiscountDetails from "./form-sections/DiscountDetails";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <h1>Form</h1>
          <GeneralDetails/>
          <ShutterDetails/>
          <DiscountDetails/>
        </div>
    </PersistGate>
    </Provider>

  );
}
