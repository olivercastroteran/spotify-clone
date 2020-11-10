import './Banner.scss';
import { ReactComponent as BandImg } from '../../../../assets/images/band.svg';

const Banner = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const formatMonth = (month) => {
    const months = [
      'Jun',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month];
  };

  return (
    <div className="banner">
      <div className="banner__left">
        <h2 className="banner__title">Welcome Oliver</h2>
        <p className="banner__msg">Play any playlists you want</p>
        <p className="banner__date">{`${formatMonth(month)}-${day}-${year}`}</p>
      </div>
      <div className="banner__right">
        <BandImg />
      </div>
    </div>
  );
};

export default Banner;
