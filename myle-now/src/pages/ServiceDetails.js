import { useParams } from "react-router-dom";

import ServiceColoredSection from "../components/ServiceColoredSection";

import '../components/DetailsInsList.css'
import '../components/ServiceDetailSection.css'

import main from '../assets/main.jpg';

function ServiceDetailSection(){
    return(
        <div className='details-topsection'> 
            <div className="details">
                <h2>Haircut For Men</h2>
                <p className='desc'>At MYLEZ, we take pride in offering exceptional professional haircut services tailored to meet your individual style needs. Our team of highly skilled and experienced stylists is dedicated to providing you with a personalized and satisfying haircut experience.</p>
                <div>
                    <p>Cad 50</p>
                    <button>Add</button>
                </div>
            </div>
            <div className="image">
                <img src= {main} alt={main}></img>
            </div>
        </div>
    )
}





function DetialsInsListItem({number , text,desc}){
    return(
    <li>
    <span>{number}</span>
    {/* eslint-disable-next-line*/}
    <a href="#">{text}</a><br></br>
    <p>{desc}</p>
  </li>
    )
}

function DetailsInsList({children}){
return(
    <div className='process-section'>
    <h2>About The Process</h2>

<ul class="list-ic vertical">

    {children.map((child, index) => (
                <DetialsInsListItem
                    number={index + 1}
                    text={child.text}
                    desc={child.desc}
                />
            ))}
</ul>
    </div>
)
}


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
