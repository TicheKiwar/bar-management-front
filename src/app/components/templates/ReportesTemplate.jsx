import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export function ReportesTemplate({ children }) {
  const router = useRouter();

  const SidebarItem = ({ href, children, active }) => {
    return (
      <Link href={href} passHref legacyBehavior>
        <StyledLink className={active ? "active" : ""}>{children}</StyledLink>
      </Link>
    );
  };

  const isActive = (path) => router.pathname.endsWith(path);

  return (
    <Container>
      <PageContainer>
        <Content>{children}</Content>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Stock Actual</SidebarTitle>
            <SidebarItem href="/reportes/stock-actual-por-producto" active={isActive("stock-actual-por-producto")}>
              Por producto
            </SidebarItem>
            <SidebarItem href="/reportes/stock-actual-todos" active={isActive("stock-actual-todos")}>
              Todos
            </SidebarItem>
            <SidebarItem href="/reportes/stock-bajo-minimo" active={isActive("stock-bajo-minimo")}>
              Bajo del mínimo
            </SidebarItem>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Entradas y salidas</SidebarTitle>
            <SidebarItem href="/reportes/kardex-entradas-salidas" active={isActive("kardex-entradas-salidas")}>
              Por producto
            </SidebarItem>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Valorizado</SidebarTitle>
            <SidebarItem href="/reportes/inventario-valorado" active={isActive("inventario-valorado")}>
              Todos
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
      </PageContainer>
    </Container>
  );
}






const Content = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  flex: 1;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Sidebar = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 768px) {
    width: 250px;
    order: 2;
  }
`;
const SidebarSection = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color2};
  padding: 12px;
`;
const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;
const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px 0;
  padding: 0 5%;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  height: 60px;
  &:hover {
    color: ${(props) => props.theme.colorSubtitle};
  }
  &.active {
    background: ${(props) => props.theme.bg6};
    border: 2px solid ${(props) => props.theme.bg5};
    color: ${(props) => props.theme.color1};
    font-weight: 600;
  }
`;
