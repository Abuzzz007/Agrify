import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//Components
import LogOutModal from "../Modals/LogOutModal";
//Images
import logo from "../../assets/logo192.png";

function Sidebar(props) {
  const history = useHistory();
  const [route, setRoute] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [collapse, setCollapse] = useState(true);

  useEffect(() => setRoute(window.location.pathname), []);

  useEffect(() => {
    const sidebar = document.getElementsByClassName("sliding-sidebar")[0];
    const menu = [...document.getElementsByClassName("menu-btn")];
    const checkclick = (e) => {
      menu.map((btn) => {
        if (!collapse && btn.contains(e.target)) {
          setCollapse(true);
        }
        return 0;
      });
      if (!collapse && !sidebar.contains(e.target)) {
        setCollapse(true);
      }
    };
    document.addEventListener("click", checkclick);

    return () => document.removeEventListener("click", checkclick);
  }, [collapse]);

  let selected = "bg-gray-700 text-gray-100 border-r-4 border-gray-100";
  let unselected =
    "text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100";

  const mouseEnterHandler = () => {
    if (window.innerWidth < 1024) {
      setCollapse(false);
    }
  };

  const mouseLeaveHandler = () => {
    if (window.innerWidth >= 640) {
      setCollapse(true);
    }
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    props.setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <>
      {showModal ? (
        <LogOutModal
          setShowModal={setShowModal}
          logoutHandler={logoutHandler}
        />
      ) : (
        ""
      )}

      {/* horizontal navbar */}
      <div className="sm:hidden bg-gray-900 left-0 top-0 right-0 shadow fixed z-10">
        <div className="flex pt-2 pb-1">
          <button
            className="text-gray-100 text-2xl p-2 px-3 -mt-1 mx-2 rounded-md focus:outline-none hover:bg-gray-700"
            onClick={() => setCollapse(false)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <img className="w-12 h-12" src={logo} alt="Logo" />
          <h1
            className="mt-1 ml-1"
            style={{
              fontFamily: "Lobster, cursive",
              color: "rgb(161,214,61)",
              fontSize: 25,
            }}
          >
            Agrify
                </h1>
        </div>
      </div>

      {/* actual sidebar */}
      <div
        className="w-14 lg:w-64 h-screen bg-gray-900 fixed top-0 left-0 overflow-auto hidden sm:block"
        onMouseEnter={() => mouseEnterHandler()}
      >
        <div className="flex items-center justify-center mt-10">
          <img className="w-9 lg:w-12 py-1.5 lg:py-0" src={logo} alt="Logo" />
        </div>
        <h1
          className="w-full text-center -mt-3"
          style={{
            fontFamily: "Lobster, cursive",
            color: "rgb(161,214,61)",
            fontSize: 20,
          }}
        >
          Agrify
                </h1>

        <nav className="mt-10">
          <button
            className={
              "flex items-center py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/" ? selected : unselected)
            }
            onClick={() => {
              history.push("/");
              setRoute("/");
            }}
          >
            <span className="mx-4 font-medium lg:block hidden">Home</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/tomato" ? selected : unselected)
            }
            onClick={() => {
              history.push("/tomato");
              setRoute("/tomato");
            }}
          >
            <span className="mx-4 font-medium lg:block hidden">Tomato</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/potato" ? selected : unselected)
            }
            onClick={() => {
              history.push("/potato");
              setRoute("/potato");
            }}
          >
            <span className="mx-4 font-medium lg:block hidden">Potato</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/pepper" ? selected : unselected)
            }
            onClick={() => {
              history.push("/pepper");
              setRoute("/pepper");
            }}
          >
            <span className="mx-4 font-medium lg:block hidden">Pepper</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/cotton" ? selected : unselected)
            }
            onClick={() => {
              history.push("/cotton");
              setRoute("/cotton");
            }}
          >
            <span className="mx-4 font-medium lg:block hidden">
              Cotton
            </span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              unselected
            }
            onClick={() => setShowModal(true)}
          >
            <span className="mx-4 font-medium lg:block hidden">Log Out</span>
          </button>
        </nav>
      </div>

      {/* sliding sidebar */}
      <div
        className={
          "sliding-sidebar w-56 sm:w-64 h-screen bg-gray-900 fixed top-0 overflow-auto z-30 transition duration-500 lg:hidden transform " +
          (collapse ? "-translate-x-64" : "")
        }
        onMouseLeave={() => mouseLeaveHandler()}
      >
        <div className="flex items-center justify-center mt-10">
          <img className="w-12" src={logo} alt="Logo" />
        </div>
        <h1
          className="w-full text-center -mt-3"
          style={{
            fontFamily: "Lobster, cursive",
            color: "rgb(161,214,61)",
            fontSize: 20,
          }}
        >
          Agrify
                </h1>

        <nav className="mt-10">
          <button
            className={
              "menu-btn flex items-center py-2 px-8 w-full focus:outline-none " +
              (route === "/" ? selected : unselected)
            }
            onClick={() => {
              history.push("/");
              setRoute("/");
            }}
          >
            <span className="mx-4 font-medium block">Home</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/tomato" ? selected : unselected)
            }
            onClick={() => {
              history.push("/tomato");
              setRoute("/tomato");
            }}
          >
            <span className="mx-4 font-medium block">Tomato</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/potato" ? selected : unselected)
            }
            onClick={() => {
              history.push("/potato");
              setRoute("/potato");
            }}
          >
            <span className="mx-4 font-medium block">Potato</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/pepper" ? selected : unselected)
            }
            onClick={() => {
              history.push("/pepper");
              setRoute("/pepper");
            }}
          >
            <span className="mx-4 font-medium block">Pepper</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/cotton" ? selected : unselected)
            }
            onClick={() => {
              history.push("/cotton");
              setRoute("/cotton");
            }}
          >
            <span className="mx-4 font-medium block">Cotton</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              unselected
            }
            onClick={() => setShowModal(true)}
          >
            <span className="mx-4 font-medium block">Log Out</span>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
