import './NotFound.scss';
import { ErrorIcon } from '../../assets/images';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notFound">
      <ErrorIcon />
      <p>Did you get lost my friend...?</p>
      <Link to="/" className="notFound__btn">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
