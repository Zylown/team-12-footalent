/* import { BASE_URL } from '../constants';
import { AppointmentsServices } from './appointmens-services';
import { DentistService } from './dentist-service';
import { PatientService } from './patient-service';
import { UserServices } from './user-services';

const userServices = new UserServices({ baseURL: BASE_URL });
const patientServices = new PatientService({ baseURL: BASE_URL })
const appointmentsServices = new AppointmentsServices({ baseURL: BASE_URL });
const dentistService = new DentistService({ baseURL: BASE_URL })

export { userServices, appointmentsServices, dentistService, patientServices }; */

export { getAppointments } from "./appointments/appointments-services";
export { getAllPatients } from "./patients/patients-services";
export { getDentists } from "./dentist/dentist-services";
export { getAllReasons } from "./reasons/reasons-services";
