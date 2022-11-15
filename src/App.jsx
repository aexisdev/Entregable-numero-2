import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import './index.css'


function App() {
     //*Initial state for the api call
    const [weather, setWeather] = useState({})
    //===========================================================
    //*status for C/F degree change
    const [changeDegrees, setChangeDegrees] = useState(false);
    //===========================================================
    //* EV change to Venezuela
    const [change, setChange] = useState(true)

    //===========================================================
    //* UseEffect and api link
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);

        //* Function to acquire the location with the object navigator.geolocation
        function success(pos) {
            const crd = pos.coords;

            console.log('Tu ubicación actual es:');
            console.log(`Latitud : ${crd.latitude}`);
            console.log(`Longitud: ${crd.longitude}`);
            console.log(`Más o menos ${crd.accuracy} metros.`);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=63001b6e7fae0658b59a14dbfe572782`)
                .then(res => setWeather(res.data));
            console.log(weather)
        }
    }, []);
    //============================================================
    //============================================================
    //============================================================
    return (
        <div className="App">
            <div className="content-wrapp">
                <h1>Wheather app</h1>
                <h2>
                    {' '}{weather.name}, {change ? 'Venezuela' : 'VE'}
                </h2>
                <div className="content-inform-clima">
                    <div className="content-inform-left">
                        <span className="text-content-inform-left">
                            {changeDegrees ? (weather.main?.temp - 273.15) : ((weather.main?.temp - 273.13) * 9 / 5) + 32}  {changeDegrees ? 'C' : 'F'}
                        </span>
                    </div>
                    <div className="content-inform-rigth">
                        <ul className="content-inform-rigth-ul">
                            <li className="content-inform-rigth-ul-li-title">
                                {weather.weather?.[0]?.description}
                            </li>
                            <li className="content-inform-rigth-ul-li">
                                <p>Wind speed</p>
                                <span>{weather.wind?.speed} m/s</span>
                            </li>
                            <li className="content-inform-rigth-ul-li">
                                <p>Clouds</p>
                                <span>{weather.clouds?.all} %</span>
                            </li>
                            <li className="content-inform-rigth-ul-li">
                                <p>Pressure</p>
                                <span>{weather.main?.pressure} mb</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button className="button-change-degrees" onClick={() => setChangeDegrees(!changeDegrees)}>
                        DEGREES {changeDegrees ? 'F' : 'C'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default App
