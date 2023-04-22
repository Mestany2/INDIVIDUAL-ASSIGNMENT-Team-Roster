import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <h1>Welcome to FIFA 23 Ultimate Team</h1>
      <Link passHref href="/team">
        <Nav.Link>View My Team</Nav.Link>
      </Link>
    </div>
  );
}

export default Home;