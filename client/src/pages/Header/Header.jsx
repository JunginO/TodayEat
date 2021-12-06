import React from "react";
import styled from "styled-components";
import { COLORS } from "../../components/Colors";
import { Link } from "react-router-dom";
const PositionFix = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 2;
`;

//헤더배경,내용 중간정렬
const BackGround = styled.div`
  background: ${COLORS.yellow};
  display: flex;
  justify-content: center;
  height: auto;
`;
//헤더 내용
const HeaderContents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
`;
//로고
const Logo = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  color: ${COLORS.mainfont};
`;
//여백
const Spacer = styled.div`
  flex-grow: 1;
`;
const Header = ({ children }) => {
  return (
    <PositionFix>
      <BackGround>
        <HeaderContents>
          <Logo to="/">Today_Eat</Logo>
          <Spacer />
          {children}
        </HeaderContents>
      </BackGround>
    </PositionFix>
  );
};
export default Header;
