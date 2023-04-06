import { setIn } from 'final-form';
import { useMemo } from 'react';
import ObjectSchema from 'yup/lib/object';

const setInError = (errors: any, innerError: any) => {
  return setIn(errors, innerError.path, innerError.message);
};

const emptyObj = Object.create(null);

export const makeValidate = (schema: ObjectSchema<any>) => {
  return async function validate(values: any) {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      return err.inner.reduce(setInError, emptyObj);
    }
  };
};

function useValidationSchema(schema: ObjectSchema<any>) {
  const validate = useMemo(() => makeValidate(schema), [schema]);

  return validate;
}

export default useValidationSchema;
