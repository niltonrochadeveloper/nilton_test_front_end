import React, { useEffect, useState } from "react";
import { UserService } from "../../../services/user";

const FormCreateUser = ({ onClick, setOpenModal, setIsSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserService();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUser({ nome, email, type, password });
      await onClick();
      await setOpenModal(false);
      await setIsSuccess(true);
    } catch (error) {
      setError(error.response.data.errors);
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
          <h2 style={{ margin: 0 }}>Novo usuário</h2>
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
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex" }}>
              <small>admin</small>
              <input
                onChange={(e) => setType("admin")}
                type="radio"
                name="role"
                title="admin"
                value={type}
              />
            </div>
            <div style={{ display: "flex" }}>
              <small>user</small>
              <input
                type="radio"
                name="role"
                title="user"
                onChange={(e) => setType("user")}
                value={type}
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
                  backgroundColor: "#fff",
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
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>
          <div style={{ height: "3rem" }}>
            {error && (
              <span>
                {error.map((item) => (
                  <small>{item}</small>
                ))}
              </span>
            )}
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

export default FormCreateUser;
