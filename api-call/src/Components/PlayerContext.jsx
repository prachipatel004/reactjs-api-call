// PlayerContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const PlayerContext = createContext();

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


export const PlayerProvider = ({ children }) => {
    const [playerData, setPlayerData] = useState({});
    const [rules, setRules] = useState(DEFAULT_RULES);

    useEffect(() => {
        const stored = localStorage.getItem('players');
        if (!stored) {
            localStorage.setItem('players', JSON.stringify(defaultUserData));
        }

        const ruleStored = localStorage.getItem('rules');
        if (!ruleStored) {
            localStorage.setItem('rules', JSON.stringify(DEFAULT_RULES));
        }

        const parsedPlayers = JSON.parse(localStorage.getItem('players'));
        setPlayerData(parsedPlayers.data || {});
        setRules(JSON.parse(localStorage.getItem('rules')));
    }, []);

    const updateStorage = (data) => {
        localStorage.setItem('players', JSON.stringify({ data }));
    };

    const deletePlayer = (role, id) => {
        const updated = {
            ...playerData,
            [role]: playerData[role].filter((p) => p.id !== id),
        };
        setPlayerData(updated);
        updateStorage(updated);
    };

    const editPlayer = (type, updatedPlayer) => {
        setPlayerData((prevData) => {
            const updatedList = prevData[type].map((player) =>
                player.id === updatedPlayer.id ? updatedPlayer : player
            );
            const newData = { ...prevData, [type]: updatedList };
            updateStorage(newData);
            return newData;
        });
    };

    const addPlayer = (type, newPlayer) => {
        setPlayerData((prevData) => {
            const updatedList = [...(prevData[type] || []), newPlayer];
            const newData = { ...prevData, [type]: updatedList };
            updateStorage(newData);
            return newData;
        });
    };

    return (
        <PlayerContext.Provider value={{ playerData, rules, deletePlayer, editPlayer, addPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => useContext(PlayerContext);
