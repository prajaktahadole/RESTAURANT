function RestaurantDetails({
    image,
    name,
    cost,
    votes,
    reviews,
    cuisine:  tags,      //renaming
    rating
}){
    return (
        <div style={{display:"flex" , gap : "2rem", border: " 3px solid black" , padding: "1rem" , margin :"0.5rem"}}>
            <div>
                <img width="50px" src={image} alt="title"/>
            </div>

            <div>
                <div>{name}</div>
                <div>{tags}</div>
                <div>Cost rs${cost}</div>
            </div>

            <div>
                <div>{rating}</div>
                <div>{votes} votes</div>
                <div>{reviews} Reviews </div>
            </div>

        </div>
    )
}

export default RestaurantDetails