import { useState } from 'react';
import { axiosInstance } from '../config/axios';

export const InputFields = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        // Проверка на число от 0 до 99999
        if (/^\d{0,5}$/.test(value) && parseInt(value) <= 99999) {
            setInputValue(value);
            setError(''); // Очищаем ошибку, если ввод корректный
        } else {
            setError('Please enter a number between 0 and 99999.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Если есть ошибка ввода, прерываем отправку запроса
        if (error) return;

        // отправка значения на бэкенд для умножения на 1.21
        try {
            const response = await axiosInstance.post('/home/multiply', { number: inputValue });
            if (response.status === 200) {
                // если ответ успешен, получить результат
                const data = response.data;
                console.log('Result:', data.result);
                setResult(data.result);
                setInputValue('');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Input:1</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        maxLength={5}
                    />
                    {result !== null && <p>Your result: {result}</p>}
                </div>

                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            
        </div>
    );
};
