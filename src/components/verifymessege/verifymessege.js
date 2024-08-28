import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";


export const VerifymessegeSec = () => {


  return (
    <React.Fragment>
      <Container>
      <div className="registration-box text-center mb-5">
         <h4>User ID: <span className="text-danger">01042003</span></h4>
         <h4>Candidate Name: <span className="text-muted">Durgesh Kumar</span></h4>
         <div className="pt-3 ">
          <p className="text-primary fw-bold">You have successfully generated user ID and password<br></br>please note down the user ID shown above for future reference. Kindly login complete your profile.</p>
         <Button href="/login" className="btn-style mt-4">Click to login and Complete Profile</Button>
         </div>
      </div>
      </Container>
    </React.Fragment>
  );
};
