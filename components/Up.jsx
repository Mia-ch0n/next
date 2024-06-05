import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";

const Up = ({ onPress, count, liked }) => {
  const [internalLiked, setInternalLiked] = useState(liked);

  const handlePress = () => {
    onPress();
    setInternalLiked((prevLiked) => !prevLiked);
  };

  return (
    <div>
      <a onClick={handlePress}>
        {internalLiked ? <FontAwesomeIcon icon={faThumbsUpSolid} /> : <FontAwesomeIcon icon={faThumbsUpRegular} />}
      </a>
      <span>{count}</span>
    </div>
  );
};

export default Up;
