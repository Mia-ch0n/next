import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";

const Down = ({ onPress, count }) => {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    onPress();
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div>
      <a onClick={handlePress}>
        {liked ? <FontAwesomeIcon icon={faThumbsDownSolid} /> : <FontAwesomeIcon icon={faThumbsDownRegular} />}
      </a>
      <span>{count}</span>
    </div>
  );
};

export default Down;
