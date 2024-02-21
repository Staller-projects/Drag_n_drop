import React, { useState } from 'react'

interface InputProps {
    placeHolder: string,
    onEnter(value: string): void
}

const Input: React.FC<InputProps> = (props: InputProps) => {

    const [currentInputValue, setCurrentInputValue] = useState('');

    const handleOnKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //  ? props.onEnter(currentInputValue) : null

        if(e.key === "Enter") {
            setCurrentInputValue('')
            return props.onEnter(currentInputValue);
            
        }
    }






    return (
        <div>
            <input value={currentInputValue} onKeyDown={handleOnKeyDownEvent} onChange={(e) => setCurrentInputValue(e.target.value)} type="text" className="py-3 px-5 block w-full font-semibold font-mono border-gray-200 rounded-xl text-sm dark:text-white text-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600" placeholder={props.placeHolder}></input>
        </div>
    )
}

export default Input
