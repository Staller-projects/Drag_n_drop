import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import UndoAlert from "@mui/material/Alert";
import Card from "../components/Card";
import Input from "../components/Input";
import {
  saveToStorage,
  getFromStorage,
  NewItem,
  saveToDropStorage,
  deleteFromStorage,
  AlertMessage,
  deleteStateType,
  nullFunction,
} from "../utils/LocalStorage";

const DnDLayout = () => {
  // DECLERATIONS
  const [toBeDeleteCard, setToBeDeleteCard] = useState<HTMLElement | null>(
    null
  );
  const [undoDeleteTimeout, setUndoDeleteTimeout] = useState<number>(0);
  const [itemsList, setItemsList] = useState<NewItem[]>([]);
  const [deleteCard, setDeleteCard] = useState<deleteStateType>({
    state: false,
    cardId: "",
  });
  const [alertMessage, setAlertMessage] = useState<string>("");

  // initially, if the items are in the storage it will displayed.
  useEffect(() => {
    displayItems();
  }, []);

  // when delete icon is clicked, deleteCard.state will become 'true', at that time triggerDeleteCard() will call.
  useEffect(() => {
    if (deleteCard.state) {
      triggerDeleteCard();
    }
    // eslint-disable-next-line
  }, [deleteCard]);

  // get items form the storage and set data into ItemsList and then iteration and all happens
  const displayItems = () => {
    setItemsList(getFromStorage());
  };

  // When something is written and enter is pressed this method is called.
  const handleOnEnter = (inputTitle: string, inputDate: string) => {
    const response: AlertMessage = saveToStorage(inputTitle, inputDate);
    response.message === "duplicate"
      ? setAlertMessage("Duplicate entries not allowed!")
      : displayItems();
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const showValidationAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 4000);
  };

  // when card is droppe,  the data of the card will get and set to new place
  const handleOnDropEvent = (e: React.DragEvent, position: string) => {
    const cardItem = JSON.parse(
      e.dataTransfer.getData("cardDataToBeTransferred")
    );
    saveToDropStorage(cardItem, position);
    displayItems();
  };

  // when user clicks the delete icon, this function starts the delete functionality
  const triggerDeleteCard = () => {
    const toBeDeleteCard = document.getElementById(
      `itemCard${deleteCard.cardId}`
    );
    toBeDeleteCard != null ? setToBeDeleteCard(toBeDeleteCard) : nullFunction();
    toBeDeleteCard?.classList.toggle("hidden");
    InitiateDeleteItemTimer();
  };

  // when the Item is delete the the timer is set to 5 sec and after 5 sec it will automaticcally deleted
  const InitiateDeleteItemTimer = () => {
    const deleteCardTimeout = setTimeout(() => {
      deleteFromStorage(deleteCard.cardId);
      console.log("this is timeour");
      resetUndoVariables();
    }, 5000);
    setUndoDeleteTimeout(Number(deleteCardTimeout));
  };

  // Reset all the variables which is being used by Undo functionality
  const resetUndoVariables = () => {
    clearTimeout(undoDeleteTimeout);
    setUndoDeleteTimeout(0);
    setDeleteCard({ state: false, cardId: "" });
    toBeDeleteCard?.classList.toggle("hidden");
    setToBeDeleteCard(null);
  };

  return (
    <div className="border-gray-500 w-full h-full  space-y-4 p-2">
      <div className="">
        {!alertMessage ? null : <Alert alertMessage={alertMessage} />}

        {deleteCard.state ? (
          <UndoAlert
            severity="info"
            className="   border-2 drop-shadow-lg rounded-lg !bg-slate-100/50 !backdrop-blur-lg !shadow-black !absolute !bottom-5 !right-5"
          >
            <h3 className=" text-primary text-center font-semibold flex justify-between">
              <span>Moved to Bin!</span>
              <div className="flex justify-end gap-5 w-[150px]">
                <button
                  className="flex justify-end py-1 px-4 font-bold rounded-lg dark:text-secondary bg-sky-500/25"
                  onClick={resetUndoVariables}
                >
                  Undo
                </button>
              </div>
            </h3>
          </UndoAlert>
        ) : null}
      </div>

      <h2 className="py-1 text-center w-full font-kalam text-3xl font-bold dark:text-primary backdrop-blur-md">
        Simple To-Do Board{" "}
      </h2>

      <div className="lg:w-[55%] md:w-[80%] sm:w-full space-y-4 mx-auto p-2">
        <div className="flex justify-around gap-5 flex-nowrap my-2">
          {/* Task List box START */}
          <div
            id="pending"
            className="p-2 w-full h-full border-2 drop-shadow-lg rounded-lg bg-slate-500/25 backdrop-blur-lg shadow-black"
            onDrop={(e: React.DragEvent) => handleOnDropEvent(e, "TODO")}
            onDragOver={(e: React.DragEvent) => e.preventDefault()}
            role="none"
          >
            <div className="flex justify-between py-2 mb-3 border-b-[0.1px] border-gray-500">
              <h2 className="text-start text-[1.3rem] font-kalam font-bold text-primary">
                Tasks List
              </h2>
            </div>
            <Input
              onEnter={handleOnEnter}
              showValidationAlert={showValidationAlert}
              placeHolder="Add To-Do's and Deadline date "
            />
            <div className=" min-h-[100px] max-h-[560px] overflow-y-auto px-1">
              {itemsList?.map((item) => {
                return item.position === "TODO" ? (
                  <Card
                    key={item.id}
                    id={item.id}
                    setDeleteCard={setDeleteCard}
                    completeState={item.complete}
                    title={item.title}
                    cardItem={JSON.stringify(item)}
                    className={"outline-none"}
                  />
                ) : null;
              })}
            </div>
          </div>
          {/* Task List box END */}

          {/* Tasks Accomplished box START  */}
          <div
            id="done"
            className="p-2 w-full h-full border-2 drop-shadow-lg rounded-lg bg-slate-500/25 backdrop-blur-lg"
          >
            <div className="flex justify-between py-2 mb-5 border-b-[0.1px] border-gray-500">
              <h2 className="text-start text-[1.3rem] font-kalam font-bold text-primary">
                Tasks Accomplished!{" "}
              </h2>
            </div>
            <div
              className="min-h-[20px]"
              onDrop={(e: React.DragEvent) => handleOnDropEvent(e, "DONE")}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
              role="none"
            >
              {itemsList?.map((item) => {
                return item.position === "DONE" ? (
                  <Card
                    key={item.id}
                    id={item.id}
                    setDeleteCard={setDeleteCard}
                    completeState={item.complete}
                    title={item.title}
                    cardItem={JSON.stringify(item)}
                    className={"line-through"}
                  />
                ) : null;
              })}
            </div>
          </div>
          {/* Tasks Accomplished box END  */}
        </div>
      </div>
    </div>
  );
};

export default DnDLayout;
