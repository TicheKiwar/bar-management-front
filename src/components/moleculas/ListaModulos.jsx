import styled from "styled-components";
import { useGlobalStore } from "../../store/GlobalStore";
import { useEffect, useState } from "react";
import { usePermisosStore } from "../../store/PermisosStore";

export function ListaModulos({ setCheckboxs, checkboxs, accion }) {
  const { datamodulos } = useGlobalStore();
  const { datapermisosEdit } = usePermisosStore();
  const [isChecked, setisChecked] = useState(true);

  useEffect(() => {
    if (accion === "Editar") {
      let allDocs = datamodulos.map((element) => {
        const statePermiso = datapermisosEdit?.some((objeto) =>
          objeto.modulos.nombre.includes(element.nombre)
        );
        return { ...element, check: !!statePermiso };
      });
      setCheckboxs(allDocs);
    } else {
      setCheckboxs(datamodulos);
    }
  }, [datapermisosEdit]);

  function handlecheckbox(id) {
    setCheckboxs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, check: !item.check } : { ...item }
      )
    );
  }

  return (
    <Container>
      {checkboxs?.map((item, index) => (
        <div key={index} className="content">
          <label className="container">
            <input
              type="checkbox"
              checked={item.check}
              onChange={() => handlecheckbox(item.id)}
            />
            <div className="checkmark"></div>
          </label>
          <span>{item.nombre}</span>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dashed #414244;
  border-radius: 15px;
  padding: 20px;
  gap: 15px;

  .content {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: relative;
    height: 2em;
    width: 2em;
    background: linear-gradient(145deg, #ececec, #c8c8c8);
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2),
      inset 0 -2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.4s ease, transform 0.3s ease;
    overflow: hidden;
  }

  .container input:checked ~ .checkmark {
    background: linear-gradient(45deg, #42e695, #3bb2b8);
    transform: scale(1.1);
    box-shadow: 0 0px 20px rgba(66, 230, 149, 0.6),
      inset 0 -2px 8px rgba(0, 0, 0, 0.2);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    width: 0.5em;
    height: 1em;
    border: solid white;
    border-width: 0 0.2em 0.2em 0;
    transform: rotate(45deg);
    left: 0.65em;
    top: 0.2em;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
    animation: pulse 0.6s ease forwards;
  }

  @keyframes pulse {
    0% {
      transform: scale(0) rotate(45deg);
    }
    50% {
      transform: scale(1.2) rotate(45deg);
    }
    100% {
      transform: scale(1) rotate(45deg);
    }
  }

  .container input:checked ~ .checkmark:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent 80%);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    border-radius: 50%;
    transition: transform 0.5s ease, opacity 0.5s ease;
    animation: sparkle 0.6s ease-out forwards;
  }

  @keyframes sparkle {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
  }

  .container:hover .checkmark {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.7),
      0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
