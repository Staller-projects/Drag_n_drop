import React, { useState } from 'react';

interface InputProps {
    placeHolder: string,
    onEnter(value: string, date: string): void
}

const Input: React.FC<InputProps> = (props: InputProps) => {

    const [currentInputValue, setCurrentInputValue] = useState('');
    const [dateInputValue, setDateInputValue] = useState('');

    const setValueOfTitleInputOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { 
        if(e.key === "Enter") {
            setCurrentInputValue(''); 
            setDateInputValue(''); 
            return props.onEnter(currentInputValue, dateInputValue); 
        }
    }


    return (
        <div className='flex w-full'>
            <input
                value={currentInputValue} 
                onKeyDown={setValueOfTitleInputOnEnter} 
                onChange={(e) => setCurrentInputValue(e.target.value)} 
                type="text" 
                className="py-3 px-5 block w-full font-semibold font-mono border-gray-200 rounded-xl outline-none text-sm dark:text-white text-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:bg-slate-900 dark:bg-slate-900/70 dark:border-gray-700 dark:focus:ring-gray-600" 
                placeholder={props.placeHolder} />
            <input
                value={dateInputValue} 
                onKeyDown={setValueOfTitleInputOnEnter} 
                onChange={(e) => setDateInputValue(e.target.value)} 
                type="date"  
                min={new Date().toISOString().split('T')[0]} 
                className="date-input py-3 px-5 block w-1/3 font-semibold font-mono border-gray-200 outline-none rounded-xl text-sm dark:text-white text-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:bg-slate-900 dark:bg-slate-900/70 dark:border-gray-700 dark:focus:ring-gray-600" 
                 />
        </div>
    )
}

export default Input
