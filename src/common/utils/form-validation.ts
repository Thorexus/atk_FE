import useValidationSchema from 'common/libs/validation';
import * as yup from 'yup';

export const useFormValidation = () => {
  const createEventValidateSchema = yup.object({
    name: yup.string().required('โปรดกรอกข้อมูลให้ครบ'),
    floor: yup.number().required('โปรดกรอกข้อมูลให้ครบ'),
    room: yup.string().required('โปรดกรอกข้อมูลให้ครบ'),
    date: yup.date().required('โปรดกรอกข้อมูลให้ครบ'),
    dateClose: yup.date().required('โปรดกรอกข้อมูลให้ครบ'),
    description: yup.string().required('โปรดกรอกข้อมูลให้ครบ'),
  });

  const createEventValidation = useValidationSchema(createEventValidateSchema);

  const updateUserValidateSchema = yup.object({
    name: yup.string().required('โปรดกรอกข้อมูลให้ครบ'),
    lastname: yup.string().required('โปรดกรอกข้อมูลให้ครบ'),
    email: yup
      .string()
      .email('รูปแบบอีเมลไม่ถูกต้อง')
      .required('โปรดกรอกข้อมูลให้ครบ'),
    phone: yup
      .string()
      .min(10, 'โปรดกรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก')
      .required('โปรดกรอกข้อมูลให้ครบ'),
    birthdate: yup.date().required('โปรดกรอกข้อมูลให้ครบ'),
  });

  const updateUserValidate = useValidationSchema(updateUserValidateSchema);

  return { createEventValidation, updateUserValidate };
};
