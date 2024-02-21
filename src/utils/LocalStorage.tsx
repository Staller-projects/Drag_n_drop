

//** GOLBALS **// 
const LOCALSTORAGE_KEY: string = "TODOLIST";
const LOCALSTORAGE_DROP_KEY: string = "DROPLIST";

export interface NewItem {
    id: string,
    title: string,
    complete: boolean,
    position: "TODO" | "DONE"
}

export interface AlertMessage {
    message: "success" | "fail" | "duplicate"
}



const checkIfTitleExists = (newTitle: string, itemList: NewItem[]): boolean => {
    return itemList.some((item) => (item.title.includes(newTitle)) ? true : false)
}



export const getFromStorage = (): NewItem[] => {

    const storage: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
    return (storage != null) ? JSON.parse(storage) : null;
}

export const saveToStorage = (newItemTitle: string): AlertMessage => {

    const storage: NewItem[] | null = getFromStorage();
    const newItem: NewItem = {
        id: `_task${Date.now()}`,
        title: newItemTitle,
        complete: false,
        position: "TODO"
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


export const deleteFromStorage = (taskId: string): void => {
    console.log("delete");

    let storage: NewItem[] | null = getFromStorage();


    storage = storage.filter((task: NewItem): boolean => {
        return task.id === taskId
    });

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage))



    // document.getElementById(taskId).remove(); 
    // updateTaskToLocalstorage(tasks);

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




























