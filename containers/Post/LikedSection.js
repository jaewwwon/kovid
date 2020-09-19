import { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_RATING_REQUEST,
  DELETE_RATING_REQUEST,
  POST_RATING_REQUEST,
} from "../../reducers/post";

const View = ({ postInfo }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { rating, postRatingLoading } = useSelector((state) => state.post);
  const [postLiked, setPostLiked] = useState(postInfo.liked);
  const [postDisliked, setPostDisliked] = useState(postInfo.disliked);

  useEffect(() => {
    // 로그인 상태일 경우, 해당 게시글에 대한 회원 평가값 불러오기
    if (profile) dispatch({ type: LOAD_RATING_REQUEST, data: postInfo.post_id });
  }, [profile, postInfo]);

  // // 게시글 좋아요
  // const onPostLiked = useCallback(() => {
  //   if (!profile) return alert("로그인 후 이용할 수 있습니다.");
  //   if (rating === 1) {
  //     dispatch({
  //       type: DELETE_RATING_REQUEST,
  //       data: postInfo?.post_id,
  //     });
  //     setPostLiked(liked - 1);
  //   } else {
  //     dispatch({
  //       type: POST_RATING_REQUEST,
  //       data: {
  //         post_id: postInfo?.post_id,
  //         rating: 1,
  //       },
  //     });
  //     if (rating === -1) {
  //       setPostDisliked(disliked - 1);
  //     }
  //     setPostLiked(liked + 1);
  //   }
  // }, [profile, liked, disliked, rating, postInfo]);

  // // 게시글 싫어요
  // const onPostDisliked = useCallback(() => {
  //   if (!profile) return alert("로그인 후 이용할 수 있습니다.");
  //   if (rating === -1) {
  //     dispatch({
  //       type: DELETE_RATING_REQUEST,
  //       data: postInfo?.post_id,
  //     });
  //     setPostDisliked(disliked - 1);
  //   } else {
  //     dispatch({
  //       type: POST_RATING_REQUEST,
  //       data: {
  //         post_id: postInfo?.post_id,
  //         rating: -1,
  //       },
  //     });
  //     if (rating === 1) {
  //       setPostLiked(liked - 1);
  //     }
  //     setPostDisliked(disliked + 1);
  //   }
  // }, [profile, liked, disliked, rating, postInfo]);

  // 게시글 평가
  const onPostRating = useCallback(
    (postRating) => {
      if (!profile) return alert("로그인 후 이용할 수 있습니다.");
      if (postRating === rating) {
        // 같은 평가를 눌렀을 경우(평가 삭제)
        dispatch({
          type: DELETE_RATING_REQUEST,
          data: {
            post_id: postInfo?.post_id,
            rating: postRating,
          },
        });
        // 게시글 평가 화면 업데이트
        if (rating === 1) {
          setPostLiked(postLiked - 1);
        } else {
          setPostDisliked(postDisliked - 1);
        }
      } else {
        // 새로운 평가를 눌렀을 경우(처음 평가버튼을 눌럿거나 평가를 바꾸는 경우)
        dispatch({
          type: POST_RATING_REQUEST,
          data: {
            post_id: postInfo?.post_id,
            rating: postRating,
          },
        });
        // 게시글 평가 화면 업데이트
        if (rating === 0) {
          // 처음 평가 하는 경우
          if (postRating === 1) {
            setPostLiked(postLiked + 1);
          } else {
            setPostDisliked(postDisliked + 1);
          }
        } else {
          // 재평가 하는 경우
          if (postRating === 1) {
            setPostLiked(postLiked + 1);
            setPostDisliked(postDisliked - 1);
          } else {
            setPostLiked(postLiked - 1);
            setPostDisliked(postDisliked + 1);
          }
        }
      }
    },
    [profile, postInfo, rating, postLiked, postDisliked],
  );

  return (
    <Container>
      <button
        className={`liked ${rating === 1 && "active"}`}
        type="button"
        onClick={() => onPostRating(1)}
        disabled={postRatingLoading}
      >
        좋아요 {postLiked}
      </button>
      <button
        className={`disliked ${rating === -1 && "active"}`}
        type="button"
        onClick={() => onPostRating(-1)}
        disabled={postRatingLoading}
      >
        싫어요 {postDisliked}
      </button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 45px;
  button {
    padding: 3px 10px;
    background-color: #e3e3e3;
    border: 0;
    font-size: 12px;
    &.liked.active {
      background-color: #0497cd;
      color: #fff;
    }
    &.disliked.active {
      background-color: #333;
      color: #fff;
    }
  }
  * + * {
    margin-left: 5px;
  }
`;

export default View;
