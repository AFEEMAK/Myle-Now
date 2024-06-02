import './HomeHeader.css';
import massage from '../assets/massage.png';
import Suggestion from './Suggestion';
import ServiceContent from './ServiceContent';

function ServiceHeader() {
    return (
        <>
            <div className='header'>
                <section className="suggestions">
                    <div>
                        <h1 className='service-heading'>Salon Prime For Men & Kids</h1>
                    </div>

                    <div className='holder-div'>
                        <div className='suggestionsContainer'>
                            <Suggestion 
                                children={[
                                    { itemstyle: 'list-item', image: massage, text: 'Haircut and Beard styling' },
                                    { itemstyle: 'list-item', image: massage, text: 'Haircut and Beard styling' },
                                    { itemstyle: 'list-item', image: massage, text: 'Haircut and Beard styling' },
                                    { itemstyle: 'list-item', image: massage, text: 'Haircut and Beard styling' },
                                    { itemstyle: 'list-item', image: massage, text: 'Haircut and Beard styling' },
                                    { itemstyle: 'list-item', image: massage, text: 'Haircut and Beard styling' }
                                ]}
                                layoutstyle='suggestionList' 
                            />
                        </div>
                    </div>
                </section>
                <ServiceContent />
            </div>
        </>
    );
}

export default ServiceHeader;
