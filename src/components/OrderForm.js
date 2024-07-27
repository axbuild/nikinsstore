import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Import WhatsAppIcon

function OrderForm() {
  const [art, setArt] = useState('');
  const [fields, setFields] = useState([{ width: '', height: '', items: '' }]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const url = window.location.href;
    const artMatch = url.match(/\/art_(\d+)\//);
    if (artMatch && artMatch[1]) {
      setArt(artMatch[1]);
    }
  }, []);

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };

  const addFields = () => {
    setFields([...fields, { width: '', height: '', items: '' }]);
  };

  const removeFields = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleSubmit = () => {
    let message = `Добрый день! Примите заказ: Имя: ${name}, Телефон: ${phone}, Адрес: ${address}, Артикул: ${art},`; // Add art to the message
    fields.forEach((field, index) => {
      message += `Ширина: ${field.width}, Высота: ${field.height}, Штук: ${field.items},`;
    });
    window.open(`https://api.whatsapp.com/send?phone=+79266503963&text=${encodeURIComponent(message)}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>ЗАКАЗАТЬ ТЮЛЬ</h1>
        <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '1.5em' }}>С ДОСТАВКОЙ ПО ВСЕМУ КЫРГЫЗСТАНУ</h2>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
        <TextField
            disabled
            name="art"
            label="Артикул товара"
            type="text"
            value={art}
            style={{ width: '100%', marginBottom: '10px' }}
        />
      </Grid>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              required
              name="width"
              label="Ширина"
              type="number"
              value={field.width ? field.width : 3}
              onChange={(e) => handleChange(index, e)}
              style={{ marginRight: '10px' }}
              inputProps={{ min: 1, step: 0.5 }}
            />
            <TextField
              required
              name="height"
              label="Высота"
              type="number"
              value={field.height ? field.height : 2.7}
              onChange={(e) => handleChange(index, e)}
              style={{ marginRight: '10px' }}
              inputProps={{ min: 1, step: 0.05 }}
            />
            <TextField
              required
              name="items"
              label="Штук"
              type="number"
              value={field.items ? field.items : 1}
              onChange={(e) => handleChange(index, e)}
              style={{ marginRight: '10px' }}
              inputProps={{ min: 1 }}
            />
            <IconButton variant="contained" color="secondary" onClick={() => removeFields(index)} disabled={index === 0}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" onClick={addFields} style={{ marginTop: '10px', padding: '2.5px' }}>
            <AddIcon style={{ fontSize: 'smaller' }} />
          </Button>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <TextField
            // required
            name="name"
            label="Имя"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '48%', marginRight: '10px'}}
          />
          <TextField
            // required
            name="phone"
            label="Телефон"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '48%', marginLeft: '10px'}}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
          <TextField
            // required
            name="address"
            label="Адрес"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="success" onClick={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WhatsAppIcon style={{ marginRight: '8px' }} />
            Заказать
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderForm;