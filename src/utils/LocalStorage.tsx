

//** GOLBALS **// 
const LOCALSTORAGE_KEY: string = "TODOLIST";
const LOCALSTORAGE_DROP_KEY: string = "DROPLIST";

// const WEEKDAYS_ARRAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_ARRAY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface NewItem {
    id: string,
    title: string,
    complete: boolean,
    completeTill: string,
    position: "TODO" | "DONE"
}

export interface AlertMessage {
    message: "success" | "fail" | "duplicate"
}

export interface deleteStateType {
    state: boolean,
    cardId: string
  }

export const nullFunction = () => {
    console.log("This is null function.");
    
}


const checkIfTitleExists = (newTitle: string, itemList: NewItem[]): boolean => {
    return itemList.some((item) => (item.title.includes(newTitle)) ? true : false)
}


export const getFromStorage = (): NewItem[] => {

    const storage: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
    return (storage != null) ? JSON.parse(storage) : null;
}

export const formatDateAndTime = (inputDate: string): string => {
    
    const selectedDate = new Date(inputDate);
    const month = MONTHS_ARRAY[selectedDate.getMonth()];
    const date = selectedDate.getDate();

    return `${month}, ${date}`; 
}

export const findDiffOfGivenDateAndToday = (date: string): number => {
    const todaysDate = new Date(); 
    const givenDate = new Date(`2024 ${date}`);
    const diffTime = (givenDate.valueOf() - todaysDate.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return (diffDays === -0 || diffDays === 0) ? 0 : Number(diffDays);
}

export const saveToStorage = (newItemTitle: string, inputDate: string): AlertMessage => {

    const storage: NewItem[] | null = getFromStorage();
    const newItem: NewItem = {
        id: `_task${Date.now()}`,
        title: newItemTitle,
        complete: false,
        completeTill: formatDateAndTime(inputDate), 
        position: "TODO",
    }

    if (storage == null) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([newItem]));
        return { message: 'success' }

    } else {
        if (!checkIfTitleExists(newItemTitle, storage)) {
            storage.push(newItem)
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage))
            return { message: 'success' }
        }

        return { message: 'duplicate' } 
    }  
}


export const deleteFromStorage = (itemId: string): void => { 

    let storage: NewItem[] | null = getFromStorage(); 
    storage = storage.filter((task: NewItem): boolean => {
        return task.id !== itemId
    });

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage))
}

export const editItemToStroage = (itemId: string, editedValue: string): void => {
    console.log(itemId, editedValue);
    
    const storage = getFromStorage();
    let item = storage.find(item => item.id === itemId);
    
    // (item) ? item.title = editedValue : null;

    if(item) {
        item.title = editedValue
    }
    
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage))
    
}


// DROP storage

export const getFromDropStorage = (): NewItem[] => {
    const storage: string | null = localStorage.getItem(LOCALSTORAGE_DROP_KEY);
    return (storage != null) ? JSON.parse(storage) : null;
}

export const saveToDropStorage = (dropItem: NewItem, position: string): void => {

    const storage: NewItem[] | null = getFromStorage();
    let item = storage.find(singleItem => singleItem.id === dropItem.id);

    if (item) {
        (position === "DONE") ? item.position = "DONE" : item.position = "TODO";
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));

}




























