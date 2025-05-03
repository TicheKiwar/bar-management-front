import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/supabase.config";
import { SpinnerLoader } from "./SpinnerLoader";

export function PublicOnlyRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Extraer parámetros del hash
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const type = hashParams.get("type");

      // Permitir acceso si es una sesión de recuperación
      if (session && type === "recovery") {
        setIsChecking(false);
        return;
      }

      // Redirigir si hay sesión normal
      if (session) {
        navigate("/");
        return;
      }

      setIsChecking(false);
    };

    checkSession();
  }, [navigate, location]);

  if (isChecking) {
    return <SpinnerLoader size="large" />;
  }

  return children;
}
