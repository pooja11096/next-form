'use client'
import Image from "next/image";
import GeneralDetails from "./form-sections/GeneralDetails";
import ShutterDetails from "./form-sections/ShutterDetails";
import DiscountDetails from "./form-sections/DiscountDetails";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function Home() {
  return (
    <Provider store={store}>
    <div>
      <h1>Form</h1>
      <GeneralDetails/>
      <ShutterDetails/>
      <DiscountDetails/>
    </div>
    </Provider>

  );
}
