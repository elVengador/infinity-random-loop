import styled from "styled-components";

export const Footer = () => {
  return <FooterStyled>By elVengador & Lachicagladiadora - 2023</FooterStyled>;
};

const FooterStyled = styled.footer`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  margin: 0px auto;
`;
