import React, { useState } from 'react'
import DeleteIcon from '../icons/DeleteIcon'
import { editItemToStroage, nullFunction, deleteStateType } from '../utils/LocalStorage';
import RightIcon from '../icons/RightIcon';

interface CardProps {
    id: string,
    title: string,
    cardItem: string,
    className: string
    completeState: boolean,  
    setDeleteCard(deleteCardOpsData: deleteStateType): void 
}

const Card: React.FC<CardProps> = (props: CardProps) => {

    
    const [editState, setEditState] = useState(false);
    const [editedValue, setEditedValue] = useState(props.title); 


    const handleDragStart = (e: React.DragEvent, cardItem: string) => {
        e.dataTransfer.setData("cardDataToBeTransferred", `${cardItem}`);
        // (cardDiv.current as HTMLDivElement).classList.toggle("opacity-9")
    }

    const handleOnDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => setEditState(true)

    

    const handleDeleteCarditem = (cardId: string) =>  { 
        props.setDeleteCard({state: true, cardId: cardId})          
    }


    
    
    
    const handleEditCarditem = (cardId: string) => {
        editItemToStroage(cardId, editedValue)
        setEditState(false)
    }




    return (
        <div 
            id={`itemCard${props.id}`}
            draggable role={"none"}
            onDragStart={(e) => handleDragStart(e, props.cardItem)}
            className={`${props.className} p-2 my-3  flex flex-col justify-start bg-white hover:border-[1px] hover:border-slate-500 border border-gray-200 rounded-lg shadow-lg dark:shadow-slate-900 shadow-slate-300 dark:bg-gray-800 dark:border-gray-700`}>

            <div className="flex justify-between">
                <div
                    className="w-full mr-1"
                    onDoubleClick={(props.completeState) ? nullFunction : handleOnDoubleClick}>

                    <input
                        type='text'
                        disabled={(!editState) ? true : false}
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        className={`py-3 px-5 block w-full font-semibold font-mono !opacity-[1] outline-none rounded-lg text-sm dark:text-white text-black ${(!editState) ? 'dark:bg-gray-800' : 'dark:bg-gray-900'} disabled:opacity-50 disabled:pointer-events-none`}
                    />

                </div>

                <div className="flex justify-between gap-2">

                    {(editState) ?
                        (<RightIcon
                            cardId={props.id}
                            onItemEdit={handleEditCarditem} />) : null}

                    <DeleteIcon
                        cardId={props.id}
                        onItemDelete={handleDeleteCarditem} />

                </div>

            </div>




            {/* <p className="mb-2 text-sm font-normal text-start truncate text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, doloribus velit! Voluptatum?</p> */}

            {/* Link can ge given here  */}

        </div>
    )
}

export default Card
