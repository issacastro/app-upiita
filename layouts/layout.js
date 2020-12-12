import NavBar from "../components/Navbars/Navbar"
export default function Layout({children}){
 return(
<>
<NavBar/>
{children}
</>

 )   
}