// components/organisms/LikeDislikeComponent.tsx

import DislikeButton from "./DislikeButton"
import LikeButton from "./LikeButton"

const LikeDislikeComponent = () => {

  const handleLikeClick = async () => {
    console.log('Like clicked')
  }

  const handleDislikeClick = async () => {
    console.log('Dislike clicked')
  }

  return (
    <>
      <DislikeButton onPress={handleDislikeClick} />
      <LikeButton onPress={handleLikeClick} />
    </>
  )
}

export default LikeDislikeComponent