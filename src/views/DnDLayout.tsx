import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import Card from '../components/Card'
import Input from '../components/Input'
import ThreeDotsHor from '../icons/ThreeDotsHor'
import { saveToStorage, getFromStorage, NewItem, saveToDropStorage, AlertMessage } from '../utils/LocalStorage'


// this is the parent wrapper, all the other components are wrapped inside this component
const DnDLayout: React.FC = () => {

  // initializing the null values to each
  const [itemsList, setItemsList] = useState<NewItem[]>([]);
  const [alertMessage, setAlertMessage] = useState(''); 

  // initially, if the items are in the storage it will displayed. 
  useEffect(() => {
    displayItems();
  }, [])

  // get items form the storage and set data into ItemsList and then iteration and all happens
  const displayItems = () => {
    setItemsList(getFromStorage());
  }

  // When something is written and enter is pressed this method is called.
  const handleOnEnter = (inputTitle: string) => {
    const response: AlertMessage = saveToStorage(inputTitle);
    (response.message === "duplicate") ? setAlertMessage("Duplicate entries not allowed!") : displayItems();
    setTimeout(() => {
      setAlertMessage('')
    }, 3000)
  }

// when card is droppe,  the data of the card will get and set to new place 
  const handleOnDropEvent = (e: React.DragEvent, position: string) => {
    const cardItem = JSON.parse(e.dataTransfer.getData('test') as string);
    saveToDropStorage(cardItem, position)
    displayItems()
  }





  return (
    <div className='border- m-5 w-[75%] space-y-4 p-2'>
 

      
      {(alertMessage !== '') ? <Alert severity="info" className='text-white'>{alertMessage}</Alert> : null}


      <div className="">
        <Input onEnter={handleOnEnter} placeHolder='Add the items here...' />
      </div>

      <div className="flex justify-around gap-5 flex-nowrap">

        {/* first box */}
        <div id='pending' className="p-2 w-full h-full border-2 border-gray-700 rounded-lg" onDrop={(e: React.DragEvent) => handleOnDropEvent(e, "TODO")} onDragOver={(e: React.DragEvent) => e.preventDefault()}>
          <div className="flex justify-between py-2 mb-5 border-b-[0.1px] border-gray-500">
            <h2 className='text-start text-lg font-mono font-bold dark:text-white text-black'>Planning... </h2>
            <ThreeDotsHor height={15} />
          </div>
          <div className=" min-h-[100px]">

            {

              itemsList?.map((item, index) => {

                return (item.position === "TODO") ?
                  (<Card key={index} id={item.id} title={item.title} cardItem={JSON.stringify(item)} />)
                  : null
              })
            }


          </div>
        </div>


        {/* second box */}
        <div id='done' className="p-2 w-full h-full border-2 border-gray-700 rounded-lg">
          <div className="flex justify-between py-2 mb-5 border-b-[0.1px] border-gray-500">
            <h2 className='text-start text-lg font-mono font-bold dark:text-white text-black'>Done! </h2>
            <ThreeDotsHor height={15} />
          </div>
          <div className="min-h-[100px]" onDrop={(e: React.DragEvent) => handleOnDropEvent(e, "DONE")} onDragOver={(e: React.DragEvent) => e.preventDefault()}>
            {

              itemsList?.map((item, index) => {

                return (item.position === "DONE") ?
                  (<Card key={index} id={item.id} title={item.title} cardItem={JSON.stringify(item)} />)
                  : null
              })
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default DnDLayout
