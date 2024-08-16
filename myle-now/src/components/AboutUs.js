import "./AboutUs.css"
import rifa from '../assets/rifa.jpg'
import parth from '../assets/parth.jpg'
import aiyan from '../assets/aiyan.jpg'

function AboutUs(){
    return(
        <>
            <div className="about-us-header"><h1>ABOUT US</h1></div>
           <div className="about-container">

            <section className="who">
                <h2>WHO WE ARE</h2>
                <p>MYLE NOW is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their choosing. We promise our customers a high quality, standardised and reliable service experience. To fulfill this promise, we work closely with our hand-picked service partners, enabling them with technology, training, products, tools, financing, insurance and brand, helping them succeed and deliver on this promise.
                Our Vision: Empower millions of professionals worldwide to deliver services at home like never experienced before</p>
            </section>
            <section className="how">
                <h2>WHAT WE DO</h2>
                <p>MYLE NOW is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their choosing. We promise our customers a high quality, standardised and reliable service experience. To fulfill this promise, we work closely with our hand-picked service partners, enabling them with technology, training, products, tools, financing, insurance and brand, helping them succeed and deliver on this promise.
                Our Vision: Empower millions of professionals worldwide to deliver services at home like never experienced before</p>
            </section>
            <section className="team">
                <h2>OUR TEAM</h2>
               <div className="team-cards">
                <div className="team-card">
                    <img src={aiyan}></img>
                    <p className="leader-name">Afee Maknojia</p>
                    <p className="leader-position">Director</p>
                    <hr></hr>
                    <p className="leader-description">MYLE NOW is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their</p>
                </div>
                <div className="team-card">
                    <img src={rifa}></img>
                    <p className="leader-name">Rifa Prasla</p>
                    <p className="leader-position">Founder</p>
                    <hr></hr>
                    <p className="leader-description">MYLE NOW is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their</p>
                </div>
                <div className="team-card">
                    <img src={parth}></img>
                    <p className="leader-name">Parth Konkatti</p>
                    <p className="leader-position">CEO</p>
                    <hr></hr>
                    <p className="leader-description">MYLE NOW is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their</p>
                </div>
                

                </div>
                
            </section>
           </div>
        </>
    )
}

export default AboutUs