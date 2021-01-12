import NavBar from "../components/Navbars/Navbar"
export default function Layout({children,data}){
 return(
<>
<NavBar login={data}/>
{children}
</>

 )   
}