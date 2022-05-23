import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import RestaurantDetails from './components/RestaurantDetails';

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1)
   // const [query, setQuery] = useState("masai");
 
 
    useEffect(() =>{
      fetchData(page)
      }, [page])


      const fetchData = async (page) =>{
        setLoading(true);
        axios({
          method : 'get',
          url : 'http://localhost:3004/food',
         params :{
          _page : page,
          _limit : 5
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
       {data.map(item=>
         <RestaurantDetails key={item.id} {...item}></RestaurantDetails>
       )}
     </div>
     <div>
       <button disabled={page===1} onClick={() => setPage(page-1)}>PREV</button>
       <button onClick={() => setPage(page+1)}>NEXT</button>
       
     </div>
    </div>
  )
}

export default App
