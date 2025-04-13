import './verticalProgressBar.css';




const VerticalProgressBar = ({ steps , timestamps }) => {

  const formatDateTime = (timestamp) =>{
    console.log("stamp", timestamp);
      const date = new Date(timestamp);
      
      return date.toLocaleDateString('en-us',{
        year:'numeric',
        month:'long',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        hour12:'true'
    });
  }
    return (
      <div className={`progress-container`}>
        {steps.map((step, index) => (
          <div key={index} className="progress-step d-flex">
            <div className={`step-circle ${step.completed ? "completed" : "pending"}`}>
              {step.completed ? "✔" : ""}
            </div>
            {/* {index !== steps.length - 1 && (
              <div className={`step-line ${step.completed ? "completed" : "pending"}`}></div>
            )} */}
            {
              step.completed &&
            <div className="step-label"><div className='text-success  fw-semibold'>{step.label}</div>
            {
               
step.completed &&
                  <span className=''>{formatDateTime(timestamps[step.label])}</span>
                 
                
              }
              </div>}
          </div>
        ))}
      </div>
    );
  };

  export default VerticalProgressBar;

