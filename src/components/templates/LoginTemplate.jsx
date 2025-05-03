import styled from "styled-components";
import { Btnsave, v, useAuthStore, InputText, useUsuariosStore, Spinner, SpinnerLoader, RegistrarAdmin, supabase, FooterLogin } from "../../index";
import { Device } from "../../styles/breakpoints";
import estrellas from "../../assets/estrellasVarias.svg";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import carrito from "../../assets/copa.png";
import logo from "../../assets/inventarioslogo.png";
import { MdOutlineInfo, MdOutlineLockReset } from "react-icons/md";
import { ThemeContext } from "../../App";
export function LoginTemplate() {
  const { setTheme, theme } = useContext(ThemeContext);
  useEffect(() => {
    setTheme("light");
  }, []);
  const { insertarUsuario } = useUsuariosStore();
  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetError, setResetError] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [stateInicio, setStateInicio] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      const p = {
        correo: "frank@gmail.com",
        pass: "gTh1238",
      };
      await insertarUsuario(p);
    },
  });
  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setResetError("Por favor ingresa tu correo electrónico");
      return;
    }

    setResetError("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/update-password?force=true`,
      });

      if (error) throw error;

      setResetSent(true);
    } catch (error) {
      console.error("Error al enviar correo:", error.message);
      setResetError(error.message || "Error al enviar el correo. Por favor intenta nuevamente.");
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  async function iniciar(data) {
    const response = await signInWithEmail({
      correo: data.correo,
      pass: data.pass,
    });
    if (response) {
      navigate("/");
    } else {
      setStateInicio(!stateInicio);
    }
  }

  const handleClientLogin = () => {
    console.log("Ingresando como cliente...");
    navigate("/cliente");
  };

  return (
    <Container imgfondo={v.imagenfondo}>
      <div className="contentLogo">
        <img src={logo}></img>
        <span>BarMaster</span>
      </div>
      <div className="bannerlateral">
        <img src={carrito}></img>
      </div>

      <div className="contentCard">
        <div className="card">
          {state && <RegistrarAdmin setState={() => setState(!state)} />}

          <Titulo>BarMaster</Titulo>
          {stateInicio && <TextoStateInicio>datos incorrectos</TextoStateInicio>}
          <span className="ayuda">
            {" "}
            Puedes crear una cuenta nueva ó <br></br>solicitar a tu empleador una. <MdOutlineInfo />
          </span>
          <p className="frase">Gestiona tu bar</p>
          {!showResetForm ? (
            <>
              <form onSubmit={handleSubmit(iniciar)}>
                <InputText icono={<v.iconoemail />}>
                  <input
                    className="form__field"
                    onChange={(e) => setCorreo(e.target.value)}
                    type="text"
                    placeholder="email"
                    {...register("correo", {
                      required: true,
                    })}
                  />
                  <label className="form__label">email</label>
                  {errors.correo?.type === "required" && <p>Campo requerido</p>}
                </InputText>
                <InputText icono={<v.iconopass />}>
                  <input
                    className="form__field"
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="contraseña"
                    {...register("pass", {
                      required: true,
                    })}
                  />
                  <label className="form__label">pass</label>
                  {errors.pass?.type === "required" && <p>Campo requerido</p>}
                </InputText>
                <ContainerBtn>
                  <Btnsave titulo="Iniciar" bgcolor="#fc6b32" />
                  <Btnsave funcion={() => setState(!state)} titulo="Crear cuenta" bgcolor="#ffffff" />
                  <Btnsave
                    funcion={handleClientLogin}
                    titulo="Ingresar como cliente"
                    bgcolor="#e0e0e0"
                    textColor="#333"
                    type="button" // Esto evita que dispare el submit
                  />
                </ContainerBtn>
              </form>
              <ResetPasswordLink onClick={() => setShowResetForm(true)}>
                <MdOutlineLockReset /> Olvidé mi contraseña
              </ResetPasswordLink>
            </>
          ) : (
            <ResetPasswordForm>
              <h3>Restablecer contraseña</h3>

              {resetSent ? (
                <SuccessMessage>¡Correo enviado! Revisa tu bandeja de entrada.</SuccessMessage>
              ) : (
                <>
                  <p>Ingresa tu correo para recibir el enlace:</p>
                  <InputText icono={<v.iconoemail />}>
                    <input type="email" placeholder="tu@email.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                  </InputText>

                  {resetError && <ResetErrorMessage>{resetError}</ResetErrorMessage>}

                  <ContainerBtn>
                    <Btnsave funcion={handlePasswordReset} titulo="Enviar enlace" bgcolor="#3b82f6" />
                    <Btnsave
                      funcion={() => {
                        setShowResetForm(false);
                        setResetError("");
                        setResetSent(false);
                      }}
                      titulo="Cancelar"
                      bgcolor="#e0e0e0"
                      textColor="#333"
                    />
                  </ContainerBtn>
                </>
              )}
            </ResetPasswordForm>
          )}
        </div>
        <FooterLogin />
      </div>
    </Container>
  );
}
const ResetPasswordLink = styled.div`
  margin-top: 20px;
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const ResetPasswordForm = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;

  h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    text-align: center;
  }

  p {
    margin-bottom: 15px;
    color: #555;
    font-size: 14px;
    text-align: center;
  }
`;

const SuccessMessage = styled.div`
  padding: 15px;
  background: #d4edda;
  color: #155724;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const ResetErrorMessage = styled.div`
  padding: 10px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 14px;
`;

const Container = styled.div`
  background-size: cover;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #262626;
  @media ${Device.tablet} {
    grid-template-columns: 1fr 2fr;
  }
  .contentLogo {
    position: absolute;
    top: 15px;
    font-weight: 700;
    display: flex;
    left: 15px;
    align-items: center;
    color: #fff;

    img {
      width: 50px;
    }
  }
  .cuadros {
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transition: 0.6s;
  }

  .bannerlateral {
    background-color: #0c4c3b;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .contentCard {
    grid-column: 2;
    background-color: #ffffff;
    background-image: url(${estrellas});
    background-size: cover;
    z-index: 100;
    position: relative;
    gap: 30px;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card {
      padding-top: 80px;
      width: 100%;
      @media ${Device.laptop} {
        width: 50%;
      }
    }
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #fc6c32;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .ayuda {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #8d8d8d;
      font-size: 15px;
      font-weight: 500;
    }
    &:hover {
      .contentsvg {
        top: -100px;
        opacity: 1;
      }
      .cuadros {
        transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg) skew(2deg) skewY(1deg) scaleX(1.2) scaleY(1.2);
        color: red;
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const Titulo = styled.span`
  font-size: 3rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
const TextoStateInicio = styled.p`
  color: #fc7575;
`;
