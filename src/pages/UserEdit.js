import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../services/user";
import FormEditUser from "../components/core/editUser.ts/formEditUser";

const EditUser = () => {
  const { id } = useParams();
  const { findUser } = UserService();

  const [user, setUser] = useState();

  const fetchUser = async () => {
    const userSelected = await findUser({ id });
    setUser(userSelected.result.user[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <a href="/users">Voltar para a Home</a>
      <p>Edição de Usuário</p>
      <div>{user && <FormEditUser data={user} />}</div>
    </div>
  );
};

export default EditUser;
