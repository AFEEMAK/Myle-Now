import { useParams } from "react-router-dom";
import ServiceDetailSection from "../components/ServiceDetailSection";
import ServiceColoredSection from "../components/ServiceColoredSection";

function ServiceDetails() {
  const { id } = useParams();
  console.log(id);

  // Use the id as needed, for example, fetching data based on the id

  return (
    <>
      <ServiceDetailSection/>
      <ServiceColoredSection/>
    </>
  );
}

export default ServiceDetails;
