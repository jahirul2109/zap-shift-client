import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'
import { MdAdminPanelSettings, MdSecurity, MdSecurityUpdateWarning } from 'react-icons/md';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import useAuth from '../../hook/useAuth';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const { user } = useAuth()
  const axiousInstence = useAxiousSecoure();
  const modalRef = useRef();
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await axiousInstence.get('/users');
      return result.data
    }
  })

  const viewUserInfo = (info) => {

  }

  const updatedRole = (users, role) => {
    const updateInfo = {
      role: role,
      email: users.email
    }

    Swal.fire({
      title: "Are you sure?",
      text: " You will change current role !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change  it!"
    }).then((result) => {
      if (result.isConfirmed)
        axiousInstence.patch(`/users/${users._id}`, updateInfo)
          .then(res => {
            if (res.data.modifiedCount) {
              refetch()
              Swal.fire({
                title: "Role Updated!",
                text: `${users.name}'s status updated to ${role}`,
                icon: "success"
              });
            }
          })
    });
  }

  const makeAdmin = (users) => {
    if (users.role === "admin") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Already set admin role",
      });
    }
    updatedRole(users, "admin")
  }
  const makeUser = (users) => {
    if (users.role === "user") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Already set role user",
      });
    }
    updatedRole(users, "user")
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            users.map((res, index) => <tr key={res._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={res.photoURL}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{res.name}</div>
                    <div className="text-sm opacity-50">{res.email}</div>
                  </div>
                </div>
              </td>
              <td>
                {res.role}
              </td>
              <td className='flex'>
                <button
                  onClick={() => makeAdmin(res)}
                  data-tip="Make Admin"
                  className={`tooltip tooltip-start md:tooltip-top md:tooltip-center  btn ${res.role === "admin" ? "bg-green-500":""} `}><MdSecurity />
                </button>
                <button
                  onClick={() => makeUser(res)}
                  className='btn'><AiTwotoneCloseCircle /></button>
                <button></button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement