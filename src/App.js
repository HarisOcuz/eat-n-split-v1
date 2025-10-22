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
          ? {
              backgroundColor: "#e1f9ee",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            }
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
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
        Wie hoch ist die Rechnung
      </label>
      <input type="text"></input>
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
        Dein Anteil
      </label>
      <input type="text"></input>
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
        {selectedFriend.name}´s Anteil
      </label>
      <input type="text" disabled></input>
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
        Wer zahlt die Rechnung
      </label>
      <select>
        <option>Haris</option>
        <option>{selectedFriend.name}</option>
      </select>
    </form>
  );
}
