import AdminRoute from 'common/authentication/admin-route';
import ButtonGroup from 'common/base-ui/buttons/button-group';
import FieldDropdown from 'common/base-ui/field/field-dropdown';
import FieldDatePicker from 'common/base-ui/field/date-picker';
import FieldTimePicker from 'common/base-ui/field/time-picker';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import TextField from 'common/base-ui/field/text-field';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useViewModel } from './viewmodel';
import { roomList } from 'common/constants/room-list';
import TextArea from 'common/base-ui/field/text-area';
import { ADMIN_ROUTE } from 'common/constants/route-path';
import { useFormValidation } from 'common/utils/form-validation';

const AdminCreateEventPage = () => {
  const navigate = useNavigate();
  const { handleCreateEvent } = useViewModel();
  const { createEventValidation } = useFormValidation();

  return (
    <AdminRoute>
      <BasePageHeader
        action="child"
        onBack={() => navigate(ADMIN_ROUTE.DASHBOARD)}
      />

      <SectionTitle title="สร้างอีเวนท์" />

      <div className="flex flex-1 flex-col overflow-visible rounded-lg bg-white p-2">
        <Form
          onSubmit={handleCreateEvent}
          validate={createEventValidation}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
              <TextField
                name="name"
                label="ชื่ออีเวนท์"
                placeholder="ชื่ออีเวนท์"
              />
              <FieldDropdown
                name="floor"
                placeholder="เลือกชั้น"
                label="ชั้น"
                options={roomList}
              />
              <TextField name="room" placeholder="ห้อง" label="ห้อง" />
              <div className="flex items-center gap-x-2">
                <FieldDatePicker
                  name="date"
                  label="วันที่เริ่ม"
                  placeholder="เลือกวันที่"
                  showOnlyThisYear
                />
                <FieldTimePicker name="time" label="เวลาเริ่ม" />
              </div>
              <div className="flex items-center gap-x-2">
                <FieldDatePicker
                  name="dateClose"
                  label="วันที่สิ้นสุด"
                  placeholder="เลือกวันที่"
                  showOnlyThisYear
                />
                <FieldTimePicker name="timeClose" label="เวลาสิ้นสุด" />
              </div>
              <TextArea
                name="description"
                placeholder="คำอธิบาย"
                label="คำอธิบาย"
                className="overflow-y-auto"
              />
              {/* dateClose: new Date(values.dateClose).toISOString(),
      hrClose: eventCloseTime.hour,
      minuteClose: eventCloseTime.minute, */}

              <ButtonGroup
                confirmButtonType="submit"
                confirmButtonTitle="สร้างอีเวนท์"
                cancelButtonTitle="ยกเลิก"
                cancelButtonClick={() => navigate(-1)}
                isLoading={submitting}
                className="mt-6 mb-0"
              />
            </form>
          )}
        />
      </div>
    </AdminRoute>
  );
};

export default AdminCreateEventPage;
