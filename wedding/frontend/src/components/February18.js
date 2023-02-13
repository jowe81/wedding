import './february18.scss';

const February18 = ({ showYear }) => {
  const className = showYear ? 'february1823' : 'february18';
  const filename = showYear ? '/february1823.png' : '/february18.png';
  return (<img className={className} alt="wedding date" src={filename} />);
}

export default February18;