import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const down = ({ onPress, count }) => {
  
return (
  <div>
  <a onClick={onPress}>
    <FontAwesomeIcon icon={faChevronDown} />
  </a>
  <span>{count}</span>
</div>
      );
    };
export default down;