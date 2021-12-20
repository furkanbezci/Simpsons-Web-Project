import React from 'react';
import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  Intent,
  TextArea
} from '@blueprintjs/core';
import { useFormik } from 'formik';
import { FormFields } from '../utils/FormFields';
import * as yup from 'yup';
import { useEffect } from 'react/cjs/react.development';
import { LocalStorageTerminal } from '../utils/LocalStoragetTerminal';
import { CustomToaster } from '../utils/Toaster';

const validationSchema = yup.object().shape({
  name: yup.string().required().min(2, 'At least two character')
});
const AddNewCharacterModal = props => {
  const onSaveForm = values => {
    LocalStorageTerminal.getItem('simpsonsData').then(res => {
      const randomId = Math.round(Math.random() * 1000000);
      LocalStorageTerminal.setItem('simpsonsData', [...res, { ...values, id: randomId}])
        .then(res => {
          props.successCallback();
          CustomToaster('success', 'Submit Successfull');
        })
        .catch(err => CustomToaster('success', 'Something went wrong'));
    });

    console.log(values);
  };
  const formik = useFormik({
    initialValues: FormFields,
    onSubmit: values => {
      onSaveForm(values);
    },
    validationSchema: validationSchema
  });
  const {
    values,
    errors,
    setValues,
    setFieldValues,
    handleBlur,
    handleChange,
    setSubmitting,
    handleSubmit
  } = formik;

  const onCloseAddModal = () => {
    props.onCloseAddModal();
  };
  return (
    <Dialog
      title='Add New Simpson Character'
      isOpen={props.isOpenModal}
      onClose={onCloseAddModal}
      className='add-dialog-container'
    >
      <FormGroup
        label='Name Surname:'
        helperText={errors?.name}
        intent={errors?.name ? 'danger' : 'none'}
      >
        <InputGroup
          id='name'
          name='name'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          intent={errors?.name ? 'danger' : 'none'}
        />
      </FormGroup>
      <FormGroup label='Job Title:'>
        <InputGroup id='job' name='job' onChange={handleChange} />
      </FormGroup>
      <FormGroup label='About Him/Her:'>
        <TextArea
          id='about'
          name='about'
          fill
          style={{ maxWidth: 500, maxHeight: 600 }}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup label='Image Link:' id='avatar' name='avatar' onChange={handleChange}>
        <InputGroup />
      </FormGroup>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button text='Submit' type='submit' intent={Intent.SUCCESS} onClick={handleSubmit} />
        <Button text='Close' intent={Intent.DANGER} onClick={onCloseAddModal} />
      </div>
    </Dialog>
  );
};
export default AddNewCharacterModal;
