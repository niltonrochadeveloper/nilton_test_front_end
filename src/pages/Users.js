import React, { useEffect, useState } from "react";
import { UserService } from "../services/user";
import Modal from "../components/core/modal";
import FormCreateUser from "../components/core/createUser/formCreateUser";

function Users() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState();
  const { usersList, deleteUser, updateUser, createUser, findUser } =
    UserService();
  const [openModal, setOpenModal] = useState(false);

  const [isSuccess, setIsSuccess] = useState();
  const [userStatus, setUserStatus] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await usersList();
      setUsers(data.result.users);
    } catch (error) {
      console.error("Erro ao buscar lista de usuários:", error);
    }
  };

  const [contentModal, setContentModal] = useState();

  const UseContent = (element) => {
    if (element === null) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
      setContentModal(element);
    }
  };

  const deleteFunction = async (id) => {
    const res = await deleteUser(id);
    if (res.status === 200) {
      setOpenModal(false);
      setUserStatus("Usuário deletado com sucesso!");
      await fetchUsers();
    }
  };

  const updateFunction = async (id) => {
    const res = await updateUser(id);
    if (res.status === 200) {
      setOpenModal(false);
      setUserStatus("Usuário deletado com sucesso!");
      await fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  }, [isSuccess, setIsSuccess]);

  return (
    <>
      <div>
        <h1>Usuários</h1>
        <div>
          <strong>Lista de usuários</strong>
          <br />
          <br />
          <div style={{ display: "flex", gap: 20 }}>
            <button
              onClick={() =>
                UseContent(
                  <FormCreateUser
                    onClick={fetchUsers}
                    setOpenModal={setOpenModal}
                    setIsSuccess={setIsSuccess}
                  />
                )
              }
            >
              criar novo
            </button>
            {isSuccess && (
              <div>
                <small
                  style={{ color: "green", fontWeight: "bold", fontSize: 16 }}
                >
                  usuário criado com sucesso
                </small>
              </div>
            )}
            {userStatus && (
              <div>
                <small
                  style={{ color: "green", fontWeight: "bold", fontSize: 16 }}
                >
                  {userStatus}
                </small>
              </div>
            )}
          </div>
          <br />
          <br />
        </div>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>nome</th>
                <th>e-mail</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td>
                    <a href={`/users/${user.id}`}>
                      <button>Editar</button>
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        UseContent(
                          <div style={{}}>
                            <h2>Deseja realmente DELETAR o usuário?</h2>
                            <div style={{ display: "flex", gap: 16 }}>
                              <button onClick={() => deleteFunction(user.id)}>
                                Deletar
                              </button>
                              <button onClick={() => UseContent(null)}>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        )
                      }
                    >
                      deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        {contentModal}
      </Modal>
    </>
  );
}

export default Users;
