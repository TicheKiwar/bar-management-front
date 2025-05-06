import styled from "styled-components";
import {
  Header,
  Btnfiltro,
  v,
  Title,
  Lottieanimacion,
  Buscador,
  TablaReserva,
  useReservaStore
} from "../../index";
import RegistrarReserva from "../organismos/formularios/RegistrarReserva";
import { useState } from "react";
import vacio from "../../assets/vacio.json";

export function ReservaTemplate({ data }) {
  const { setBuscador } = useReservaStore();
  const [state, setState] = useState(false);
  const [openRegistro, SetopenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);

  function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  }

  return (
    <Container>
      {openRegistro && (
        <RegistrarReserva
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(!openRegistro)}
          accion={accion}
        />
      )}
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Reservas</Title>
          <Btnfiltro
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        {data.length === 0 ? (
          <Lottieanimacion alto="300" ancho="300" animacion={vacio} />
        ) : (
          <TablaReserva
            data={data}
            SetopenRegistro={SetopenRegistro}
            setdataSelect={setdataSelect}
            setAccion={setAccion}
          />
        )}
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 60px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  width: 100%;
  gap: 15px;
`;
