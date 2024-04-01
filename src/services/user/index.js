import axios from "../../interceptors/axios";

export const UserService = () => {
  const createUser = async ({ nome, email, type, password }) => {
    try {
      const response = await axios.post(`/users/create`, {
        name: nome,
        email,
        type,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  };

  const findUser = async ({ id }) => {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  };

  const usersList = async () => {
    try {
      const response = await axios.get(`/users`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar lista de usuários:", error);
      throw error;
    }
  };

  const updateUser = async ({ id, userData }) => {
    console.log("updateUser", id, userData);
    try {
      const response = await axios.patch(`/users/update/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/users/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  };

  return {
    createUser,
    findUser,
    usersList,
    updateUser,
    deleteUser,
  };
};
