const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); // Importa el middleware CORS

// Configura la conexión a PostgreSQL
const sequelize = new Sequelize('portafolio_personal', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

// Define el modelo
const Element = sequelize.define('Element', {
  id_element: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true
  },
  classes: {
    type: DataTypes.STRING(255)
  },
  inner_html: {
    type: DataTypes.TEXT
  }
});
const Admin = sequelize.define('Admin', {
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    pass: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

const Message = sequelize.define('Message', {
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true
  },
  time_registered: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});
// Sincronizamos el modelo con la base de datos
sequelize.sync({ force: false }).then(() => {
    console.log('Tablas sincronizadas con la base de datos');
  }).catch(error => {
    console.error('Error al sincronizar tablas:', error);
  });

const app = express();
app.use(express.json());

// Configuramos CORS para permitir todas las solicitudes
app.use(cors());

app.post('/login', async (req,res) => {

    try{
        const { user_id, pass} = req.body;
        const admin = await Admin.findOne({ where: { user_id, pass}});
        if (admin) {
            res.status(200).json({ message: 'Login exitoso' });
          } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
          }
    }
    catch(error){
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
// Ruta para actualizar o insertar un elemento
app.post('/update-element', async (req, res) => {
  const { id_element, classes, inner_html } = req.body;

  try {
    const [element, created] = await Element.upsert({
      id_element,
      classes,
      inner_html
    });
    res.status(200);
  } catch (error) {
      console.error('Error al insertar elemento', err);
      res.status(500).json({ message: 'Error del servidor' });
  }
});
app.post('/update-messages', async (req, res) => {
  const { name, email, time_registered, text } = req.body;

  try {
    const [msj, created] = await Message.upsert({
      name,
      email,
      time_registered,
      text
    });
    res.status(200);
  } catch (error) {
      console.error('Error al registrar el mensaje', err);
      res.status(500).json({ message: 'Error del servidor' });
  }
});
// Ruta para obtener un elemento por su ID
app.get('/get-elements', async (req, res) => {
  try {
    const elements = await Element.findAll({
        attributes: ['id_element', 'inner_html']
    });
    res.json(elements);
  } 
  catch (err) {
      console.error('Error al obtener elementos', err);
      res.status(500).json({ message: 'Error del servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
