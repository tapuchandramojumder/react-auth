
import mapImage from '../../images/Map.png'
import './Car.css'
import Header from '../Header/Header.js'
const Car = () => {

   
    return (
       
        <div className="main-container">
                <Header ></Header>  
            <div className = "row">
            <div className="input-section">
                <form action="">
                    <label htmlFor="form">Pick From</label><br/>
                    <input type="text" className="input-box" name ="from" /><br/>
                    <label htmlFor="to">Pick to</label><br/>
                    <input type="text" className="input-box" name ="to" /><br/>
                    <input type="submit" value ="search-details" />
                    {/* <Link to ="search-details" /> */}
                    
                </form>
            </div>
            <div className="map-section">
                <img src = {mapImage} style={{width:"600px"}} alt ="searchLogo"/>
            </div>
        </div>
     </div>
            
    );
};

export default Car;