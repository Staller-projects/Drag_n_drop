import React, { useRef } from 'react' 
import DeleteIcon from '../icons/DeleteIcon'

interface CardProps {
    id: string,
    title: string, 
    cardItem: string
    
}

const Card: React.FC<CardProps> = (props: CardProps) => {

    let cardDiv = useRef<HTMLDivElement>(null); 

    const handleDragStart = (e: React.DragEvent, cardItem: string) => {
        e.dataTransfer.setData("test", `${cardItem}`);  

        (cardDiv.current as HTMLDivElement).classList.toggle("dark:")        
    }

    const handleDeleteCarditem = (cardId: string) => {
        console.log(cardId);
        
    }

    return ( 
            <div 
                ref={cardDiv} 
                id={`itemCard${props.id}`} 
                draggable 
                onDragStart={(e) => handleDragStart(e, props.cardItem)} 
                className="p-2 my-3  flex flex-col justify-start bg-white hover:border-[1px] hover:border-slate-500 border border-gray-200 rounded-lg shadow-lg dark:shadow-slate-900 shadow-slate-300 dark:bg-gray-800 dark:border-gray-700">
                
                <div className="flex justify-between">
                    <h5 className="mb-1 text-md text-start font-medium truncate tracking-tight text-gray-900 dark:text-white">{ props.title }</h5>

                    <div className="">
                        <DeleteIcon cardId={props.id} onItemDelete={handleDeleteCarditem}    />
                    </div>
                </div>




                {/* <p className="mb-2 text-sm font-normal text-start truncate text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, doloribus velit! Voluptatum?</p> */}
                
                {/* Link can ge given here  */}

            </div>  
    )
}

export default Card
