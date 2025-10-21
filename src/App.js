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

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
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

  // ADDING CUSTOM FRIEND

  const [addFriends, setAddFriends] = useState(initialFriends);

  function handleAddFriends(friend) {
    setAddFriends((friends) => [...addFriends, friend]);
    setShowForm(false);
  }

  // SELECTED FRIEND

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelectFriend(friend) {
    if (selectedFriend !== friend) {
      setSelectedFriend(friend);
    } else setSelectedFriend(null);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <FriendsList
          onShowForm={handleShowForm}
          addFriends={addFriends}
          onSelectedFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showForm && <CustomFriend onAddFriends={handleAddFriends} />}
        <AddFriend onShowForm={handleShowForm} showForm={showForm} />
      </div>
      {selectedFriend && <SplitingTheBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ addFriends, onSelectedFriend, selectedFriend }) {
  const friends = addFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          onSelectedFriend={onSelectedFriend}
          selectedFriend={selectedFriend}
          friend={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  return (
    <li
      className="li-friends"
      style={
        selectedFriend && selectedFriend.id === friend.id
          ? { backgroundColor: "#e1f9ee" }
          : {}
      }
    >
      <img src={friend.image} alt="." />

      <label>{friend.name}</label>
      <Button onClick={() => onSelectedFriend(friend)} className="btn">
        {selectedFriend && selectedFriend.id === friend.id
          ? "Zumachen"
          : "Auswählen"}
      </Button>

      {friend.balance > 0 && (
        <p className="green">{`${friend.name} schuldet dir ${Math.abs(
          friend.balance
        )}€`}</p>
      )}
      {friend.balance < 0 && (
        <p className="red">{`Du schuldest ${friend.name} ${Math.abs(
          friend.balance
        )}€`}</p>
      )}
      {friend.balance === 0 && <p>{`${friend.name} und du seit quit`}</p>}
    </li>
  );
}

function AddFriend({ onShowForm, showForm }) {
  console.log(showForm);
  return (
    <Button onClick={onShowForm}>
      {showForm ? "Zumachen" : "Freund zufügen"}
    </Button>
  );
}

function CustomFriend({ onAddFriends }) {
  const [customFriend, setCustomFriend] = useState("");
  const [customUrl, setCustomUrl] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!customFriend || !customUrl) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name: customFriend,
      id,
      image: `${customUrl}?=${id}`,
      balance: 0,
    };
    onAddFriends(newFriend);
  }

  function handleCustomUrl(e) {
    setCustomUrl(e.target.value);
  }

  function handleCustomFriend(e) {
    setCustomFriend(e.target.value);
    console.log(customFriend);
  }

  return (
    <form className="custom-friend">
      <input
        value={customFriend}
        onChange={handleCustomFriend}
        className="input"
        placeholder="Namen eingeben"
      />
      <input
        value={customUrl}
        onChange={handleCustomUrl}
        className="input"
        placeholder="URL eingeben"
      />
      <Button onClick={handleSubmit}>Bestätigen</Button>
    </form>
  );
}

function SplitingTheBill({ selectedFriend }) {
  return (
    <form className="splitting-bill-form">
      <h3>{`Splitte die Rechnung mit ${selectedFriend.name}`}</h3>
      <label>Wie hoch ist die Rechnung :</label>
      <input type="text"></input>
      <label>Dein Anteil :</label>
      <input type="text"></input>
      <label>{selectedFriend.name}´s Anteil :</label>
      <input type="text" disabled></input>
      <label>Wer zahlt die Rechnung ?</label>
      <select>
        <option>Haris</option>
        <option>{selectedFriend.name}</option>
      </select>
    </form>
  );
}
