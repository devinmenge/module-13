// src/pages/CandidateSearch.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchUsernames = async () => {
    try {
      const users = await searchGithub();
      if (users.length === 0) {
        setError('No more candidates available.');
        return;
      }
      const newUsernames = users.map((user: { login: string }) => user.login);
      setUsernames((prev) => [...prev, ...newUsernames]);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch candidates. Please check your GitHub token and try again.');
    }
  };

  const fetchCandidateDetails = async (username: string) => {
    try {
      const candidateData = await searchGithubUser(username);
      setCandidate(candidateData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch candidate details. Skipping...');
      handleSkip();
    }
  };

  // Sync savedCandidates with local storage on mount and when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('savedCandidates');
      const parsedSaved = saved ? JSON.parse(saved) : [];
      setSavedCandidates(parsedSaved);

      // If no candidates are saved, reset the search
      if (parsedSaved.length === 0) {
        setCurrentIndex(0);
        setUsernames([]);
        setCandidate(null);
        setError(null);
        fetchUsernames();
      }
    };

    // Initial sync on mount
    handleStorageChange();

    // Listen for storage changes (e.g., from other tabs or pages)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (usernames.length === 0) {
      fetchUsernames();
    }
  }, [usernames]);

  useEffect(() => {
    if (usernames.length > 0 && currentIndex < usernames.length) {
      fetchCandidateDetails(usernames[currentIndex]);
    } else if (usernames.length > 0 && currentIndex >= usernames.length) {
      fetchUsernames();
    }
  }, [currentIndex, usernames]);

  const handleSave = () => {
    if (candidate) {
      const updatedSaved = [...savedCandidates, candidate];
      setSavedCandidates(updatedSaved);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSaved));
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <Link to="/saved-candidates">View Saved Candidates ({savedCandidates.length})</Link>

      {error ? (
        <p>{error}</p>
      ) : candidate ? (
        <div>
          <CandidateCard candidate={candidate} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button onClick={handleSave}>+</button>
            <button onClick={handleSkip}>-</button>
          </div>
        </div>
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default CandidateSearch;
