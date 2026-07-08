import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario logueado:", user);
        alert("¡Inicio de sesión exitoso!");
        navigate("/"); //
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en el login:", errorCode, errorMessage);
        alert("Error: " + errorMessage);
      });
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border mx-2"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border mx-2"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded my-3">
          Ingresar
        </button>
      </form>

      <p>No tienes una cuenta? <Link to="/registro" className="text-blue-500 hover:underline">
        Regístrate aquí
      </Link></p>
    </div>
  );
};

export default Login;
