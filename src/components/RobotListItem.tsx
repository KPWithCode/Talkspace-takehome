import '../styles/RobotListItem.css'
import { deleteAvatarFromStorage } from '../Services'
import { useState } from 'react';

interface Props {
  keyName: string;
  name: string;
  url: string;
  onDelete?: (key: string) => void;
  onEdit?: (key: string) => void;
}

const RobotListItem = ({ keyName, name, url, onDelete, onEdit }: Props) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  
 
  // Added confirmation step and improved error handling
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent parent click events
    
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true)
      return
    }
    
    if (onDelete) {
      onDelete(keyName)
    } else {
      // Fallback if no onDelete prop is provided
      try {
        deleteAvatarFromStorage(keyName)
        // Force refresh of the list using window.location
        window.location.reload()
      } catch (error) {
        console.error('Error deleting avatar:', error)
      }
    }
    
    setIsConfirmingDelete(false)
  }
  
  // Cancel delete confirmation
  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsConfirmingDelete(false)
  }
  
  // preventing event propogation
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(keyName)
    }
  }
  
  return (
    <li className="robot-list-item">
      <div className="robot-avatar">
        <img src={url} alt={`Robot avatar ${name}`} />
      </div>
      
      <div className="robot-info">
        <h3>{name}</h3>
      </div>
      
      <div className="robot-actions">
        {isConfirmingDelete ? (
          <>
            <span className="confirm-text">Delete?</span>
            <button 
              onClick={handleDelete}
              className="confirm-button"
              aria-label={`Confirm-delete-button${name}`}
            >
              Yes
            </button>
            <button 
              onClick={cancelDelete}
              className="cancel-button"
              aria-label="Cancel-button"
            >
              No
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit}
              className="edit-button"
              aria-label={`Edit-${name}`}
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="delete-button"
              aria-label={`Delete-${name}`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default RobotListItem