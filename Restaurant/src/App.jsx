import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import RestaurantDetails from './components/RestaurantDetails';

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [ratingOrder , setRatingOrder ] = useState("asc");
    const [costOrder , setCostOrder ] = useState("asc");
    const [filterRating, setFilterRating] = useState(0);
    const [q, setQ] = useState("");
    const[text, setText]  = useState("");
 
    useEffect(() =>{
      fetchData({page, ratingOrder, costOrder, filterRating , q});
      }, [page, ratingOrder, costOrder , filterRating , q])


      const fetchData = async ({page, ratingOrder, costOrder , filterRating , q}) =>{
        setLoading(true);
        axios({
          method : 'get',
          url : 'http://localhost:3004/food',
         params :{
          _page : page,
          _limit : 10,
          _sort : "rating, cost",
         // _order : ratingOrder                   // for single
         _order : `${ratingOrder}, ${costOrder} `, //for multiple component 
          rating_gte : filterRating,
          q : q
         }
         
      })
       .then((res)=>{
        console.log(res)
        setData(res.data);
        setLoading(false);
    })
    .catch((err) =>{
        setError(true);
        setLoading(false);
    })
    }


    console.log(data)


  return (
    <div className="App">
     <h1>Restaurant Details</h1>
     {loading && <div>loading</div>}

        <div>
          <h3>Search</h3>
          <input value={text} onChange={(e) =>setText(e.target.value)}></input>
          <button onClick={()=>setQ(text)}>Search</button>
        </div>
        <br></br>


      <div>
      <button disabled={ratingOrder==="desc"}
      onClick={() =>setRatingOrder("desc")} >Sort by Decsending Order</button>
        <button disabled={ratingOrder==="asc"} 
      onClick={() =>setRatingOrder("asc")}>Sort by Asending Order</button>
      </div>


      <div>
      <button  disabled={costOrder==="desc"}
       onClick={() =>setCostOrder("desc")} >Cost High to Low </button>
        
      <button disabled={costOrder==="asc"}
       onClick={() =>setCostOrder("asc")}>Cost Low to High</button>
      </div>

      <h4>Filter Ratings</h4>
      <button onClick={()=>setFilterRating(4)}>greater than 4 </button>
      <button onClick={()=>setFilterRating(3)}>greater than 3 </button>
      <button onClick={()=>setFilterRating(2)}>greater than 2 </button>
      <button onClick={()=>setFilterRating(1)}>greater than 1 </button>
      <button onClick={()=>setFilterRating(0)}>All</button>


     <div>
       {data.map(item=>
         <RestaurantDetails key={item.id} {...item}></RestaurantDetails>
       )}
     </div>
     <div >
       <button disabled={page===1} onClick={() => 
        setPage(page-1)}>PREV</button>
       <PaginationComponent currentPage={page} lastPage={5}
        onPageChange={setPage}></PaginationComponent>
       <button onClick={() => setPage(page+1)}>NEXT</button>
       
     </div>
    </div>
  )
}

const PaginationComponent = ({
  currentPage,
  lastPage,
  onPageChange
}) =>{
  const arr = new Array(lastPage).fill(0);
  return(
    <div>
      <div>
        {arr.map((item, page) =><button onClick={() =>onPageChange(page +1)} disabled={(page+1 )=== currentPage} >{page}</button>)}
      </div>
    </div>
  )
}






export default App
