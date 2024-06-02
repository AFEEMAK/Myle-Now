import './HomeHeader.css';
import massage from'../assets/massage.png';
import main from '../assets/main.jpg';

import Suggestion from './Suggestion';

function HomeHeader() {

   
    return (
        <>
    
      <div className='header'>
 
        <section className="suggestions">
            <div>
                <h1>QUALITY SERVICES AT YOUR DOORSTEP!</h1>
            </div>

                    

            <Suggestion 
                children={[
                    { itemstyle: 'grid-item', image: massage, text: 'Haircut and Beard styling' },
                    { itemstyle: 'grid-item', image: massage, text: 'Haircut and Beard styling' },
                    { itemstyle: 'grid-item', image: massage, text: 'Haircut and Beard styling' },
                    { itemstyle: 'grid-item', image: massage, text: 'Haircut and Beard styling' },
                    { itemstyle: 'grid-item', image: massage, text: 'Haircut and Beard styling' },
                    { itemstyle: 'grid-item', image: massage, text: 'Haircut and Beard styling' }
                ]}
                    layoutstyle='suggestionGrid' 
    />

         

     
      
            
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