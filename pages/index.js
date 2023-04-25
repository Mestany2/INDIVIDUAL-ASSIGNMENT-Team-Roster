import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (

    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div className="logo"><b>W<span>el</span>co<span>m</span>e</b>
        <h1>Hello {user.displayName}! </h1>
        <h1>Welcome to FIFA 23 Ultimate Team</h1>
        <Link passHref href="/team">
          <Nav.Link className="sparkles">View My Team</Nav.Link>
        </Link>
      </div>
    </div>

  );
}

export default Home;
