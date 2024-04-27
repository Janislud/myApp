import { useEffect, useState } from 'react';
import './App.css';
import { axiosInstance } from "./config/axios";
import { InputFields } from './components/InputsFields';


function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //try {
        //    const response = await axiosinstance.get(); // изменение адреса запроса
        //    const data = await response.json();
        //    setmessage(data.message);
        //} catch (error) {
        //    console.error('error fetching data:', error);
        //}
        const result = await Promise.all([axiosInstance.get('/home'), axiosInstance.post('/home')]);
        /* setMessage(result)*/
        console.log(result[0].data.message);
        console.log(result[1].data.message);
        setMessage(result[0].data.message);

        //try {
        //    const response = await axiosInstance.get('/home');
        //    setMessage(response.data.message);
        //    // handle success
        //    console.log(response);
        //} catch (error) {
        //    console.log("error fetcinhg data", error)
        //}

        //try {
        //    const response = await axiosInstance.post('/home');
        //    setMessage(response.data.message);
        //    // handle success
        //    console.log(response);
        //} catch (error) {
        //    console.log("error fetcinhg data", error)
        //}
        
          
    };

    return (
        <div>
            <InputFields/>
            <h1>Message from Backend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
