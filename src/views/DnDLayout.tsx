import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'; 
import Card from '../components/Card'
import Input from '../components/Input' 
import { saveToStorage, getFromStorage, NewItem, saveToDropStorage, deleteFromStorage, AlertMessage, deleteStateType, nullFunction } from '../utils/LocalStorage'





const DnDLayout: React.FC = () => {

  // DECLERATIONS 
  const [toBeDeleteCard, setToBeDeleteCard] = useState<HTMLElement | null>(null); 
  const [undoDeleteTimeout, setUndoDeleteTimeout] = useState<number>(0);
  const [undoCounterInterval, setUndoCounterInterval] = useState<number>(0);
  const [itemsList, setItemsList] = useState<NewItem[]>([]);
  const [deleteCard, setDeleteCard] = useState<deleteStateType>({ state: false, cardId: '' });
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [undoCounter, setUndoCounter] = useState(4); 


 

  useEffect(() => {
    console.log(undoCounter);
  }, [undoCounter])

  useEffect(() => {     // initially, if the items are in the storage it will displayed. 
    displayItems();
  }, [])

  useEffect(() => {
    if (deleteCard.state) {
      triggerDeleteCard();
    }

  }, [deleteCard.state])


  const displayItems = () => {     // get items form the storage and set data into ItemsList and then iteration and all happens
    setItemsList(getFromStorage());
  }

  const handleOnEnter = (inputTitle: string) => {     // When something is written and enter is pressed this method is called.
    const response: AlertMessage = saveToStorage(inputTitle);
    (response.message === "duplicate") ? setAlertMessage("Duplicate entries not allowed!") : displayItems();
    setTimeout(() => {
      setAlertMessage('')
    }, 3000)
  }


  const handleOnDropEvent = (e: React.DragEvent, position: string) => {       // when card is droppe,  the data of the card will get and set to new place
    const cardItem = JSON.parse(e.dataTransfer.getData('cardDataToBeTransferred'));
    saveToDropStorage(cardItem, position);
    displayItems();
  }


  const triggerDeleteCard = () => {
    
    const toBeDeleteCard = document.getElementById(`itemCard${deleteCard.cardId}`); 
 
    (toBeDeleteCard != null) ? setToBeDeleteCard(toBeDeleteCard) : nullFunction(); 
    toBeDeleteCard?.classList.toggle('hidden');
    changeUndoCounter();    

    InitiateDeleteItemTimer();    

  }

  const InitiateDeleteItemTimer = () => {
    const deleteCardTimeout = setTimeout(() => { 
      deleteFromStorage(deleteCard.cardId);
      console.log("this is timeour");
      resetUndoVariables();

    }, 5000);     
 
    setUndoDeleteTimeout(Number(deleteCardTimeout));
  }

  const changeUndoCounter = () => {
    
    const undoCounterInterval = setInterval(() => { 
      setUndoCounter((prevCount) => prevCount-1);  
    }, 1000)

    setUndoCounterInterval(Number(undoCounterInterval));
  }


  const resetUndoVariables = () => {
    clearTimeout(undoDeleteTimeout);
    clearInterval(undoCounterInterval); 
    setUndoCounter(4);
    setUndoCounterInterval(0);
    setUndoDeleteTimeout(0);
    setDeleteCard({ state: false, cardId: '' }); 
    toBeDeleteCard?.classList.toggle('hidden');
    setToBeDeleteCard(null);

  }




  return (
    <div className='border-gray-500 m-5 w-full h-full  space-y-4 p-2'>
      <div className="">
      {(alertMessage !== '') ? <Alert severity="info" className='text-white !absolute !bottom-5 !right-5'>{alertMessage}</Alert> : null }
      {
        (deleteCard.state) ?
          (<Alert severity="info" className='text-black dark:!text-white dark:!bg-slate-700 !shadow-lg !absolute !bottom-5 !right-5'>
            <h3 className='text-start font-semibold flex justify-between'>
              <span>Moved to Bin!</span>
              <span>{ undoCounter }</span>
            </h3>
            <div className="flex justify-end gap-5 py-2 w-[150px]">
               
              <button
                className="py-1 px-4 rounded-lg dark:text-sky-300 bg-sky-600/15"
                onClick={resetUndoVariables}
              >Undo
              </button>
            </div>
          </Alert>)
          : null
      }
      </div>
      <div className="w-[75%] space-y-4 mx-auto p-2">

        <div className="">
          <Input onEnter={handleOnEnter} placeHolder='Add the items here...' />
        </div>

        <div className="flex justify-around gap-5 flex-nowrap">

          {/* first box */}
          <div id='pending' className="p-2 w-full h-full border-2 border-gray-700 rounded-lg" onDrop={(e: React.DragEvent) => handleOnDropEvent(e, "TODO")} onDragOver={(e: React.DragEvent) => e.preventDefault()} role='none'>
            <div className="flex justify-between py-2 mb-5 border-b-[0.1px] border-gray-500">
              <h2 className='text-start text-lg font-mono font-bold dark:text-white text-black'>Planning... </h2>
              {/* <ThreeDotsHor height={15} /> */}
            </div>
            <div className=" min-h-[100px]">
              {
                itemsList?.map((item, index) => {
                  return (item.position === "TODO") ?
                    (<Card key={index} id={item.id}  setDeleteCard={setDeleteCard} completeState={item.complete} title={item.title} cardItem={JSON.stringify(item)} className={''} />)
                    : null
                })
              }
            </div>
          </div>


          {/* second box */}
          <div id='done' className="p-2 w-full h-full border-2 border-gray-700 rounded-lg">
            <div className="flex justify-between py-2 mb-5 border-b-[0.1px] border-gray-500">
              <h2 className='text-start text-lg font-mono font-bold dark:text-white text-black'>Done! </h2>
              {/* <ThreeDotsHor height={15} /> */}
            </div>
            <div className="min-h-[100px]" onDrop={(e: React.DragEvent) => handleOnDropEvent(e, "DONE")} onDragOver={(e: React.DragEvent) => e.preventDefault()} role='none'>
              {
                itemsList?.map((item, index) => {
                  return (item.position === "DONE") ?
                    (<Card key={index} id={item.id}  setDeleteCard={setDeleteCard} completeState={item.complete} title={item.title} cardItem={JSON.stringify(item)} className={"line-through"} />)
                    : null
                })
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default DnDLayout
