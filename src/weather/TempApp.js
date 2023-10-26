import React, {useState} from "react";
import { useEffect } from "react";

const TempApp = () =>
{

    const[ city, setCity] = useState(null);
    const[ search, setSearch] = useState("");
     useEffect(() => {
        const fetchApi = async() =>
        {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=dd94f859a0e52d6e4767fddf735f04a7`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        }
        fetchApi();
    },[search])
 const fetchApi = async() =>
        {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=dd94f859a0e52d6e4767fddf735f04a7`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        }
   
    return (
        <div className="box">
            <div className="InputData">
                <input 
                type="search"
                className="InputField"
                onChange = { (event) => {
                    setSearch(event.target.value)

                }} />
            {
                !city?
                (   <div>
                    <h3><b>No Data Found</b></h3>
                    <div id="clouds">
                <div class="cloud x1"></div>
                <div class="cloud x2"></div>
                <div class="cloud x3"></div>
                <div class="cloud x4"></div>
                <div class="cloud x5"></div>
            </div>
            </div>
                ) :
                (
                    <div>
                    <div className="info">
                    <h2 className="location">
                    <i class="fas fa-street-view"></i>{search}
                    </h2>
                    <h1 className="temp">
                    {city.temp}
                    </h1>
                    <h3 className="tempmin_max">{city.temp_min - 273.15} Cel</h3>
                    <h3 className="tempmin_max">{city.speed} </h3>
                </div>
                <div className="wave- one"></div>
                
                <div className="wave- two"></div>
                
                <div className="wave- three"></div>
                
                <div id="clouds">
                <div class="cloud x1"></div>
                <div class="cloud x2"></div>
                <div class="cloud x3"></div>
                <div class="cloud x4"></div>
                <div class="cloud x5"></div>
            </div>
            </div> 

                )
            }

            </div> 
        </div>
    )
}
 
export default TempApp;