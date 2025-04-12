// src/pages/SavedCandidates.tsx
import React, { useState } from 'react'; // Remove unused useEffect import
import { Link } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  const handleRemove = (login: string) => {
    const updatedSaved = savedCandidates.filter((candidate) => candidate.login !== login);
    setSavedCandidates(updatedSaved);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSaved));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      <Link to="/">Back to Candidate Search</Link>

      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <div>
          {savedCandidates.map((candidate) => (
            <div key={candidate.login} style={{ marginBottom: '16px' }}>
              <CandidateCard candidate={candidate} />
              <button onClick={() => handleRemove(candidate.login)}>-</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates; // Export the component
