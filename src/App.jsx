import React, { useState, useEffect } from 'react';
import './App.css';

// Definimos un modelo inicial vacío
const initialForm = { id: null, nombre: '', tema: '', fecha: '' };

const App = () => {
  // --- ESTADO (State) ---
  // 1. Cargar datos de localStorage o iniciar con array vacío
  const [estudiantes, setEstudiantes] = useState(() => {
    const saved = localStorage.getItem('catedra_jgh_data');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  // --- EFECTOS (Side Effects) ---
  // 2. Guardar en localStorage cada vez que cambie "estudiantes"
  useEffect(() => {
    localStorage.setItem('catedra_jgh_data', JSON.stringify(estudiantes));
  }, [estudiantes]);

  // --- MANEJADORES (Handlers) ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // C: Create / U: Update
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga del navegador (HTML5 Standard)

    if (!form.nombre || !form.tema) return alert("Complete los datos");

    if (isEditing) {
      // Lógica de Actualización
      const newDb = estudiantes.map((el) => (el.id === form.id ? form : el));
      setEstudiantes(newDb);
      setIsEditing(false);
    } else {
      // Lógica de Creación
      form.id = Date.now(); // Generamos un ID único basado en tiempo
      setEstudiantes([...estudiantes, form]);
    }
    setForm(initialForm);
  };

  // R: Read (Se hace en el return mapeando el array)

  // D: Delete
  const deleteData = (id) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar el registro ${id}?`);
    if (isDelete) {
      let newData = estudiantes.filter((el) => el.id !== id);
      setEstudiantes(newData);
    }
  };

  // Preparar formulario para editar
  const editData = (data) => {
    setForm(data);
    setIsEditing(true);
  };

  return (
    <div className="container">
      {/* HTML5 Semántico: Header */}
      <header className="main-header">
        <h1>Cátedra Dr. José Gregorio Hernández</h1>
        <p>Sistema de Gestión Académica y Moral</p>
      </header>

      <main className="grid-layout">
        {/* Sección Formulario */}
        <section className="form-section">
          <h2>{isEditing ? 'Editar Registro' : 'Nueva Inscripción'}</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="nombre" 
              placeholder="Nombre del Estudiante" 
              onChange={handleChange} 
              value={form.nombre} 
            />
            <input 
              type="text" 
              name="tema" 
              placeholder="Año a Cursar" 
              onChange={handleChange} 
              value={form.tema} 
            />
            <input 
              type="date" 
              name="fecha" 
              onChange={handleChange} 
              value={form.fecha} 
            />
            <div className="btn-group">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Actualizar' : 'Inscribir'}
              </button>
              {isEditing && (
                <button type="button" onClick={() => {setForm(initialForm); setIsEditing(false)}} className="btn-secondary">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Sección Lista de Datos */}
        <section className="data-section">
          <h2>Estudiantes Inscritos</h2>
          {estudiantes.length === 0 ? (
            <p className="no-data">No hay registros en la base de datos local.</p>
          ) : (
            <div className="card-container">
              {estudiantes.map((el) => (
                <article key={el.id} className="student-card">
                  <div className="card-info">
                    <h3>{el.nombre}</h3>
                    <p><strong>Tema:</strong> {el.tema}</p>
                    <small>Fecha: {el.fecha}</small>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => editData(el)} className="btn-edit">Editar</button>
                    <button onClick={() => deleteData(el.id)} className="btn-delete">Eliminar</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* HTML5 Semántico: Footer */}
      <footer className="main-footer">
        <p>&copy; 2025 - Proyecto Académico sin fines de lucro.</p>
      </footer>
    </div>
  );
};

export default App;