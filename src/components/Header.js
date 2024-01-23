import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Header = () => {
    const isUser = useSelector((state) => state?.user.user)
    return (

        <>
            {!isUser && <Link to="/signin">הרשמה</Link>}<br />
            {!isUser && <Link to="/login">כניסה</Link>}<br />
            {isUser && <Link to="/homePage">דף הבית</Link>}<br />
            {isUser && <Link to="/getRecipes">מתכונים שלי</Link>}<br />
            {isUser && <Link to="/addRecipe">הוספת מתכון</Link>}<br />
            {isUser && <Link to="/addCategory">הוספת קטגוריה</Link>}<br />
            {isUser && <Link to="/myList">רשימת הקניות</Link>}<br />

        </>
    )
}
export default Header;