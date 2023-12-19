import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterStyled>
      By <Link href="https://github.com/elVengador">elVengador</Link> &{" "}
      <Link href="https://github.com/Lachicagladiadora">Lachicagladiadora</Link>{" "}
      - 2023
    </FooterStyled>
  );
};

const Link = styled.a`
  margin-left: 4px;
  margin-right: 4px;
  color: ${(props) => props.theme.colors.blue[100]};
  font-weight: 600;
`;

const FooterStyled = styled.footer`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  margin: 0px auto;
`;
