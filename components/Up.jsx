import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const up = ({ onPress, count }) => {
  return (
    <div>
      <a onClick={onPress}>
        <FontAwesomeIcon icon={faChevronUp} />
      </a>
      <span>{count}</span>
    </div>
  );
};
export default up;
