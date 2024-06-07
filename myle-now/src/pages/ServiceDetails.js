import { useParams } from "react-router-dom";
import ServiceDetailSection from "../components/ServiceDetailSection";
import ServiceColoredSection from "../components/ServiceColoredSection";
import DetailsInsList from "../components/DetailsInsList";

function ServiceDetails() {
  const { id } = useParams();
  console.log(id);

  // Use the id as needed, for example, fetching data based on the id

  return (
    <>
      <ServiceDetailSection/>
      <ServiceColoredSection/>
      <DetailsInsList children={[
        {text:'CONSULTATIONS',desc:'Professional understands customer needs and hair condition to suggest suitable options'},
        {text:'CONSULTATIONS',desc:'Professional understands customer needs and hair condition to suggest suitable options'},
        {text:'CONSULTATIONS',desc:'Professional understands customer needs and hair condition to suggest suitable options'},
        {text:'CONSULTATIONS',desc:'Professional understands customer needs and hair condition to suggest suitable options'},
        {text:'CONSULTATIONS',desc:'Professional understands customer needs and hair condition to suggest suitable options'},
        {text:'CONSULTATIONS',desc:'Professional understands customer needs and hair condition to suggest suitable options'}
       
      ]}/>
    </>
  );
}

export default ServiceDetails;
