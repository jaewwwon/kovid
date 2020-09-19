import { useEffect, useCallback, useState } from "react";
import Router from "next/router";
import DefaultErrorPage from "next/error";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { BREAK_POINT_TABLET, Loader } from "../../components/Layout/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import {
  LOAD_CATEGORY_REQUEST,
  LOAD_POST_DETAIL_REQUEST,
  UPDATE_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
} from "../../reducers/post";
import wrapper from "../../store/configureStore";

const Update = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { postCategory, postInfo, imageUrl, postLoading } = useSelector((state) => state.post);
  const [categoryId, onChangeCategoryId] = useInput(postInfo.category_id);
  const [title, onChangeTitle] = useInput(postInfo.title);
  const [content, onChangeContent] = useInput(postInfo.content);
  const [imageList, setImageList] = useState(postInfo.attachs);

  useEffect(() => {
    // 게시글 카테고리 불러오기
    if (!postCategory) dispatch({ type: LOAD_CATEGORY_REQUEST });
  }, [postCategory]);

  useEffect(() => {
    if (imageUrl) {
      imageList.push(...imageUrl);
      const newItemList = [...imageList];
      setImageList(newItemList);
    }
  }, [imageUrl]);

  // 게시글 수정
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // 업로드 이미지 id 추출
      const imageIds = imageList?.map((data) => data.id || data.attachId);
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          post_id: postInfo.post_id,
          category_id: categoryId,
          title,
          content,
          attach_ids: imageIds,
        },
      });
    },
    [imageList, categoryId, title, content],
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
  const onDeleteFile = useCallback(
    (attachId) => {
      const filter = imageList.filter((v) => v.id !== attachId);
      setImageList(filter);
    },
    [imageList],
  );

  // 로그인 상태가 아닐 경우, 404 페이지 리턴
  if (!profile) return <DefaultErrorPage statusCode={404} />;

  return (
    <Container>
      <div className="board_content">
        <div className="board_title">
          <h2>글수정</h2>
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
            {imageList?.map((data) => (
              <li key={data.id || data.attachId}>
                <img
                  src={data.url || `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${data.imageName}`}
                  alt="첨부사진"
                />
                <button type="button" onClick={() => onDeleteFile(data.id)}>
                  사진삭제
                </button>
              </li>
            ))}
          </ul>
          <div className="button_wrap">
            <button className="btn" type="button" onClick={() => Router.back()}>
              취소
            </button>
            <button className="btn" type="submit" disabled={postLoading}>
              {postLoading && <Loader className="material-icons">autorenew</Loader>}수정
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_POST_DETAIL_REQUEST,
    data: {
      id: context.query.id,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Update;
