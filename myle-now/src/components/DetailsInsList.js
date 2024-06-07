import './DetailsInsList.css'


function DetialsInsListItem({number , text,desc}){
    return(
    <li>
    <span>{number}</span>
    <a href="#">{text}</a><br></br>
    <p href="#">{desc}</p>
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

export default DetailsInsList