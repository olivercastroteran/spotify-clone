import './Modal.scss';
import { useDispatch } from 'react-redux';
import { closeInfo } from '../../../store/actions/infoActions';

const Modal = ({ title, content, show }) => {
  const dispatch = useDispatch();

  return (
    <div className={show ? 'modal-container show' : 'modal-container'}>
      <div
        className={show ? 'modal-backdrop materialize' : 'modal-backdrop'}
        onClick={() => dispatch(closeInfo())}
      ></div>
      <div className="modal">
        <div className="modal__title">
          <h1>{title}</h1>
          <button
            className="modal__close"
            onClick={() => dispatch(closeInfo())}
          >
            x
          </button>
        </div>
        <p className="modal__content">{content}</p>
      </div>
    </div>
  );
};

export default Modal;
