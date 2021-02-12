import { useHistory } from "react-router-dom"
import HomeCard from "../../components/Cards/HomeCard"
//Images
import tomatobg from "../../assets/tomato.jpeg"
import potatobg from "../../assets/potato.jpg"
import pepperbg from "../../assets/pepper.jpg"
import cottonbg from "../../assets/cotton.jpg"

function Home() {
    const history = useHistory();

    let localData = window.localStorage.getItem("auth_data");
    if (!localData) localData = window.sessionStorage.getItem("auth_data");
    localData = JSON.parse(localData);

    return (
    <>
    <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-10">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Home</div>
            </div>
            <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
                <div className="ml-5 text-2xl w-full px-4 pt-8 mt-5">
                    Welcome{" "+localData.name+","}<br/>Choose a plant below
                </div>
                <div className="mx-auto px-4 pt-8 max-w-md mt-5">
                    <button onClick={()=>history.push("/tomato")}>
                        <HomeCard bg={ tomatobg} title="Tomato"/>
                        </button>
                </div>
                <div className="mx-auto px-4 pt-8 max-w-md mt-5">
                    <button onClick={()=>history.push("/potato")}>
                        <HomeCard bg={ potatobg} title="Potato"/>
                        </button>
                </div>
                <div className="mx-auto px-4 pt-8 max-w-md mt-5">
                    <button onClick={()=>history.push("/pepper")}>
                        <HomeCard bg={ pepperbg} title="Pepper"/>
                        </button>
                </div>
                <div className="mx-auto px-4 pt-8 max-w-md mt-5">
                    <button onClick={()=>history.push("/cotton")}>
                        <HomeCard bg={ cottonbg} title="Cotton"/>
                        </button>
                </div>
      </div></>)
}

export default Home