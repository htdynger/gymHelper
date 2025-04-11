import classes from './Header.module.css'
const Header = ({children}) => {

    return (
        <>
            <div className={classes.headerLogo}>{children}</div>
        </>
    )
}
export default Header