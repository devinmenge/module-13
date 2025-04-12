import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/saved-candidates">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
}