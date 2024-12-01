// components/AdminUserCreate.tsx
import React, { useState } from "react";
import userQuery from "../../../hooks/queries/useUserQuery";
import { UserCreateDto } from "../../../types/user.type";

const AdminUserCreate: React.FC = () => {
  const [users, setUsers] = useState<UserCreateDto[]>([
    { name: "", username: "", password: "" },
  ]);

  const createUserMutation = userQuery.mutation.useCreateMultipleUsers();

  const handleInputChange = (
    index: number,
    field: keyof UserCreateDto,
    value: string
  ) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setUsers([...users, { name: "", username: "", password: "" }]);
  };

  const handleRemoveUser = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleSubmit = () => {
    // Filter users whose fields are all filled
    const usersToCreate = users.filter(
      (user) => user.name && user.username && user.password
    );

    if (usersToCreate.length === 0) {
      console.log("No users with all fields filled.");
      return;
    }

    try {
      createUserMutation.mutate(usersToCreate, {
        onSuccess() {
          setUsers([]);
        },
      });
      console.log("Users created:", usersToCreate);
    } catch (error) {
      console.error("Error creating users:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Users</h2>

      {users.map((user, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={() => handleRemoveUser(index)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa người dùng
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Tên</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="mt-1 p-2 border rounded-lg"
                placeholder="Nhập tên"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">
                MSSV / Tên đăng nhập
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) =>
                  handleInputChange(index, "username", e.target.value)
                }
                className="mt-1 p-2 border rounded-lg"
                placeholder="Nhập MSSV (cho học sinh) hoặc mã đăng nhập (cho người dùng khác)"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Mật khẩu</label>
              <input
                type="password"
                value={user.password}
                onChange={(e) =>
                  handleInputChange(index, "password", e.target.value)
                }
                className="mt-1 p-2 border rounded-lg"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thêm người dùng
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default AdminUserCreate;
