import { useParams } from "react-router-dom";
import HistoryClinic from "../../sections/Pacientes/History-clinic/HistoryClinic";

export default function History() {
  const { id } = useParams(); //o const id = useParams().id; lo trae del url

  return (
    <div className="bg-[#fafdff] flex justify-center">
      <HistoryClinic patientId={id} />
    </div>
  );
}
