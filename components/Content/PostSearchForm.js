import { useEffect, useCallback, useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { useSelector } from "react-redux";

const PostSearchForm = () => {
  const { query } = useRouter();
  const profile = useSelector((state) => state.user.profile);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!query?.search_word) {
      setKeyword("");
    } else {
      setKeyword(query.search_word);
    }
  }, [query]);

  // 검색어 입력값
  const onChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  //  게시글 검색
  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (query?.search_word === keyword || (!query?.search_word && keyword.length === 0)) return;
      Router.push(
        `/?page=1&category_id=${query.category_id || 1}&search_type=content&search_word=${keyword}`,
      );
    },
    [query, keyword],
  );

  return (
    <Container className="search_form" positionTop={profile ? 108 : 152}>
      <form onSubmit={onSubmitSearch}>
        <input
          type="text"
          value={keyword}
          onChange={onChangeKeyword}
          placeholder="검색어를 입력하세요."
        />
        <button type="submit">검색</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 0 20px auto;
  form {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    input[type="text"] {
      width: 75%;
      height: 38px;
      padding: 0 8px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px 0 0 4px;
    }
    button {
      width: 25%;
      background-color: #333;
      border-radius: 0 4px 4px 0;
      color: #fff;
    }
  }
`;

export default PostSearchForm;
