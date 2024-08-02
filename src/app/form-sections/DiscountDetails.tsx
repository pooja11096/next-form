'use client'

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';

interface DiscountForm {
  discountType: 'Amount' | 'Percentage';
  discountValue: number;
}

export default function DiscountDetails() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, getValues } = useForm<DiscountForm>({
    defaultValues: {
      discountType: 'Amount',
      discountValue: 0,
    },
  });

  const totalAmount = useSelector((state: any) => state.form.totalAmount) || 0; // Default to 0 if undefined

  const discountType = watch('discountType');
  const discountValue = watch('discountValue');

  // Calculate total after discount
  const calculateTotalAfterDiscount = () => {
    if (discountType === 'Amount') {
      return Math.max(totalAmount - discountValue, 0); // Ensure no negative values
    } else if (discountType === 'Percentage') {
      return Math.max(totalAmount - (totalAmount * discountValue / 100), 0); // Ensure no negative values
    }
    return totalAmount;
  };

  useEffect(() => {
    // Trigger the effect to set totalAfterDiscount
    const totalAfterDiscount = calculateTotalAfterDiscount();
    // Do not use setValue for non-form fields
  }, [discountType, discountValue, totalAmount]);

  const onSubmit: SubmitHandler<DiscountForm> = (data) => {
    const totalAfterDiscount = calculateTotalAfterDiscount();
    dispatch({
      type: 'SET_DISCOUNT',
      payload: {
        ...data,
        totalAfterDiscount,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Discount Type:</label>
        <div>
          <label>
            <input
              type="radio"
              value="Amount"
              {...register('discountType')}
            /> Amount
          </label>
          <label>
            <input
              type="radio"
              value="Percentage"
              {...register('discountType')}
            /> Percentage
          </label>
        </div>
      </div>
      <div>
        <label>Discount Value:</label>
        <Input
          type="number"
          name="discountValue"
          value={getValues('discountValue')}
          onChange={(e) => setValue('discountValue', Number(e.target.value))}
          min={discountType === 'Percentage' ? 1 : undefined}
        />
      </div>
      <div>
        <label>Total After Discount:</label>
        <Input
          type="text"
          name="totalAfterDiscount"
          value={calculateTotalAfterDiscount()}
          readOnly
        />
      </div>
      <Button type="submit">Apply Discount</Button>
    </form>
  );
}
