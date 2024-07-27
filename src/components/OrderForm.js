import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, IconButton, Slider , Typography, Input, Card} from '@mui/material';
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
    const artMatch = url.match(/\/#art_(\d+)/);
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
    window.open(`https://api.whatsapp.com/send?phone=+00000000&text=${encodeURIComponent(message)}`);
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
            <Card sx={{ minWidth: 375, width: '100%', padding: '15px', marginLeft: '20px', marginTop: '15px' }} key={index}>
            <React.Fragment>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography id={`width-slider-${index}`} gutterBottom style={{ width: '90px' }}>
                  Ширина
                </Typography>
                <Slider
                  required
                  name="width"
                  min={1}
                  max={6}
                  step={0.5}
                  value={field.width ? field.width : 3}
                  valueLabelDisplay="auto"
                  onChange={(e, value) => handleChange(index, { target: { name: 'width', value: value } })}
                  style={{ marginRight: '10px' }}
                />
                <Input
                  value={field.width ? field.width : 3}
                  size="small"
                  onChange={(e) => handleChange(index, { target: { name: 'width', value: e.target.value } })}
                  inputProps={{
                    step: 0.5,
                    min: 1,
                    max: 6,
                    type: 'number',
                    'aria-labelledby': `width-slider-${index}`,
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography id={`height-slider-${index}`} gutterBottom style={{ width: '90px' }}>
                  Высота
                </Typography>
                <Slider
                  required
                  name="height"
                  min={2}
                  max={3}
                  step={0.05}
                  value={field.height ? field.height : 2.7}
                  onChange={(e, value) => handleChange(index, { target: { name: 'height', value: value } })}
                  style={{ marginRight: '10px' }}
                  valueLabelDisplay="auto"
                />
                <Input
                  value={field.height ? field.height : 2.7}
                  size="small"
                  onChange={(e) => handleChange(index, { target: { name: 'height', value: e.target.value } })}
                  inputProps={{
                    step: 0.05,
                    min: 2,
                    max: 3,
                    type: 'number',
                    'aria-labelledby': `height-slider-${index}`,
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography id={`items-slider-${index}`} gutterBottom style={{ width: '90px' }}>
                  Штук
                </Typography>
                <Slider
                  required
                  name="items"
                  min={1}
                  max={20}
                  step={1}
                  value={field.items ? field.items : 1}
                  onChange={(e, value) => handleChange(index, { target: { name: 'items', value: value } })}
                  style={{ marginRight: '10px' }}
                  valueLabelDisplay="auto"
                />
                <Input
                  value={field.items ? field.items : 1}
                  size="small"
                  onChange={(e) => handleChange(index, { target: { name: 'items', value: e.target.value } })}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 20,
                    type: 'number',
                    'aria-labelledby': `items-slider-${index}`,
                  }}
                />
              </Grid>
              <IconButton variant="contained" color="secondary" onClick={() => removeFields(index)} disabled={index === 0}>
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
            </Card>
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