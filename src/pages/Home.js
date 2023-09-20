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
      <Button variant="primary btnA" onClick={()=>handlePageChange('/buttonA')}>Button A</Button>
      <Button variant="primary btnB" onClick={()=>handlePageChange('/buttonB')}>Button B</Button>
    </div>
  );
};

export default Home;
