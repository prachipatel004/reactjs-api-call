import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
const MAX_TEAM_PLAYERS = 7;
const TOTAL_CREDIT = 95;

const PlayerSelector = () => {
  const [players, setPlayers] = useState([]);
  const [rules, setRules] = useState({});
  const [searchText, setSearchText] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState(() => {
    const saved = localStorage.getItem('selectedPlayers');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeTab = TABS[activeTabIndex];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        headers: { platform: 'AnDroId@Trace' },
      };
      const [playersRes, rulesRes] = await Promise.all([
        axios.get('https://devapi.chatmyastrologer.com/api/v1/admin/common/getAllPlayer', headers),
        axios.get('https://devapi.chatmyastrologer.com/api/v1/admin/common/getAllPlayerRules', headers),
      ]);

      const rawData = playersRes.data?.data || {};

      const allPlayers = [
        ...(rawData.wicketkeeper || []).map(p => ({ ...p, type: 'wicketkeeper', points: Number(p.point) })),
        ...(rawData.batsman || []).map(p => ({ ...p, type: 'batsman', points: Number(p.point) })),
        ...(rawData.allrounder || []).map(p => ({ ...p, type: 'allrounder', points: Number(p.point) })),
        ...(rawData.bowler || []).map(p => ({ ...p, type: 'bowler', points: Number(p.point) })),
      ];

      setPlayers(allPlayers);
      setRules(rulesRes.data?.data || {});
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleTogglePlayer = (player) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    let updated;

    if (isSelected) {
      updated = selectedPlayers.filter(p => p.id !== player.id);
    } else {
      const sameTypeCount = selectedPlayers.filter(p => p.type === player.type).length;
      const maxLimit = rules[player.type]?.max || MAX_PLAYERS;
      const sameTeamCount = selectedPlayers.filter(p => p.team_name === player.team_name).length;
      const currentTotalCredits = selectedPlayers.reduce((sum, p) => sum + p.points, 0);
      const newTotalCredits = currentTotalCredits + player.points;

      if (selectedPlayers.length >= MAX_PLAYERS) {
        setError("You can select up to 11 players only.");
        return;
      }
      if (sameTeamCount >= MAX_TEAM_PLAYERS) {
        setError(`You can select max ${MAX_TEAM_PLAYERS} players from one team.`);
        return;
      }
      if (sameTypeCount >= maxLimit) {
        setError(`Max ${maxLimit} players allowed for ${player.type}`);
        return;
      }
      if (newTotalCredits > TOTAL_CREDIT) {
        setError(`Total credits exceeded! Maximum allowed is ${TOTAL_CREDIT}.`);
        return;
      }

      updated = [...selectedPlayers, player];
    }

    setError('');
    setSelectedPlayers(updated);
    localStorage.setItem('selectedPlayers', JSON.stringify(updated));
  };

  const filteredPlayers = players.filter(
    (p) =>
      p.type === ROLE_MAP[activeTab] &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleConfirm = () => {
    const currentRole = ROLE_MAP[activeTab];
    const selectedCount = selectedPlayers.filter(p => p.type === currentRole).length;
    const minRequired = rules[currentRole]?.min || 0;

    if (selectedCount < minRequired) {
      setError(`Please select at least ${minRequired} ${currentRole}(s).`);
      return;
    }

    setError('');
    if (activeTabIndex < TABS.length - 1) {
      setActiveTabIndex(activeTabIndex + 1);
    }
  };

  const savePlayerSelection = async (selectedIdsArray) => {
    const data = { Ids: selectedIdsArray.join(',') };
    try {
      const response = await axios.post(
        'https://devapi.chatmyastrologer.com/api/v1/admin/common/savePlayerSelection',
        data,
        {
          headers: {
            platform: 'AnDroId@Trace',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Save Response:", response.data);
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handlePrevious = () => {
    if (activeTabIndex > 0) {
      setActiveTabIndex(activeTabIndex - 1);
      setError('');
    }
  };

  const handleClear = () => {
    if (selectedPlayers.length === 0) {
      toast.error('No players to clear.');
      return;
    }

    setSelectedPlayers([]);
    localStorage.removeItem('selectedPlayers');
    setActiveTabIndex(0);
    setError('');
    toast.success('Selection cleared.');
  };

  const totalCreditsUsed = selectedPlayers.reduce((sum, p) => sum + p.points, 0);
  const remainingCredits = (TOTAL_CREDIT - totalCreditsUsed).toFixed(1);

  const handleFinalSubmit = async () => {
    if (selectedPlayers.length !== MAX_PLAYERS) {
      setError(`You must select exactly ${MAX_PLAYERS} players. Currently selected: ${selectedPlayers.length}`);
      toast.error(`You must select exactly ${MAX_PLAYERS} players.`);

      for (let i = 0; i < TABS.length; i++) {
        const role = ROLE_MAP[TABS[i]];
        const selectedCount = selectedPlayers.filter(p => p.type === role).length;
        const minRequired = rules[role]?.min || 0;
        if (selectedCount < minRequired) {
          setActiveTabIndex(i);
          break;
        }
      }

      return;
    }

    const currentRole = ROLE_MAP[activeTab];
    const selectedCount = selectedPlayers.filter(p => p.type === currentRole).length;
    const minRequired = rules[currentRole]?.min || 0;

    if (selectedCount < minRequired) {
      setError(`Please select at least ${minRequired} ${currentRole}(s).`);
      toast.error(`Please select at least ${minRequired} ${currentRole}(s).`);
      return;
    }

    if (totalCreditsUsed > TOTAL_CREDIT) {
      setError(`Total credits used (${totalCreditsUsed}) exceed the limit of ${TOTAL_CREDIT}.`);
      toast.error(`Total credits used (${totalCreditsUsed}) exceed the limit of ${TOTAL_CREDIT}.`);
      return;
    }

    setError('');
    setIsSubmitting(true);

    const selectedIds = selectedPlayers.map(p => p.id);
    await savePlayerSelection(selectedIds);

    localStorage.removeItem('selectedPlayers');
    setSelectedPlayers([]);
    setActiveTabIndex(0);
    setIsSubmitting(false);
    toast.success('Team selected successfully!');
  };

  return (
    <div className="selector-container">
      <h4 className="title">Max 7 Players from a Team</h4>

      <div className="stats">
        <div>Players <span className="highlight">{selectedPlayers.length}</span> / {MAX_PLAYERS}</div>
        <div>Spent <span className="highlight">{totalCreditsUsed}</span></div>
        <div>Remaining <span className="highlight">{remainingCredits}</span></div>
      </div>

      <div className="dots">
        {[...Array(MAX_PLAYERS)].map((_, i) => (
          <div key={i} className={`dot ${i < selectedPlayers.length ? 'filled' : ''}`} />
        ))}
      </div>

      <div className="tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`tab ${activeTabIndex === i ? 'active' : ''}`}
            onClick={() => {
              console.log("weirfkm");
              
              setActiveTabIndex(i);
              setError('');
            }}
          >
            {tab} ({selectedPlayers.filter(p => p.type === ROLE_MAP[tab]).length})
          </button>
        ))}
      </div>

      <div className="subtitle">
        Select {ROLE_MAP[activeTab]} ({rules[ROLE_MAP[activeTab]]?.min || 0}-{rules[ROLE_MAP[activeTab]]?.max || 0})
      </div>

      {error && <div className="error">{error}</div>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Player"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="player-list">
        {filteredPlayers.length === 0 ? (
          <p className="no-data">No Players Found</p>
        ) : (
          filteredPlayers.map((player) => {
            const isSelected = selectedPlayers.some((p) => p.id === player.id);
            return (
              <div key={player.id} className={`player-card ${isSelected ? 'selected' : ''}`}>
                <img src={player.image} alt={player.name} />
                <div className="player-info">
                  <strong>{player.name}</strong>
                  <p>Points: {player.point} | Team: {player.team_name}</p>
                </div>
                <button onClick={() => handleTogglePlayer(player)} className="toggle-btn">
                  {isSelected ? '−' : '+'}
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="btn-group">
        {activeTabIndex > 0 && (
          <button className="prev-btn" onClick={handlePrevious}>Previous</button>
        )}
        <button className="clear_btn" onClick={handleClear}>Clear</button>

        {activeTabIndex < TABS.length - 1 ? (
          <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
        ) : (
          <button
            className="confirm-btn final"
            onClick={handleFinalSubmit}
            disabled={isSubmitting || selectedPlayers.length !== MAX_PLAYERS}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Team'}
          </button>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default PlayerSelector;
