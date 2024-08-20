import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa'; // Importing FontAwesome icon for ellipsis
import projectImage from "../Assets/project_image1.jpg"

function ProjectCard({ project, projectId }) {
  const [showOptions, setShowOptions] = useState(false); // State to toggle options visibility
  const optionsRef = useRef(null); // Ref to options container

  const cardStyle = {
    position: 'relative', // Ensure positioning context for absolute positioned options
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '200px',
    margin: '10px',
    overflow: 'hidden',
    textAlign: 'center',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '90%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const projectNameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const optionsContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: showOptions ? 'block' : 'none',
    zIndex: 1,
  };

  const optionButtonStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '8px 12px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  };

  const navigate = useNavigate();

  const handleToggleOptions = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to parent div
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions(false); // Close options if clicked outside
    }
  };

  const handleAddRoles = () => {
    navigate(`/project/${projectId}/roles`);
  };

  const handleAddPermissions = () => {
    navigate(`/project/${projectId}/permissions`);
  };

  const handleAddSchema = () => {
    navigate(`/project/${projectId}/schema`);
  };


  useEffect(() => {
    // Add event listener to handle clicks outside options container
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={cardStyle} onClick={()=>{navigate(`/project/${projectId}`);}}>
      <img src={projectImage} alt="Project" style={imageStyle} />
      <h2 style={projectNameStyle}>{project.name}</h2>
      <div ref={optionsRef} style={optionsContainerStyle}>
        <button style={optionButtonStyle} onClick={handleAddPermissions}>Add Permissions</button>
        <button style={optionButtonStyle} onClick={handleAddRoles}>Add Roles</button>
        <button style={optionButtonStyle} onClick={handleAddSchema}>Add Schema</button>
      </div>
      {!showOptions && (
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <FaEllipsisV onClick={handleToggleOptions} style={{ cursor: 'pointer' }} />
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
