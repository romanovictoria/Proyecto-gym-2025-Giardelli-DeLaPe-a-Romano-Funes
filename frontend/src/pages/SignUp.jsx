import { useState } from "react";
import { showToast } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
   

  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const bodyLogin = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });
  const body = {
    usuario: {
      nombre: formData.name,
      apellido: formData.lastName,
      email: formData.email,
      rol: false,
    },
    password: formData.password,
  };

  try {
    const response = await fetch("http://localhost:8080/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      showToast("Usuario creado correctamente", "success");
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      // navigate("/home");
    } else {
      const errorData = await response.json();
      showToast(errorData.message || "Error al registrar el usuario", "error");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  const loginResponse = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyLogin,
    });
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      localStorage.setItem("token", loginData?.token);
      localStorage.setItem("usuario_id", loginData?.usuario.id);
      localStorage.setItem("isAdmin", JSON.stringify(loginData?.usuario.rol));

      showToast("Bienvenido");
      navigate("/home");
    }
};


  return (
    <div className="signup-container">
      <h2 className="signup-title">Registro</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SignUp;
