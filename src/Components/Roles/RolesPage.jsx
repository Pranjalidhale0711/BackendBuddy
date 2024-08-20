import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllPermission } from '../../api/permissions';
import { ToastContainer, toast } from 'react-toastify';
import { fetchProjectInfo } from '../../api/project';
import { addNewRole, deleteRole, updateRole } from '../../api/role';
import Modal from 'react-modal';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./RolePage.css"
import Loader from '../../Utils/Loader/Loader';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [editRoleName, setEditRoleName] = useState('');
  const [loader,setLoader]=useState(true);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddRole = async () => {
   
    if (newRoleName !== '') {
      const response = await addNewRole(newRoleName, projectId, []);
      if (response.error) {
        toast.error("Something went wrong");
        return;
      }
      setNewRoleName('');
      window.location.reload();
    }
  };

  const handleDeleteRole = async (roleIndex) => {
    const res = await deleteRole(roles[roleIndex]._id, projectId);
    if (res.error) {
      toast.error("Something went wrong");
    } else {
      window.location.reload();
    }
  };

  const handleSelectRole = (roleIndex) => {
    setSelectedRole(roleIndex);
    setEditRoleName(roles[roleIndex].name);
    setIsModalOpen(true);
  };

  const handlePermissionChange = (roleIndex, permission) => {
    setRoles((prev) => {
      const allRoles = [...prev];
      const updatedRole = allRoles[roleIndex];

      if (updatedRole.permissions.includes(permission)) {
        updatedRole.permissions = updatedRole.permissions.filter((p) => p !== permission);
      } else {
        updatedRole.permissions.push(permission);
      }

      allRoles[roleIndex] = updatedRole;
      return allRoles;
    });
  };

  const getPermissionsAndRoles = async () => {
    try {
      const projectInfo = await fetchProjectInfo(projectId);
      if (projectInfo.error) {
        toast.error("Something went wrong");
        return;
      }
      console.log("project info is ",projectInfo);
      setPermissions(projectInfo?.project?.permissions);
      setRoles(projectInfo?.roles);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching permissions and roles:", error);
    }
  };

  const handleSave = async (id, roleIndex) => {
    const update = await updateRole(id, editRoleName, roles[roleIndex].permissions);
    if (update.error) {
      toast.error("something went wrong");
      return;
    }
    setIsModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    console.log("roles are", roles);
  }, [roles]);

  useEffect(() => {
    getPermissionsAndRoles();
  }, []);

  return (
    <>
    {!loader && <div className='outerContainer'>
      <div className="container roleContainer">
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px'
        }}>Add Roles</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          width: "40vw"
        }}>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={newRoleName}
            placeholder="Role Name"
            onChange={(e) => setNewRoleName(e.target.value)}
            required
            style={{
              flex: '1',
              padding: '10px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button id='addRole' onClick={handleAddRole} style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px'
          }}>Add New Role</button>
          <button id='addRole' onClick={() => navigate(`/project/${projectId}/schema`)} style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Schemas</button>
        </div>
        <div className="rolesListContainer">
        {roles.length > 0 ? (
  roles.map((role, roleIndex) => (
    role ? ( // Check if role is defined
      <div className="roleItem" key={roleIndex}>
        <p className="roleName">
          {console.log("hello",role)}
          {role.name && role.name.length > 20 ? `${role.name.substring(0, 10)}...` : role.name}
        </p>
        <button onClick={() => handleSelectRole(roleIndex)} className="editButton">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button onClick={() => handleDeleteRole(roleIndex)} className="deleteButton">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    ) : null // Handle undefined role
  ))
) : (
  <p>No roles available</p>
)}

</div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Edit Role"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '100%'
              }
            }}
          >
            <h2>Edit Role</h2>
            <input
              type="text"
              value={editRoleName}
              name="roleName"
              required
              style={{ padding: '5px', marginBottom: '20px', width: '100%' }}
              onChange={(e) => setEditRoleName(e.target.value)}
            />
            <ul>
              {permissions.map((permission, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  <input
                    type="checkbox"
                    checked={roles[selectedRole]?.permissions?.includes(permission)}
                    onChange={() => handlePermissionChange(selectedRole, permission)}
                    style={{ marginRight: '5px' }}
                  />
                  {permission}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>Cancel</button>
            <button onClick={() => handleSave(roles[selectedRole]._id, selectedRole)} type="submit" style={{ padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
          </Modal>
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>}{loader && <Loader />}
    </>
  );
};

export default RolesPage;
