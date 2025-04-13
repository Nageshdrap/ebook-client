import React from "react";
import './progress.css';


export function ProgressBar({step}){

        const steps = ["shipping" , "review" , "payment" , "confirm"];
    return(
        <>
           <div className="stepper-container mPro mb-2">
                {
                    steps.map((label, index)=> (
                        <div className={`step ${index <= step ? "active" :""}`} key={index}>
                            <div className="step-number">
                                {index + 1}
                            </div>
                            <p className="step-label">{label}</p>
                            {index < steps.length - 1 && <div className="step-line"></div>}
                        </div>
                    ))
                }
           </div>
        </>
    )
}