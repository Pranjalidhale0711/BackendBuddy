import React, { useState, useContext, useEffect } from 'react';
import { addPermissions, deletePermission, getAllPermission } from '../../api/permissions';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loader from '../../Utils/Loader/Loader';

const PermissionsPage = () => {
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [newPermission, setNewPermission] = useState('');
  const [editedPermission, setEditedPermission] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [loader, setLoader] = useState(true);

  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleAddPermission = () => {
    if (newPermission !== '') {
      setPermissions((prev) => ([
        ...prev,
        newPermission
      ]));
      setNewPermission('');
    }
  };

  const handleEditPermission = () => {
    if (selectedPermission !== null && editedPermission !== '') {
      const editedPermissions = [...permissions];
      editedPermissions[selectedPermission] = editedPermission;
      setPermissions(editedPermissions);
      setSelectedPermission(null);
      setEditedPermission('');
    }
  };

  const handleSelectPermission = (index, permission) => {
    setSelectedPermission(index);
    setEditedPermission(permission);
  };

  const handleDeletePermission = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this permission?");
    if (confirmed) {
      setPermissions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmitPermissions = async () => {
    console.log("permissions", permissions);
    const { data, error } = await addPermissions(projectId, permissions);
    if (error) {
      console.log(error);
    } else {
      console.log("Permissions added Successfully: ", data);
      navigate(`/project/${projectId}/roles`)
      toast.success("Permissions added Successfully");
    }
  };

  const getPermissions = async () => {
    const allPermissions = await getAllPermission(projectId);
    if (allPermissions.error) {
      toast.error("Something went wrong");
    }
    setPermissions(allPermissions.permissions);
    setLoader(false)
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <>{!loader && <div style={styles.container}>
      <div style={styles.innerContainer}>
        <h2 style={styles.heading}>List Permissions</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="permission"
            value={newPermission}
            placeholder="Add permissions"
            onChange={(e) => setNewPermission(e.target.value)}
            required
            style={styles.input}
          />
          <button onClick={handleAddPermission} style={styles.addButton}>Add</button>
        </div>

        <div style={styles.permissionsContainer}>
          <ul style={styles.permissionList}>
            {permissions.map((permission, index) => (
              <li key={index} style={styles.permissionItem}>
                {selectedPermission === index ? (
                  <div style={styles.editContainer}>
                    <input
                      type="text"
                      value={editedPermission}
                      onChange={(e) => setEditedPermission(e.target.value)}
                      required
                      style={styles.input}
                    />
                    <button onClick={handleEditPermission} style={styles.saveButton}>Save</button>
                  </div>
                ) : (
                  <div style={styles.permissionContainer}>
                    <span>{permission}</span>
                    <div style={styles.buttonGroup}>
                      <button onClick={() => handleSelectPermission(index, permission)} style={styles.editButton}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button onClick={() => handleDeletePermission(index)} style={styles.deleteButton}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleSubmitPermissions} style={styles.submitButton}>Submit Permissions</button>
      </div>
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
    </div>}{loader && <Loader />}</>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif'
  },
  innerContainer: {
    maxWidth: '600px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  input: {
    flex: '1',
    padding: '10px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  permissionsContainer: {
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '20px'
  },
  permissionList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  permissionItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  editContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  saveButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  permissionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default PermissionsPage;
