'use client'

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { setDiscount, updateTotalAfterDiscount } from '../store/formSlice';
import RadioButtonGroup from '../components/RadioButton';

interface DiscountForm {
  discountType: 'Amount' | 'Percentage';
  discountValue: number;
}

export default function DiscountDetails() {
  const dispatch = useDispatch();
  const { handleSubmit, watch, setValue, getValues } = useForm<DiscountForm>({
    defaultValues: {
      discountType: 'Amount',
      discountValue: 0,
    },
  });

  const form = useSelector((state: any) => state.form);

  const discountType = watch('discountType');
  const discountValue = watch('discountValue');

  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>(form.totalAmount);

  useEffect(() => {
    const calculateTotalAfterDiscount = () => {
      const totalAmount = form.totalAmount;
      let discountedAmount = totalAmount;

      if (discountType === 'Amount') {
        discountedAmount = Math.max(totalAmount - discountValue, 0); // Ensure no negative values
      } else if (discountType === 'Percentage') {
        discountedAmount = Math.max(totalAmount - (totalAmount * discountValue / 100), 0); // Ensure no negative values
      }

      return discountedAmount;
    };

    const newTotalAfterDiscount = calculateTotalAfterDiscount();
    setTotalAfterDiscount(newTotalAfterDiscount);
    dispatch(setDiscount({
      discountType: discountType,
      discountValue,
      totalAfterDiscount: newTotalAfterDiscount,
    }));
  }, [discountType, discountValue, form.totalAmount, dispatch]);

  const onSubmit: SubmitHandler<DiscountForm> = (data) => {
    // No need to recalculate here as useEffect handles it
    dispatch(setDiscount({
      discountType: data.discountType,
      discountValue: data.discountValue,
      totalAfterDiscount: totalAfterDiscount,
    }));
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioButtonGroup
        name="discountType"
        options={[
          { value: 'Amount', label: 'Amount' },
          { value: 'Percentage', label: 'Percentage' }
        ]}
        selectedValue={discountType}
        onChange={(value:any) => setValue('discountType', value)}
      />
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
          value={totalAfterDiscount}
          readOnly
        />
      </div>
      <Button type="submit">Apply Discount</Button>
    </form>
  );
}
