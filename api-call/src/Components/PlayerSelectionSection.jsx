// PlayerSelector.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePlayerContext } from './PlayerContext';

const TABS = ['WK', 'BAT', 'AR', 'BOWL'];
const ROLE_MAP = {
    WK: 'wicketkeeper',
    BAT: 'batsman',
    AR: 'allrounder',
    BOWL: 'bowler',
};
const MAX_PLAYERS = 11;

const PlayerSelectionSection = () => {
    const { playerData, rules, deletePlayer, editPlayer, addPlayer } = usePlayerContext();

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [spentPoints, setSpentPoints] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState(ROLE_MAP[TABS[0]]);

    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerTeam, setNewPlayerTeam] = useState('');
    const [newPlayerPoint, setNewPlayerPoint] = useState('');
    const [newPlayerImage, setNewPlayerImage] = useState('');

    const activeTab = TABS[activeTabIndex];
    const currentRole = ROLE_MAP[activeTab];
    const filteredRolePlayers = playerData[filterType] || [];

    const filteredPlayers = filteredRolePlayers.filter((p) =>
        p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

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
                toast.error('Max 11 players allowed.');
                return;
            }
            if (roleLimit && roleCount >= roleLimit.max) {
                toast.error(`Max ${roleLimit.max} ${player.type}s allowed.`);
                return;
            }
            if (teamCount >= rules.max_team_selection) {
                toast.error(`Max ${rules.max_team_selection} from ${player.team_name}`);
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
            toast.error(`Select at least ${minRequired} ${currentRole}(s).`);
            return;
        }

        if (activeTabIndex < TABS.length - 1) {
            setActiveTabIndex((prev) => prev + 1);
            setFilterType(ROLE_MAP[TABS[activeTabIndex + 1]]);
            setSearchTerm('');
        } else {
            if (selectedPlayers.length !== MAX_PLAYERS) {
                toast.error('Select 11 players before submitting.');
                return;
            }
            toast.success('Team submitted successfully!');
        }
    };

    const handleEdit = (player) => {
        const name = prompt('Edit Name:', player.name);
        const team = prompt('Edit Team:', player.team_name);
        const point = prompt('Edit Points:', player.point);
        if (name && team && point) {
            const updated = { ...player, name, team_name: team, point };
            editPlayer(player.type, updated);
            toast.success('Player updated!', { autoClose: 2000 });
        }
    };

    const handleDelete = (player) => {
        if (window.confirm(`Delete player "${player.name}"?`)) {
            deletePlayer(player.type, player.id);
            toast.info('Player deleted.');
        }
    };

    const handleClear = () => {
        setSelectedPlayers([]);
        setSpentPoints(0);
        toast.info('Selection cleared.');
    };

    const handleAddPlayer = () => {
        if (!newPlayerName || !newPlayerTeam || !newPlayerPoint) {
            toast.error("All fileds are required");
            return;
        }

        const newPlayer = {
            id: Date.now().toString(),
            name: newPlayerName,
            team_name: newPlayerTeam,
            point: parseFloat(newPlayerPoint),
            image: newPlayerImage || 'https://via.placeholder.com/100',
            type: filterType,
        };

        addPlayer(filterType, newPlayer);
        toast.success("Player added!");

        setNewPlayerName('');
        setNewPlayerTeam('');
        setNewPlayerPoint('');
        setNewPlayerImage('');
    };

    return (
        <div className="selector-container">
            <ToastContainer />
            <div className="header">
                <span className="max-rule">Max {rules.max_team_selection || 0} Players from a team</span>
                <div className="info-row">
                    <div><span className="label">Players</span><div className="value red">{selectedPlayers.length} of 11</div></div>
                    <div><span className="label">Spent</span><div className="value">{spentPoints}</div></div>
                    <div><span className="label">Remaining</span><div className="value">{(rules.total_credit || 100) - spentPoints}</div></div>
                </div>
            </div>

            <div className="tabs">
                {TABS.map((tab, index) => {
                    const role = ROLE_MAP[TABS[activeTabIndex]];
                    const currentCount = selectedPlayers.filter((p) => p.type === role).length;
                    const minRequired = rules[role]?.min || 0;
                    return (
                        <button key={tab} className={`tab-btn ${index === activeTabIndex ? 'active' : ''}`}
                            onClick={() => {
                                if (index === activeTabIndex) return;
                                if (currentCount < minRequired) {
                                    toast.error(`Select at least ${minRequired} ${role}(s).`);
                                    return;
                                }
                                setActiveTabIndex(index);
                                setFilterType(ROLE_MAP[tab]);
                                setSearchTerm('');
                            }}>
                            {tab} ({selectedPlayers.filter((p) => p.type === ROLE_MAP[tab]).length})
                        </button>
                    );
                })}
            </div>

            <div className="search-info">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    {Object.values(ROLE_MAP).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={`Search ${filterType}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="add-player-form">
                <input type="text" placeholder="Enter Name" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} />
                <input type="text" placeholder="Team name" value={newPlayerTeam} onChange={(e) => setNewPlayerTeam(e.target.value)} />
                <input type="number" placeholder="Player's point" value={newPlayerPoint} onChange={(e) => setNewPlayerPoint(e.target.value)} />
                <input type="text" placeholder="Image URL" value={newPlayerImage} onChange={(e) => setNewPlayerImage(e.target.value)} />
                <button onClick={handleAddPlayer} className='add_btn'>Add Player</button>
            </div>

            <div className="player-list">
                {filteredPlayers.map((player) => {
                    const isSelected = selectedPlayers.some((p) => p.id === player.id);
                    return (
                        <div key={player.id} className={`player-card ${isSelected ? 'selected' : ''}`}>
                            <img src={player.image} alt={player.name} className="player-img" />
                            <div className="player-info">
                                <div className="player-name">{player.name}</div>
                                <div className="player-meta">Points: {player.point} | Team: {player.team_name}</div>
                            </div>
                            <div className="action-buttons">
                                <button className={`action-btn ${isSelected ? 'remove' : 'add'}`} onClick={() => togglePlayer(player)}>
                                    {isSelected ? '−' : '+'}
                                </button>
                                {isSelected && (
                                    <>
                                        <button onClick={() => handleEdit(player)} className="edit_btn">Edit</button>
                                        <button onClick={() => handleDelete(player)} className="delete_btn">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="action-row">
                {activeTabIndex > 0 && (
                    <button className="back-btn" onClick={() => setActiveTabIndex((prev) => prev - 1)}>
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

export default PlayerSelectionSection;
