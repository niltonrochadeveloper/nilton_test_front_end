import React, { useState } from "react";
import { UserService } from "../../../services/user";
import { useNavigate } from "react-router-dom";

const FormEditUser = ({ data }) => {
  const id = data.id;
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [nome, setNome] = useState(data.name);
  const [type, setType] = useState(data.type);
  const [error, setError] = useState("");
  const [statusEdited, setStatusEdited] = useState("");

  const { updateUser } = UserService();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const userData = { nome, email, type, password };

    try {
      const result = await updateUser({ id, userData });
      console.log("type", result);
      if (result.status === 200) {
        setStatusEdited("Usuário atualizado com sucesso");
        setTimeout(() => {
          navigate("/users");
        }, 1500);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <h2 style={{ margin: 0 }}>Editar {data.name}</h2>
          <div>
            <label style={{ fontSize: "0.875rem" }} htmlFor="nome">
              Nome
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderRadius: "0.375rem",
                padding: "0.25rem 0",
                height: "2.75rem",
              }}
            >
              <input
                value={nome}
                name="nome"
                type="text"
                onChange={(e) => setNome(e.target.value)}
                style={{
                  width: "240px",
                  height: "32px",
                  outline: "none",
                  borderRadius: "8px",
                  paddingLeft: "8px",
                  borderWidth: 0,
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex" }}>
              <small>admin</small>
              <input
                onChange={() => setType("admin")}
                type="radio"
                name="type"
                value={type}
                checked={type === "admin"}
              />
            </div>
            <div style={{ display: "flex" }}>
              <small>user</small>
              <input
                type="radio"
                name="type"
                onChange={() => setType("user")}
                value={type}
                checked={type === "user"}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.875rem" }} htmlFor="email">
              E-mail
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderRadius: "0.375rem",
                padding: "0.25rem 0",
                height: "2.75rem",
              }}
            >
              <input
                value={email}
                name="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "240px",
                  height: "32px",
                  outline: "none",
                  borderRadius: "8px",
                  paddingLeft: "8px",
                  borderWidth: 0,
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.875rem" }} htmlFor="password">
              Senha
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderRadius: "0.375rem",
                padding: "0.25rem 0",
                height: "2.75rem",
              }}
            >
              <input
                value={password}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "240px",
                  height: "32px",
                  outline: "none",
                  borderRadius: "8px",
                  paddingLeft: "8px",
                  borderWidth: 0,
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>
          </div>
          <div style={{ height: "3rem" }}>{error && <span>{error}</span>}</div>
          <div style={{ height: "3rem" }}>
            {statusEdited && <span>{statusEdited}</span>}
          </div>
          <button
            style={{
              backgroundColor: "#6EE7B7",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              color: "#065F46",
              fontWeight: "500",
              borderWidth: 0,
            }}
            type="submit"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditUser;
