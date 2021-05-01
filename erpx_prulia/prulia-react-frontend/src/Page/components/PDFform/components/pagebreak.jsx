import * as React from 'react';
export default class PageTemplate extends React.Component {

    render() {
        return (

            <div style={{ display: "flex", justifyContent: "space-between" }} >
<h3 className="pdfHeading"> 
                    ENTERPRISE INDIVIDUAL<br/>
                    MOBILE REGISTRATION FORM
					</h3>
				
                <img src={`http://167.99.77.197${localStorage.getItem("telco_logo")}`} alt="Bootstrap Image Preview" className="pdf-telco-icon"  />
			</div>
            
        );
    }
}