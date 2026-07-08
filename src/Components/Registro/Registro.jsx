import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reseteamos cualquier error previo

    try {
      // Intentamos crear el nuevo usuario en Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // Si la creación es exitosa, lo redirigimos al inicio
      // Firebase ya gestiona el estado de sesión automáticamente
      navigate("/");
    } catch (error) {
      // Aquí es donde manejamos el caso específico que nos interesa
      if (error.code === "auth/email-already-in-use") {
        // Usamos window.confirm para hacer la pregunta al usuario
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
        );

        if (quiereLoguearse) {
          // Si el usuario confirma, lo redirigimos a la página de
          login;
          navigate("/login");
        } else {
          // Si el usuario cancela, lo redirigimos a la página de
          inicio;
          navigate("/");
        }
      } else {
        // Para cualquier otro error (contraseña débil, email inválido, etc.),
        // mostramos un mensaje genérico.
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear una nueva cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-sm border rounded px-2 py-1"
          />
        </div>
        <div className="">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
            className="text-sm border rounded px-2 py-1"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded my-3">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
