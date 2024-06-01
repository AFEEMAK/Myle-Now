import './HomeHeader.css';
import massage from'../assets/massage.png';
import main from '../assets/main.jpg';

function HomeHeader() {

   
    return (
        <>
    
      <div className='header'>
 
        <section className="suggestions">
            <div>
                <h1>QUALITY SERVICES AT YOUR DOORSTEP!</h1>
            </div>

            <div>
            
           <div className='suggestionsContainer'>
            <h3>What are you looking for?</h3>

            <div className='suggestionGrid'>
            
                <div className='grid-item1'>
                    <img src= {massage} alt=''></img>
                    <p>Haircut and Beard styling</p>
                </div>

                <div className='grid-item2'>
                    <img src= {massage} alt=''></img>
                    <p>Haircut and Beard styling</p>
                </div>

                <div className='grid-item3'>
                    <img src= {massage} alt=''></img>
                    <p>Haircut and Beard styling</p>
                </div>
                <div className='grid-item4'>
                    <img src= {massage} alt=''></img>
                    <p>Haircut and Beard styling</p>
                </div>
                <div className='grid-item5'>
                    <img src= {massage} alt=''></img>
                    <p>Haircut and Beard styling</p>
                </div>
                <div className='grid-item6'>
                    <img src= {massage} alt=''></img>
                    <p>Haircut and Beard styling</p>
                </div>

            </div>
            </div>
            </div>
        </section>
        <section className='headerTransition'>
            
            
            <div className='transitions'>
                <img src= {main} alt=''></img>  
            </div>
            
        </section>

      </div>
      </>
    );
  }

  export default HomeHeader;