import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../../index";
import { Btnsave, v, InputText, SpinnerLoader } from "../../index";

export function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleRecoverySession = async () => {
      const forceRecovery = searchParams.get("force") === "true";

      if (forceRecovery) {
        // Extraer tokens del hash de la URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const tokenType = hashParams.get("token_type");

        if (accessToken && refreshToken) {
          try {
            // Establecer sesión manualmente
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
              token_type: tokenType,
            });

            if (sessionError) throw sessionError;

            // Verificar que la sesión sea de tipo recovery
            if (data.session?.user?.aud !== "authenticated") {
              throw new Error("Sesión inválida");
            }
          } catch (err) {
            console.error("Error al establecer sesión:", err);
            navigate("/login");
            return;
          }
        }
      }

      setLoading(false);
    };

    handleRecoverySession();
  }, [navigate, searchParams]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones básicas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      // Verificar sesión activa antes de actualizar
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("No hay sesión activa. Por favor solicita un nuevo enlace de recuperación.");
      }

      // Actualizar contraseña
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      // Cerrar sesión y redirigir
      await supabase.auth.signOut();
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Error al actualizar la contraseña");
      console.error("Error en actualización:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Card>
          <SpinnerLoader size="large" />
          <p>Verificando sesión de recuperación...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Actualizar contraseña</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success ? (
          <SuccessMessage>¡Contraseña actualizada correctamente! Redirigiendo al login...</SuccessMessage>
        ) : (
          <form onSubmit={handleUpdatePassword}>
            <InputText icono={<v.iconopass />}>
              <input type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </InputText>

            <InputText icono={<v.iconopass />}>
              <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
            </InputText>

            <Btnsave titulo={loading ? "Procesando..." : "Actualizar contraseña"} bgcolor="#3b82f6" disabled={loading} />
          </form>
        )}
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: #f8d7da;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: #155724;
  background: #d4edda;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1rem;
`;
