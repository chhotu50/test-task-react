import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const handlePageChange =(page)=>{
        navigate(page);
    }
  return (
    <div className="modal-btn-wrap"> 
      <Button className="btn btn-a mr-1" onClick={()=>handlePageChange('/button-a')}>Button A</Button>
      <Button className="btn btn-b ml-1" onClick={()=>handlePageChange('/button-b')}>Button B</Button>
    </div>
  );
};

export default Home;
