import { useEffect } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables.jsx";
import {
    InputText,
    Btnsave,
    useReservaStore,
    useEmpresaStore,
} from "../../../index";
import { useForm } from "react-hook-form";

export default function RegistrarReserva({ onClose, dataSelect, accion }) {
    const { insertarReserva, editarReserva } = useReservaStore();
    const { dataempresa } = useEmpresaStore();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    async function insertar(data) {
        if (accion === "Editar") {
            const p = {
                id: dataSelect.id,
                nombre: data.nombre,
                cliente: data.cliente,
                fecha: data.fecha,
            };
            await editarReserva(p);
            onClose();
        } else {
            const p = {
                _nombre: data.nombre,
                _cliente: data.cliente,
                _fecha: data.fecha,
                _idempresa: dataempresa.id,
            };
            await insertarReserva(p);
            onClose();
        }
    }

    useEffect(() => {
        if (accion === "Editar") {
            // Opcional: cargar info adicional si se necesita
        }
    }, [accion]);

    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {accion === "Editar"
                                ? "Editar reserva"
                                : "Registrar nueva reserva"}
                        </h1>
                    </section>
                    <section>
                        <span onClick={onClose}>x</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section>
                        <article>
                            <InputText icono={<v.iconoreserva />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect?.nombre || ""}
                                    type="text"
                                    placeholder=""
                                    {...register("nombre", { required: true })}
                                />
                                <label className="form__label">Nombre</label>
                                {errors.nombre && <p>Campo requerido</p>}
                            </InputText>

                            <InputText icono={<v.iconocliente />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect?.cliente || ""}
                                    type="text"
                                    placeholder=""
                                    {...register("cliente", { required: true })}
                                />
                                <label className="form__label">Cliente</label>
                                {errors.cliente && <p>Campo requerido</p>}
                            </InputText>

                            <InputText icono={<v.iconocalendario />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect?.fecha || ""}
                                    type="date"
                                    placeholder=""
                                    {...register("fecha", { required: true })}
                                />
                                <label className="form__label">Fecha</label>
                                {errors.fecha && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <div className="btnguardarContent">
                            <Btnsave
                                icono={<v.iconoguardar />}
                                titulo="Guardar"
                                bgcolor="#ef552b"
                            />
                        </div>
                    </section>
                </form>
            </div>
        </Container>
    );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
