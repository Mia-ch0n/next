import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";

const Down = ({ onPress, count, disliked }) => {
  const [internalDisliked, setInternalDisliked] = useState(disliked);

  useEffect(() => {
    setInternalDisliked(disliked);
  }, [disliked]);

  const handlePress = () => {
    onPress();
    setInternalDisliked((prevDisliked) => !prevDisliked);
  };

  return (
    <div>
      <a onClick={handlePress}>
        {internalDisliked ? <FontAwesomeIcon icon={faThumbsDownSolid} /> : <FontAwesomeIcon icon={faThumbsDownRegular} />}
      </a>
      <span>{count}</span>
    </div>
  );
};

export default Down;
