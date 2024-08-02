'use client'

import React, { useState, useCallback } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addShutter, removeShutter, cloneShutter, setShutterDetails } from '../store/formSlice';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface ShutterDetailForm {
  shutterName: string;
  width: number;
  height: number;
  area: number;
}

interface FormValues {
  shutterDetails: ShutterDetailForm[];
}

export default function ShutterDetails() {
  const dispatch = useDispatch();
  const { register, handleSubmit, control, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      shutterDetails: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shutterDetails',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShutterName, setNewShutterName] = useState('');

  const shutterNames = useSelector((state: any) => 
    state.form.shutterDetails.map((shutter: ShutterDetailForm) => shutter.shutterName)
  );

  const calculateTotalArea = () => {
    return fields.reduce((acc, field) => acc + field.area, 0);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setShutterDetails(data.shutterDetails));
  };

  const handleAddShutterName = useCallback((name: string) => {
    // Update dropdown options in your state
    dispatch(addShutter(name));
    setIsModalOpen(false);
  }, [dispatch]);

  const handleCreateShutter = () => {
    setIsModalOpen(true);
  };

  const handleCloneShutter = (index: number) => {
    const shutterToClone = getValues('shutterDetails')[index];
    append({
      ...shutterToClone,
      shutterName: shutterToClone.shutterName, // Copy the shutter name
    });
  };

  const totalArea = calculateTotalArea();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} style={{ marginBottom: '1rem' }}>
            <label>Shutter Name:</label>
            <Dropdown
              name={`shutterDetails.${index}.shutterName`}
              options={shutterNames}
              selectedValue={field.shutterName}
              onChange={(e) => {
                const updatedShutterDetails = [...getValues('shutterDetails')];
                updatedShutterDetails[index].shutterName = e.target.value;
                setValue('shutterDetails', updatedShutterDetails);
              }}
            />
            <Button type="button" onClick={handleCreateShutter}>Create Shutter</Button>

            <label>Width:</label>
            <Input
              type="number"
              name={`shutterDetails.${index}.width`}
              value={field.width}
              onChange={(e) => {
                const width = parseFloat(e.target.value);
                const updatedShutterDetails = [...getValues('shutterDetails')];
                updatedShutterDetails[index].width = width;
                updatedShutterDetails[index].area = width * updatedShutterDetails[index].height;
                setValue('shutterDetails', updatedShutterDetails);
              }}
            />

            <label>Height:</label>
            <Input
              type="number"
              name={`shutterDetails.${index}.height`}
              value={field.height}
              onChange={(e) => {
                const height = parseFloat(e.target.value);
                const updatedShutterDetails = [...getValues('shutterDetails')];
                updatedShutterDetails[index].height = height;
                updatedShutterDetails[index].area = height * updatedShutterDetails[index].width;
                setValue('shutterDetails', updatedShutterDetails);
              }}
            />

            <label>Area:</label>
            <Input
              type="text"
              name={`shutterDetails.${index}.area`}
              value={field.area}
              readOnly
            />

            <Button type="button" onClick={() => remove(index)}>Remove</Button>
            <Button type="button" onClick={() => handleCloneShutter(index)}>Clone</Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ shutterName: '', width: 0, height: 0, area: 0 })}>Add Shutter</Button>
        <div>Total Area: {totalArea}</div>
        <Button type="submit">Save</Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddShutterName}
      />
    </>
  );
}
