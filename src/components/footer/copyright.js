import React from "react";
import { useState, useEffect } from "react";


export const FooterRow = () => {
    const [year, setYear] = useState(new Date().getFullYear());
   
    useEffect(() => {
        // Update the year when the component mounts
        setYear(new Date().getFullYear());
      }, []);
    
      return (
      <React.Fragment>
        <div className="copyright bg-primary py-3">
            <p className="text-white mb-0">{`Copyright © ${year}. All Rights Reserved | Education Department, Goverment of Uttar Pradesh.`}</p>
        </div>
      </React.Fragment>
    );
  };