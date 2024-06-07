import cover from'../assets/cover.png';
import './HomeCoverImage.css'
function HomeCoverImage(){
    return(
    <div className='coverImg'>
    <img src={cover} alt=""></img>
    </div>
    )
}
export default HomeCoverImage;