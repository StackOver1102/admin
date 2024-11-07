import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';

const CustomModal = ({ open, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data || {});
  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (name.includes('.')) {
        const keys = name.split('.');
        updatedData[keys[0]] = { ...updatedData[keys[0]], [keys[1]]: value };
      } else {
        updatedData[name] = value;
      }
      return updatedData;
    });
  };

  const handleSave = () => {
    onSave(formData, user.access_token);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Key"
          name="key"
          value={formData.key || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Exchange"
          name="value.exchange"
          value={formData.value?.exchange || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        {/* Dynamically render other fields in `value` */}
        {formData.value &&
          Object.entries(formData.value).map(([key, val]) => {
            if (key !== 'exchange') {
              return (
                <TextField
                  key={key}
                  label={key.replace('_', ' ')} // Display the field name
                  name={`value.${key}`} // Use a unique name for each dynamic field
                  value={val || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              );
            }
            return null;
          })}

        {/* Select field for Active status */}
        <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
          <InputLabel>Active Status</InputLabel>
          <Select
            name="active"
            value={formData.active ?? true} // Default to true if undefined
            onChange={handleChange}
            label="Active Status" // Ensure label is displayed properly
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Not Active</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
