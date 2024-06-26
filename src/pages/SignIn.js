import React, { useState } from "react";
import { AuthService } from "../services/auth";

const Pages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { authUser } = AuthService();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await authUser({ email, password });
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
          <h2 style={{ margin: 0 }}>SignIn</h2>
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
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pages;
