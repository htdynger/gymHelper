
const useLocalStorage = (key, initialState) => {
    

    
    if (!localStorage.getItem(key)) localStorage.setItem(key, initialState)
    const getItemLocalStorage = () => {return localStorage.getItem(key)}
    const setItemLocalStorage = (setValue) => localStorage.setItem(key, setValue)
    
    return [getItemLocalStorage, setItemLocalStorage]

    
}

export default useLocalStorage