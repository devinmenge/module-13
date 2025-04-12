// src/components/CandidateCard.tsx
import React from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', maxWidth: '400px', margin: '16px auto' }}>
      <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} style={{ width: '100px', borderRadius: '50%' }} />
      <h2>{candidate.name || candidate.login}</h2>
      <p><strong>Username:</strong> {candidate.login}</p>
      <p><strong>Location:</strong> {candidate.location || 'Not specified'}</p>
      <p><strong>Email:</strong> {candidate.email || 'Not specified'}</p>
      <p><strong>Company:</strong> {candidate.company || 'Not specified'}</p>
      <p><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
    </div>
  );
};

export default CandidateCard;