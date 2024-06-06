import { useParams } from "react-router-dom";
import ServiceDetailSection from "../components/ServiceDetailSection";

function ServiceDetails() {
  const { id } = useParams();
  console.log(id);

  // Use the id as needed, for example, fetching data based on the id

  return (
    <>
      <ServiceDetailSection/>
    </>
  );
}

export default ServiceDetails;
