import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import autolink from "../../util/autolink";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_COMMENT_REQUEST, DELETE_COMMENT_REQUEST } from "../../reducers/post";

const CommentSection = ({ post_id, comment }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { commentSuccess } = useSelector((state) => state.post);
  const [content, setContent] = useState(comment.content);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (commentSuccess) {
      setIsFormOpen(false);
    }
  }, [commentSuccess]);

  const onChangeFormState = () => {
    setIsFormOpen((prev) => !prev);
  };

  // 댓글 입력폼
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  // 댓글 삭제
  const onDeleteComment = useCallback((comment_id) => {
    dispatch({
      type: DELETE_COMMENT_REQUEST,
      data: {
        post_id,
        comment_id,
      },
    });
  }, []);

  // 댓글 수정
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: UPDATE_COMMENT_REQUEST,
        data: {
          post_id,
          comment_id: comment.comment_id,
          content,
        },
      });
    },
    [post_id, comment, content],
  );

  return (
    <>
      <div className="write_info">
        <Link href="/user/posts/[id]" as={`/user/posts/${comment?.user_id}`}>
          <a>
            <span>
              <b>{comment.nickname}</b>
            </span>
            <span>{comment.date}</span>
          </a>
        </Link>
      </div>
      {!isFormOpen ? (
        <pre className="comment" dangerouslySetInnerHTML={{ __html: autolink(comment.content) }} />
      ) : (
        <form onSubmit={onSubmitForm}>
          <textarea
            value={content}
            onChange={onChangeContent}
            placeholder="댓글 작성시 타인에 대한 배려와 책임을 담아주세요."
            required
          />
          <button type="submit">수정</button>
        </form>
      )}
      {profile?.user.idx === comment?.user_id && (
        <div className="comment_btns">
          <button type="button" onClick={onChangeFormState}>
            수정
          </button>
          <button type="button" onClick={() => onDeleteComment(comment.comment_id)}>
            삭제
          </button>
        </div>
      )}
    </>
  );
};

export default CommentSection;
