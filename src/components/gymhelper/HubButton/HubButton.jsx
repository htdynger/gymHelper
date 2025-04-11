
const HubButton = ({setActiveSection, styleButton, setSelectedDay}) => {
    const setInitialStateFunction = () => {
        setActiveSection('none')
        setSelectedDay('')
    }

    return (
        <button style={styleButton} onClick={()=>setInitialStateFunction()}> Выйти </button>
    )
}
export default HubButton