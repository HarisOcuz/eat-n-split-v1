import { useState } from "react";

const initialFriends = [
  {
    name: "Haris",
    id: 255,
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -300,
  },
  {
    name: "Mirnes",
    id: 355,
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 200,
  },
  {
    name: "Muha",
    id: 408,
    image: "https://i.pravatar.cc/48?u=9333213",

    balance: 0,
  },
  {
    name: "Fatima",
    image: "https://i.pravatar.cc/48?u=9213123",

    id: 505,
    balance: 15,
  },
];

function Button({ children, onShowForm }) {
  return (
    <button className="btn" onClick={onShowForm}>
      {children}
    </button>
  );
}

export default function App() {
  // SHOWING THE FORM - ADD FRIEND

  const [showForm, setShowForm] = useState(false);

  function handleShowForm() {
    setShowForm((prev) => !prev);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <FriendsList onShowForm={handleShowForm} />
        {showForm && <CustomFriend />}
        <AddFriend onShowForm={handleShowForm} showForm={showForm} />
      </div>
      <SplitingTheBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li className="li-friends">
      <img src={friend.image} alt="." />

      <label>{friend.name}</label>
      <Button className="btn">Auswählen</Button>

      {friend.balance > 0 && (
        <p className="green">{`${friend.name} schuldet dir ${friend.balance}€`}</p>
      )}
      {friend.balance < 0 && (
        <p className="red">{`Du schuldest ${friend.name} ${friend.balance}€`}</p>
      )}
      {friend.balance === 0 && <p>{`${friend.name} und du seit quit`}</p>}
    </li>
  );
}

function AddFriend({ onShowForm, showForm }) {
  console.log(showForm);
  return (
    <Button onShowForm={onShowForm}>
      {showForm ? "Zumachen" : "Freund zufügen"}
    </Button>
  );
}

function CustomFriend() {
  return (
    <form className="custom-friend">
      <input className="input" placeholder="Namen eingeben" />
      <input className="input" placeholder="URL eingeben" />
      <Button>Bestätigen</Button>
    </form>
  );
}

function SplitingTheBill() {
  return (
    <form className="splitting-bill-form">
      <h3>Splitte die Rechnung mit XXX</h3>
      <label>Wie hoch ist die Rechnung</label>
      <input type="text"></input>
      <label>Dein Anteil</label>
      <input type="text"></input>
      <label>XXXs Anteil</label>
      <input type="text" disabled></input>
      <label>Wer zahlt die Rechnung ?</label>
      <select>
        <option>Haris</option>
        <option>Fatima</option>
      </select>
    </form>
  );
}
