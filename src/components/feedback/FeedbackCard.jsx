import { Image, Rate } from "antd";
import React, { useState } from "react";

import "./FeedbackCard.scss";
import { ImQuotesRight } from "react-icons/im";

function FeedbackCard({ star, comment, image, name }) {
  const defaultProfileImg = "/image/defaultProfile.png";
  const [userAvatar, setUserAvatar] = useState(
    image ? image : defaultProfileImg
  );
  return (
    <div className="card-container">
      <div className="user-avatar">
        <Image
          width={70}
          height={70}
          preview={false}
          src={userAvatar}
          onError={() => setUserAvatar(defaultProfileImg)}
        />

        <span>{name}</span>
      </div>

      <div className="user-rating">
        <Rate disabled defaultValue={star} />
      </div>

      <div className="user-comment">
        <ImQuotesRight className="quote-icon top-left" />
        <p>{comment}</p>
        <ImQuotesRight className="quote-icon bottom-right" />
      </div>
    </div>
  );
}

export default FeedbackCard;
