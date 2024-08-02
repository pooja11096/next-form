'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setGeneralDetails, addCustomer } from '../store/formSlice';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import DatePicker from '../components/DatepickerComponent';

interface GeneralDetailsForm {
  personName: string;
  date: string;
  selectedCustomer: string;
}

export default function GeneralDetails() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue } = useForm<GeneralDetailsForm>({
    defaultValues: {
      personName: '',
      date: '',
      selectedCustomer: '',
    },
  });

  const generalDetails = useSelector((state: any) => state.form.generalDetails);
  const customers = generalDetails.customers;
  const selectedCustomer = watch('selectedCustomer');

  const onSubmit = (data: GeneralDetailsForm) => {
    dispatch(setGeneralDetails({ ...data, customers }));
  };

  const handleAddCustomer = () => {
    const customerName = prompt('Enter customer name');
    if (customerName) {
      dispatch(addCustomer(customerName));
      setValue('selectedCustomer', customerName);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Person Name:</label>
        <Input
          type="text"
          name="personName"
          value={watch('personName')}
          onChange={(e) => setValue('personName', e.target.value)}
          placeholder="Enter person name"
        />
      </div>
      <div>
        <label>Date:</label>
        <DatePicker
          name="date"
          value={watch('date')}
          onChange={(e) => setValue('date', e.target.value)}
        />
      </div>
      <div>
        <label>Select Customer:</label>
        <Dropdown
          name="selectedCustomer"
          options={customers}
          selectedValue={selectedCustomer}
          onChange={(e) => setValue('selectedCustomer', e.target.value)}
        />
        <Button type="button" onClick={handleAddCustomer}>Create Customer</Button>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
