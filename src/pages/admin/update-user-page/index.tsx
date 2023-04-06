import AdminRoute from 'common/authentication/admin-route';
import ButtonGroup from 'common/base-ui/buttons/button-group';
import FieldDatePicker from 'common/base-ui/field/date-picker';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import TextField from 'common/base-ui/field/text-field';
import { Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useViewModel } from './viewmodel';
import { useFormValidation } from 'common/utils/form-validation';
import { ReactComponent as LoaderIcon } from 'assets/icons/loader.svg';

const AdminUpdateUserPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { handleUpdateUser, userInfo, isLoading } = useViewModel();
  const { updateUserValidate } = useFormValidation();

  return (
    <AdminRoute>
      <BasePageHeader
        action="child"
        onBack={() => navigate(`/admin/event/${params.id}`)}
      />

      <SectionTitle title="แก้ไขผู้ใช้งาน" />

      <div className="flex flex-col overflow-visible rounded-lg bg-white p-2">
        {isLoading ? (
          <div className="grid h-full min-h-[632px] place-content-center">
            <LoaderIcon className="h-[80px] w-[80px] animate-spin text-primary-500" />
          </div>
        ) : (
          <Form
            onSubmit={handleUpdateUser}
            validate={updateUserValidate}
            initialValues={{
              name: userInfo.getName(),
              lastname: userInfo.getLastName(),
              email: userInfo.getEmail(),
              phone: userInfo.getPhoneNumber(),
              birthdate: new Date(userInfo.getBirthDate()),
            }}
            render={({ handleSubmit, submitting }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                  <TextField
                    name="name"
                    label="ชื่อจริง"
                    placeholder="ชื่อจริง"
                  />
                  <TextField
                    name="lastname"
                    label="นามสกุล"
                    placeholder="นามสกุล"
                  />
                  <TextField name="email" label="อีเมล" placeholder="อีเมล" />
                  <TextField
                    name="phone"
                    label="เบอร์โทรศัพท์"
                    placeholder="เบอร์โทรศัพท์"
                    maxLength={10}
                  />
                  <FieldDatePicker
                    name="birthdate"
                    label="วันเกิด"
                    placeholder="เลือกวันเกิด"
                  />

                  <ButtonGroup
                    confirmButtonType="submit"
                    confirmButtonTitle="แก้ไขผู้ใช้งาน"
                    cancelButtonTitle="ยกเลิก"
                    cancelButtonClick={() =>
                      navigate(`/admin/event/${params.id}`)
                    }
                    isLoading={submitting}
                    className="mt-6 mb-0"
                  />
                </form>
              );
            }}
          />
        )}
      </div>
    </AdminRoute>
  );
};

export default AdminUpdateUserPage;
