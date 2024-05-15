import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";

const Up = ({ onPress, count }) => {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    onPress();
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div>
      <a onClick={handlePress}>
        {liked ? <FontAwesomeIcon icon={faThumbsUpSolid} /> : <FontAwesomeIcon icon={faThumbsUpRegular} />}
      </a>
      <span>{count}</span>
    </div>
  );
};

export default Up;
