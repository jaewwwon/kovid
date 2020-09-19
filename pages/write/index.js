import { useEffect, useCallback } from "react";
import Router from "next/router";
import DefaultErrorPage from "next/error";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { BREAK_POINT_TABLET, Loader } from "../../components/Layout/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_CATEGORY_REQUEST,
  WRITE_POST_REQUEST,
  WRITE_POST_CANCEL,
  UPLOAD_IMAGES_REQUEST,
  DELETE_IMAGE,
} from "../../reducers/post";

const Write = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { postCategory, imageUrls, postLoading } = useSelector((state) => state.post);
  const [categoryId, onChangeCategoryId] = useInput(2);
  const [title, onChangeTitle] = useInput("");
  const [content, onChangeContent] = useInput("");

  useEffect(() => {
    // 게시글 카테고리 불러오기
    if (!postCategory) dispatch({ type: LOAD_CATEGORY_REQUEST });
  }, [postCategory]);

  // 게시글 작성 취소
  const onWriteCancel = useCallback(() => {
    if (imageUrls.length > 0) {
      dispatch({
        type: WRITE_POST_CANCEL,
      });
    }
    Router.back();
  }, [imageUrls]);

  // 게시글 작성
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // 업로드 이미지 id 추출
      const imageIds = imageUrls?.map((data) => data.attachId);
      dispatch({
        type: WRITE_POST_REQUEST,
        data: {
          category_id: categoryId,
          title,
          content,
          attach_ids: imageIds,
        },
      });
    },
    [imageUrls, categoryId, title, content],
  );

  // 이미지 업로드
  const onUploadFile = useCallback((e) => {
    const formData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      formData.append("files", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: formData,
    });
  }, []);

  // 이미지 삭제
  const onDeleteFile = useCallback((attachId) => {
    dispatch({
      type: DELETE_IMAGE,
      attachId,
    });
  }, []);

  // 로그인 상태가 아닐 경우, 404 페이지 리턴
  if (!profile) return <DefaultErrorPage statusCode={404} />;

  return (
    <Container>
      <div className="board_content">
        <div className="board_title">
          <h2>글작성</h2>
          <p>코로나바이러스(COVID-19)와 관련된 정확한 정보를 공유해주세요.</p>
        </div>
        <form onSubmit={onSubmitForm}>
          <div className="board_head">
            <select value={categoryId} onChange={onChangeCategoryId}>
              {postCategory
                ?.filter((category) => category.idx !== 1)
                .map((category) => (
                  <option key={category.idx} value={category.idx}>
                    {category.name}
                  </option>
                ))}
            </select>
            <input type="text" value={title} onChange={onChangeTitle} placeholder="제목" required />
          </div>
          <textarea
            rows="10"
            value={content}
            onChange={onChangeContent}
            placeholder="내용"
            required
          />
          <span className="file_button">
            사진 첨부
            <input type="file" accept="image/*" onChange={onUploadFile} />
          </span>
          <ul className="file_list">
            {imageUrls?.map((image) => (
              <li key={image.attachId}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${image.imageName}`}
                  alt="첨부사진"
                />
                <button type="button" onClick={() => onDeleteFile(image.attachId)}>
                  사진삭제
                </button>
              </li>
            ))}
          </ul>
          <div className="button_wrap">
            <button className="btn" type="button" onClick={onWriteCancel}>
              취소
            </button>
            <button className="btn" type="submit" disabled={postLoading}>
              {postLoading && <Loader className="material-icons">autorenew</Loader>}작성
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .board_content {
    padding: 45px 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    .board_title {
      margin-bottom: 24px;
      text-align: center;
      h2 {
        font-size: 24px;
      }
      p {
        margin-top: 7px;
        word-break: keep-all;
      }
    }
    .board_head {
      display: flex;
      flex-wrap: wrap;
      select {
        flex: 0 0 30%;
      }
      input[type="text"] {
        flex: 0 0 68%;
        margin-left: 2%;
      }
    }
    select,
    input[type="text"],
    textarea {
      width: 100%;
      height: 42px;
      padding: 0 12px;
      border: 1px solid #dee2e6;
    }
    textarea {
      height: 250px;
      padding: 20px 12px;
      margin-top: 10px;
    }
    .file_button {
      position: relative;
      display: block;
      margin-top: 10px;
      width: 84px;
      line-height: 32px;
      font-size: 12px;
      background-color: #0f1215;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      overflow: hidden;
      input[type="file"] {
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
    .file_list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
      li {
        flex: 0 0 25%;
        padding: 10px 10px 20px 10px;
        img {
          width: 100%;
          height: 100%;
          border: 1px solid #ccc;
          object-fit: cover;
        }
        button {
        }
      }
    }
    .button_wrap {
      margin-top: 42px;
      text-align: center;
      .btn {
        width: 120px;
        padding: 12px 0;
        background-color: #f1f2f4;
        border: 0;
        line-height: 22px;
      }
      .btn + .btn {
        margin-left: 10px;
      }
      button[type="submit"].btn {
        background-color: #ed933c;
        color: #fff;
      }
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .board_content {
      padding: 0;
      border: 0;
    }
  }
`;

export default Write;
