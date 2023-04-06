import AdminService from './admin.service';
import CreateEventDTO from './dto/create-event.dto';
import UpdateEventDTO from './dto/update-event-dto';
import UpdateUserDTO from './dto/update-user.dto';

class AdminRepository {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  createEvent = (data: CreateEventDTO) => {
    return this.adminService.createEvent(data);
  };

  updateEvent = (data: UpdateEventDTO) => {
    return this.adminService.updateEvent(data);
  };

  createParticipant = (data: FormData) => {
    return this.adminService.createParticipant(data);
  };

  deleteUser = ({ id, token }: { id: number; token: string }) => {
    return this.adminService.deleteUser({ id, token });
  };

  uploadProfileImage = (data: FormData) => {
    return this.adminService.uploadProfileImage(data);
  };

  updateUser = (data: UpdateUserDTO) => {
    return this.adminService.updateUser(data);
  };
}

export default AdminRepository;
