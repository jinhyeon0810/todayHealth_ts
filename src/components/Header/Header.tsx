import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout, onUserStateChange } from "../../api/firebase";
import { HiOutlineBars3 } from "react-icons/hi2";
import TopicModal from "./TopicModal";
import styles from "./Header.module.css";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function Header({ user, setUser }: Props): React.ReactElement {
  const navigate = useNavigate();
  const [topicOpen, setTopicOpen] = useState(false);
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
  console.log(topicOpen);
  const clickLogIn = () => {
    navigate("/login");
  };

  const clickLogOut = () => {
    const conFirm = confirm("정말 로그아웃 하시겠습니까?");
    if (conFirm) {
      logout().then(setUser);
      navigate("/");
    }
  };

  const moveToHome = () => {
    navigate("/");
  };

  const clickShare = () => {
    navigate("/share");
  };

  const clickMy = () => {
    navigate("/my");
  };

  return (
    <>
      <Nav>
        <NavLeft>
          <NavEl onClick={moveToHome}>홈</NavEl>
        </NavLeft>
        <NavRight>
          <NavEl onClick={clickShare} style={{ margin: "0 20px" }}>
            오.운.완 <br />
            <span style={{ fontSize: "13px" }}>게시판</span>
          </NavEl>
          {!user && (
            <NavEl onClick={clickLogIn} style={{ margin: "0 20px" }}>
              로그인
            </NavEl>
          )}
          {user && (
            <NavEl onClick={clickLogOut} style={{ margin: "0 20px" }}>
              로그아웃
            </NavEl>
          )}
          {user && (
            <NavEl onClick={clickMy} style={{ margin: "0 20px" }}>
              나의 <br />
              운동일지
            </NavEl>
          )}
        </NavRight>
      </Nav>
      {topicOpen && (
        <div className={topicOpen && styles.down}>
          <TopicModal />
        </div>
      )}
    </>
  );
}

const Nav = styled.div`
  position: fixed;
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(73, 77, 79);
  cursor: pointer;
  color: #ffffffe6;
  font-weight: bold;
  width: 100%;
  border-bottom: 1px solid #828282;
  color: white;
  z-index: 10;
  font-weight: bold;
`;
const NavEl = styled.div`
  &:hover {
    color: #669dfd;
  }
  padding: 10px 60px;

  text-align: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

const NavLeft = styled.div`
  display: flex;
`;
