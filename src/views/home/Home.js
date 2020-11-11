import './Home.scss';
import { Banner, Header, Playlists } from './components';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Banner />
      <Playlists />
    </div>
  );
};

export default Home;
