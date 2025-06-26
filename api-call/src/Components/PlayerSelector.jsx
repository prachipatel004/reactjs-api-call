import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABS = ['WK', 'BAT', 'AR', 'BOWL'];
const ROLE_MAP = {
  WK: 'wicketkeeper',
  BAT: 'batsman',
  AR: 'allrounder',
  BOWL: 'bowler',
};

const MAX_PLAYERS = 11;

const DEFAULT_RULES = {
  wicketkeeper: { min: 1, max: 4 },
  batsman: { min: 3, max: 6 },
  allrounder: { min: 1, max: 4 },
  bowler: { min: 2, max: 6 },
  max_team_selection: 7,
  total_credit: 100,
  team1: 'BLB',
  team2: 'BUB',
};


const defaultUserData = {
  "data": {
    "wicketkeeper": [{
      "id": "3",
      "team_name": "BLB",
      "name": "s chauhan",
      "point": "9",
      "type": "wicketkeeper",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 1,
      "created_at_timestamp": ""
    },
    {
      "id": "4",
      "team_name": "BLB",
      "name": "Z Muzaffar",
      "point": "9",
      "type": "wicketkeeper",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 1,
      "created_at_timestamp": ""
    },
    {
      "id": "5",
      "team_name": "BUB",
      "name": "I Khan",
      "point": "8.5",
      "type": "wicketkeeper",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 1,
      "created_at_timestamp": ""
    },
    {
      "id": "6",
      "team_name": "BUB",
      "name": "S Gooch",
      "point": "8.5",
      "type": "wicketkeeper",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 1,
      "created_at_timestamp": ""
    }],
    "batsman": [{
      "id": "7",
      "team_name": "BLB",
      "name": "A Gupta",
      "point": "9.5",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "8",
      "team_name": "BUB",
      "name": "A akurugoda",
      "point": "9",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "9",
      "team_name": "BUB",
      "name": "A Ghani",
      "point": "9",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "10",
      "team_name": "BLB",
      "name": "A Aziz",
      "point": "9",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "11",
      "team_name": "BLB",
      "name": "M Uzair",
      "point": "9",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "12",
      "team_name": "BUB",
      "name": "A Farasat",
      "point": "8.5",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "13",
      "team_name": "BUB",
      "name": "M Daub",
      "point": "8",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "29",
      "team_name": "BUB",
      "name": "O Ozkul",
      "point": "8",
      "type": "batsman",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    }],
    "allrounder": [{
      "id": "14",
      "team_name": "BUB",
      "name": "M Irfan Ghani",
      "point": "9.5",
      "type": "allrounder",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "15",
      "team_name": "BLB",
      "name": "M Hasnai",
      "point": "9.5",
      "type": "allrounder",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "16",
      "team_name": "BUB",
      "name": "A Welingamage",
      "point": "9",
      "type": "allrounder",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "17",
      "team_name": "BLB",
      "name": "R Goyal",
      "point": "9",
      "type": "allrounder",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "18",
      "team_name": "BUB",
      "name": "A Yalmaz",
      "point": "8.5",
      "type": "allrounder",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "19",
      "team_name": "BLB",
      "name": "A Shan",
      "point": "8.5",
      "type": "allrounder",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    }],
    "bowler": [{
      "id": "20",
      "team_name": "BUB",
      "name": "S Shan",
      "point": "8.5",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "21",
      "team_name": "BLB",
      "name": "o Zahid",
      "point": "8.5",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "22",
      "team_name": "BUB",
      "name": "D Akbar",
      "point": "8.5",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "23",
      "team_name": "BLB",
      "name": "M Haris",
      "point": "8.5",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "24",
      "team_name": "BLB",
      "name": "J Singh",
      "point": "8.5",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "25",
      "team_name": "BUB",
      "name": "S Mohandas",
      "point": "8",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "26",
      "team_name": "BUB",
      "name": "N Liyanage",
      "point": "8",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "27",
      "team_name": "BLB",
      "name": "K Wahid",
      "point": "8",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    },
    {
      "id": "28",
      "team_name": "BLB",
      "name": "E Sherani",
      "point": "8",
      "type": "bowler",
      "image": "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
      "is_selected": 0,
      "created_at_timestamp": ""
    }]
  }
};

const PlayerSelector = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [spentPoints, setSpentPoints] = useState(0);
  const [rules, setRules] = useState({});

  const activeTab = TABS[activeTabIndex];
  const currentRole = ROLE_MAP[activeTab];

  useEffect(() => {
    // Store players if not present
    const userInStorage = localStorage.getItem('players');
    if (!userInStorage) {
      localStorage.setItem('players', JSON.stringify(defaultUserData));
    }

    // Store rules if not present
    const rulesInStorage = localStorage.getItem('rules');
    if (!rulesInStorage) {
      localStorage.setItem('rules', JSON.stringify(DEFAULT_RULES));
    }
  }, []);

  useEffect(() => {
    const storedRules = localStorage.getItem('rules');
    if (storedRules) {
      setRules(JSON.parse(storedRules));
    }

    const storedPlayers = localStorage.getItem('players');
    const data = storedPlayers ? JSON.parse(storedPlayers) : {};
    const all = data?.data || {};
    setPlayers(all[currentRole] || []);
  }, [activeTabIndex]);

  const togglePlayer = (player) => {
    const exists = selectedPlayers.find((p) => p.id === player.id);
    const roleCount = selectedPlayers.filter((p) => p.type === player.type).length;
    const teamCount = selectedPlayers.filter((p) => p.team_name === player.team_name).length;
    const roleLimit = rules[player.type];

    if (exists) {
      setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
      setSpentPoints((prev) => prev - parseFloat(player.point));
    } else {
      if (selectedPlayers.length >= MAX_PLAYERS) {
        toast.error('Max 11 players allowed.', { autoClose: 2000 });
        return;
      }
      if (roleLimit && roleCount >= roleLimit.max) {
        toast.error(`You can select max ${roleLimit.max} ${player.type}(s)`, { autoClose: 2000 });
        return;
      }
      if (teamCount >= rules.max_team_selection) {
        toast.error(`Max ${rules.max_team_selection} players allowed from team ${player.team_name}`, { autoClose: 2000 });
        return;
      }

      setSelectedPlayers((prev) => [...prev, player]);
      setSpentPoints((prev) => prev + parseFloat(player.point));
    }
  };

  const handleConfirm = () => {
    const currentCount = selectedPlayers.filter((p) => p.type === currentRole).length;
    const minRequired = rules[currentRole]?.min || 0;

    if (currentCount < minRequired) {
      toast.error(`Select at least ${minRequired} ${currentRole}(s).`, { autoClose: 2000 });
      return;
    }

    if (activeTabIndex < TABS.length - 1) {
      setActiveTabIndex((prev) => prev + 1);
    } else {
      if (selectedPlayers.length !== MAX_PLAYERS) {
        toast.error('Select 11 players before submitting.', { autoClose: 2000 });
        return;
      }
      toast.success('Team submitted successfully!', { autoClose: 2000 });
      console.log('Selected Player IDs:', selectedPlayers.map((p) => p.id));
    }
  };

  const handlePrevious = () => {
    if (activeTabIndex > 0) {
      setActiveTabIndex((prev) => prev - 1);
    }
  };
  const handleClear = () => {
    setSelectedPlayers([]);
    setSpentPoints(0);
    toast.info('Selection cleared.', { autoClose: 2000 });
  };


  return (
    <div className="selector-container">
      <ToastContainer />
      <div className="header">
        <span className="max-rule">Max {rules.max_team_selection || 0} Players from a team</span>
        <div className="info-row">
          <div>
            <span className="label">Players</span>
            <div className="value red">{selectedPlayers.length} of 11</div>
          </div>
          <div>
            <span className="label">Spent</span>
            <div className="value">{spentPoints}</div>
          </div>
          <div>
            <span className="label">Remaining</span>
            <div className="value">{(rules.total_credit || 100) - spentPoints}</div>
          </div>
        </div>
      </div>

     <div className="tabs">
  {TABS.map((tab, index) => {
    const role = ROLE_MAP[TABS[activeTabIndex]];
    const currentCount = selectedPlayers.filter((p) => p.type === role).length;
    const minRequired = rules[role]?.min || 0;

    return (
      <button
        key={tab}
        className={`tab-btn ${index === activeTabIndex ? 'active' : ''}`}
        onClick={() => {
          if (index === activeTabIndex) return;

          if (currentCount < minRequired) {
            toast.error(`Select at least ${minRequired} ${role}(s) before switching tab.`, { autoClose: 2000 });
            return;
          }

          setActiveTabIndex(index);
        }}
      >
        {tab} ({selectedPlayers.filter((p) => p.type === ROLE_MAP[tab]).length})
      </button>
    );
  })}
</div>


      <div className="search-info">Select players for {currentRole}</div>

      <div className="player-list">
        {players.map((player) => {
          const isSelected = selectedPlayers.some((p) => p.id === player.id);
          return (
            <div key={player.id} className={`player-card ${isSelected ? 'selected' : ''}`}>
              <img src={player.image} alt={player.name} className="player-img" />
              <div className="player-info">
                <div className="player-name">{player.name}</div>
                <div className="player-meta">
                  Points: {player.point} | Team: {player.team_name}
                </div>
              </div>
              <button
                className={`action-btn ${isSelected ? 'remove' : 'add'}`}
                onClick={() => togglePlayer(player)}
              >
                {isSelected ? '−' : '+'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="action-row">
        {activeTabIndex > 0 && (
          <button className="back-btn" onClick={handlePrevious}>
            Previous
          </button>
        )}
        {selectedPlayers.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        )}
        <button className="confirm-btn" onClick={handleConfirm}>
          {activeTabIndex === TABS.length - 1 ? 'SUBMIT' : 'CONFIRM'}
        </button>
      </div>
    </div>
  );
};

export default PlayerSelector;
