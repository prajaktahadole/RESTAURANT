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
   
 
    useEffect(() =>{
      fetchData({page, ratingOrder});
      }, [page, ratingOrder])


      const fetchData = async ({page, ratingOrder}) =>{
        setLoading(true);
        axios({
          method : 'get',
          url : 'http://localhost:3004/food',
         params :{
          _page : page,
          _limit : 5,
          _sort : "rating",
          _order : ratingOrder
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
      <button  disabled={ratingOrder==="desc"} onClick={() =>setRatingOrder("desc")} >Sort by Decsending Order</button>
        <button disabled={ratingOrder==="asc"} onClick={() =>setRatingOrder("asc")}>Sort by Asending Order</button>
      </div>



     <div>
       {data.map(item=>
         <RestaurantDetails key={item.id} {...item}></RestaurantDetails>
       )}
     </div>
     <div >
       <button disabled={page===1} onClick={() => setPage(page-1)}>PREV</button>
       <PaginationComponent currentPage={page} lastPage={5} onPageChange={setPage}></PaginationComponent>
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
