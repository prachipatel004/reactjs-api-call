// AllPlayersBox.js
import React, { useEffect, useRef, useState } from 'react';

const AllPlayersBox = () => {
  const [visiblePlayers, setVisiblePlayers] = useState([]);
  const observerRef = useRef(null);
  const loaderRef = useRef(null);
  const BATCH_SIZE = 5;
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('players');
    if (stored) {
      const parsed = JSON.parse(stored)?.data;
      const merged = [
        ...(parsed?.wicketkeeper || []),
        ...(parsed?.batsman || []),
        ...(parsed?.allrounder || []),
        ...(parsed?.bowler || []),
      ];
      setAllPlayers(merged);
      setVisiblePlayers(merged.slice(0, BATCH_SIZE));
    }
  }, []);


  const loadMore = () => {
    setVisiblePlayers((prev) => {
      const next = allPlayers.slice(prev.length, prev.length + BATCH_SIZE);
      return [...prev, ...next];
    });
  };


  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [visiblePlayers]);

  return (
    <div className='container'>
    <div style={{ height: '445px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
      {visiblePlayers.map((player, index) => (
        <div key={player.id} className="player-card" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <img src={player.image} alt={player.name} width="60" height="60" />
          <div className='player_details'>
            <div><strong>{player.name}</strong></div>
            <div>Type: {player.type}</div>
            <div>Points: {player.point}</div>
            <div>Team: {player.team_name}</div>
          </div>
        </div>
      ))}
      <div ref={loaderRef} style={{ height: '30px' }} />
    </div>
    </div>
  );
};

export default AllPlayersBox;
