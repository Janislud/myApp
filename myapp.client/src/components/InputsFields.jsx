import { useState } from 'react';
import { axiosInstance } from '../config/axios';
import style from "../components/InputsFields.module.css";

export const InputFields = () => {
    const [inputValues, setInputValues] = useState({
        inputValue1: '',
        inputValue2Upper: '',
        inputValue3Lower: '',
        inputValue4Negative: ''
    });
    const [result, setResult] = useState(null);
    const [resultWithPvn, setResultWithPvn] = useState(null);
    const [nds, setNds] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validateInputValues(inputValues);
        if (!isValid) return;

        try {
            const response = await axiosInstance.post('/home/process-inputs', inputValues);
            if (response.status === 200) {
                const data = response.data;
                setResult(data.result);
                setResultWithPvn(data.resultWithPvn);
                const netAmount = data.resultWithPvn - data.result;
                setNds(netAmount);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Error Response:', error.response);
        }
    };

    const validateInputValues = (values) => {
        const errors = {};
        // Проверка первого поля
        if (!/^\d+$/.test(values.inputValue1) || values.inputValue1 < 0 || values.inputValue1 > 99999) {
            errors.inputValue1 = 'Please enter a number between 0 and 99999.';
        }
        // Проверка второго поля
        if (!/^[A-Z]{3}$/.test(values.inputValue2Upper)) {
            errors.inputValue2Upper = 'Please enter 3 uppercase letters.';
        }
        // Проверка третьего поля
        if (!/^[a-z]{3}$/.test(values.inputValue3Lower)) {
            errors.inputValue3Lower = 'Please enter 3 lowercase letters.';
        }
        // Проверка четвертого поля
        if (!/^-\d+$/.test(values.inputValue4Negative) || values.inputValue4Negative > -1 || values.inputValue4Negative < -99999) {
            errors.inputValue4Negative = 'Please enter a negative number between -1 and -99999.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <main>
            <form className={style.formWrapper} onSubmit={handleSubmit}>
                <div>
                    <label className={style.labelWrapper}>Input 1:</label>
                    <input
                        className="form-control me-2"
                        type="text"
                        name="inputValue1"
                        placeholder=" Positive from 0 - 99999"
                        value={inputValues.inputValue1}
                        onChange={handleChange}
                    />
                    {errors.inputValue1 && <p style={{ color: 'red' }}>{errors.inputValue1}</p>}
                </div>
                <div>
                    <label className={style.labelWrapper}>Input 2 (Uppercase):</label>
                    <input
                        className="form-control me-2"
                        type="text"
                        name="inputValue2Upper"
                        value={inputValues.inputValue2Upper}
                        onChange={handleChange}
                    />
                    {errors.inputValue2Upper && <p style={{ color: 'red' }}>{errors.inputValue2Upper}</p>}
                </div>
                <div>
                    <label className={style.labelWrapper}>Input 3 (Lowercase):</label>
                    <input
                        className="form-control me-2"
                        type="text"
                        name="inputValue3Lower"
                        value={inputValues.inputValue3Lower}
                        onChange={handleChange}
                    />
                    {errors.inputValue3Lower && <p style={{ color: 'red' }}>{errors.inputValue3Lower}</p>}
                </div>
                <div>
                    <label className={style.labelWrapper}>Input 4 (Negative):</label>
                    <input
                        className="form-control me-2"
                        type="text"
                        name="inputValue4Negative"
                        value={inputValues.inputValue4Negative}
                        onChange={handleChange}
                    />
                    {errors.inputValue4Negative && <p style={{ color: 'red' }}>{errors.inputValue4Negative}</p>}
                </div>
                <button className="btn btn-outline-success" type="submit">Submit</button>
                <div className={style.resultWrapper}>
                    {result && <p className={style.resultWrapperWithOutPvn}>Result without PVN: {result}</p>}
                    {resultWithPvn && <p className={style.resultWrapperWithPvn}>Result with PVN: {resultWithPvn}</p>}
                    {nds && <p className={style.resultWrapperWithPvn}>PVN: {nds}</p>}
                </div>
            </form>
           
        </main>
    );
};