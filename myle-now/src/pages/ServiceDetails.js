import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ServiceColoredSection from "../components/ServiceColoredSection";

import '../components/DetailsInsList.css';
import '../components/ServiceDetailSection.css';



function ServiceDetailSection({ serviceDetails }) {
  const { _id } = serviceDetails?.service_id;
  const { addToCart, isLoading, error } = useCart();

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(error);
    }
  };

  const imagePath = require(`../assets/${serviceDetails.image}`);
  return (
    <div className="details-topsection">
      <div className="details">
        <h2>{serviceDetails.service_id.name}</h2>
        <p className="desc">{serviceDetails.long_description}</p>
        <div>
          <p>CAD {serviceDetails.service_id.price}</p>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => handleAddToCart(_id)}
            disabled={isLoading}
          >
            {isLoading ? "loading..." : "ADD"}
          </button>{" "}
        </div>
      </div>
      <div className="image">
        <img src={imagePath} alt={serviceDetails.service_id.name}></img>
      </div>
    </div>
  );
}

function DetialsInsListItem({ number, text, desc }) {
    return (
        <li>
            <span>{number}</span>
            {/* eslint-disable-next-line */}
            <a href="#">{text}</a><br></br>
            <p>{desc}</p>
        </li>
    );
}

function DetailsInsList({ children }) {
    return (
        <div className='process-section'>
            <h2>About The Process</h2>
            <ul className="list-ic vertical">
                {children.map((child, index) => (
                    <DetialsInsListItem
                        key={index}
                        number={index + 1}
                        text={child.stepHeader}
                        desc={child.stepDetail}
                    />
                ))}
            </ul>
        </div>
    );
}

function ServiceDetails() {
    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await fetch(`/api/service/details/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch service details');
                }
                const data = await response.json();
                setServiceDetails(data);
            } catch (error) {
                setError('Error fetching service details');
                console.error('Error fetching service details:', error);
            }
        };

        fetchServiceDetails();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!serviceDetails) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <ServiceDetailSection serviceDetails={serviceDetails} />
            <ServiceColoredSection />
            <DetailsInsList children={serviceDetails.process_steps} />
        </>
    );
}

export default ServiceDetails;
