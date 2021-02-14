import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function ForumsCard(props) {
  const [showModal, setShowModal] = useState(false);

  // editing date
  let date, mon, year;
  date = props.date.substr(8, 2);
  mon = props.date.substr(5, 2);
  year = props.date.substr(0, 4);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  mon = monthNames[Number(mon) - 1];
  date = date + " " + mon + " " + year;

  let localData = window.localStorage.getItem("auth_data");
    if (!localData) localData = window.sessionStorage.getItem("auth_data");
    localData = JSON.parse(localData);

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .storage()
      .ref("/forum/" + props.fileName)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("/forum/" + props.Key)
          .remove()
          .then(() => {
            props.fetchData();
          })
          .catch((err) => console.error(err));
      })
      .catch(() =>
        props.setAlert({
          type: "danger",
          title: "Error!",
          content: "Sorry, you don't have access",
        })
      );
  };

  return (
    <>
      {showModal ? (
        <DeleteModal
          message="Are you sure you want to delete this post?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide relative">
        {localData.email === props.email ?
          <button
            className="absolute text-sm bg-gray-800 hover:bg-gray-500 focus:outline-none text-white rounded-lg p-2 opacity-90 right-1 top-1"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-trash-alt"></i> Delete
        </button> : ""}
        <div className="md:flex-shrink-0">
          <img
            src={props.imageUrl}
            alt={props.fileName}
            className="w-full rounded-lg rounded-b-none"
            style={{height:300,width:500}}
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <h2 className="font-bold text-2xl text-gray-800 text-center tracking-normal">
            {props.title}
          </h2>
          <p className="text-md text-gray-900 px-2 mt-2">By {props.name},</p>
          {/* <p className="text-md text-gray-900 px-2 mt-2">Email: {props.email}</p>
          <p className="text-md text-gray-900 px-2 mt-2"><button>
          <i className="fas fa-thumbs-up"></i></button> {props.likes}
          <button className="ml-3">
          <i className="fas fa-thumbs-down"></i></button> {props.dislikes}</p> */}
          <div className="text-sm tracking-tighter">
            <h2 className="text-gray-600 text-right mr-4">Date: {date}</h2>
          </div>
          <p className="text-md text-gray-900 px-2 mt-2">{props.content}</p>
        </div>
      </div>
    </>
  );
}

export default ForumsCard;
