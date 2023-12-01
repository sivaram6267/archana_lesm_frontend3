// import React, { useState,useEffect } from 'react'

// import ApiService from "../../services/ApiService";
// import { useLocation } from "react-router-dom";
// import ViewProfiles from '../viewProfile/ViewProfiles';
// const GetViewProfiles = () => {
//     const[data,setData]=useState({})
//     const[status,setStatus]=useState(null)
//     const[msg,setMsg]=useState(null)
//     const location = useLocation();
//     useEffect(() => {
     
//         console.log(location.state.jobStringId);
     
//          if (location.state.jobStringId) {
//            setStatus(true);
//            //console.log(props)
//            console.log(data);
//     ApiService.GetViewSendProfiles(location.state.jobStringId)
//              .then((res) => {
//                console.log(res.data); 
//                setData(res.data);
//                console.log(data);
//                setStatus(false);
//                setMsg("");
//              })
//              .catch((err) => {
//                console.log(err);
//                setData("");
//                setStatus(false);
//                setMsg(err.message);
//              });
//            }
           
//  }, []);

//   return (
//     <div>
// <>
// <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
//         {data?.length>0 && data.map(it=> <ViewProfiles profiles={it}/>)}
//       </div>
//       </>
//     </div>
//   )
// }

// export default GetViewProfiles