import React, { useState, useEffect } from 'react';
import './App.css';

// Constantes para configuraciones y validaciones
const STORAGE_KEY = 'catedra_jgh_data_v2';
const INITIAL_FORM = { id: null, nombre: '', tema: '', fecha: '' };

/**
 * Componente Principal de la Aplicación
 * Gestiona el ciclo de vida de los datos de estudiantes y la interfaz de usuario.
 */
const App = () => {
  // --- ESTADO (State) ---
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para manejo de errores en UI (Feedback al usuario)
  const [errorMsg, setErrorMsg] = useState('');

  // --- EFECTOS (Side Effects) ---

  /**
   * Efecto de Carga Inicial (Mount)
   * Intenta recuperar datos de localStorage con manejo de errores robusto.
   * Si el JSON está corrupto, inicia con un array vacío para no romper la app.
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEstudiantes(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error crítico al leer localStorage:", error);
      setErrorMsg("Error al cargar datos guardados. Se ha reiniciado la base de datos local.");
      // Opcional: localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /**
   * Efecto de Persistencia
   * Guarda los cambios en localStorage cada vez que 'estudiantes' cambia.
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estudiantes));
    } catch (error) {
      // Manejo de error por "QuotaExceededError" (Memoria llena)
      setErrorMsg("Memoria llena. No se pueden guardar más registros.");
      console.error("Error al guardar en localStorage:", error);
    }
  }, [estudiantes]);

  // --- LOGICA DE NEGOCIO Y VALIDACIONES ---

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpiamos el error visual cuando el usuario empieza a escribir corregido
    if (errorMsg) setErrorMsg('');
  };

  /**
   * Valida los datos del formulario antes de procesar.
   * @param {Object} data - Objeto con datos del formulario
   * @returns {string|null} - Retorna mensaje de error o null si es válido.
   */
  const validateForm = (data) => {
    // 1. Campos vacíos
    if (!data.nombre.trim() || !data.tema.trim() || !data.fecha) {
      return "Todos los campos son obligatorios.";
    }

    // 2. Validación de Nombre (Solo letras y espacios - Seguridad/Sanitización)
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(data.nombre)) {
      return "El nombre solo puede contener letras (evitar números o símbolos).";
    }

    // 3. Longitud mínima
    if (data.nombre.length < 3) return "El nombre es muy corto.";
    if (data.tema.length < 5) return "El tema debe ser descriptivo (mín. 5 letras).";

    // 4. Validación de Fecha (No permitir fechas futuras)
    const selectedDate = new Date(data.fecha);
    const today = new Date();
    // Ajustamos la hora para comparar solo fechas
    today.setHours(0,0,0,0); 
    
    if (selectedDate > today) {
      return "La fecha de inscripción no puede ser futura.";
    }

    return null; // Todo correcto
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Paso 1: Validar
    const validationError = validateForm(form);
    if (validationError) {
      setErrorMsg(validationError);
      return; // Detener ejecución
    }

    // Paso 2: Procesar
    if (isEditing) {
      const newDb = estudiantes.map((el) => (el.id === form.id ? form : el));
      setEstudiantes(newDb);
      setIsEditing(false);
      setErrorMsg(''); // Éxito: limpiar errores
    } else {
      const newRecord = { ...form, id: Date.now() };
      setEstudiantes([...estudiantes, newRecord]);
      setErrorMsg('');
    }
    setForm(INITIAL_FORM);
  };

  const deleteData = (id) => {
    // Confirmación nativa (simple pero funcional)
    if (window.confirm(`¿Eliminar registro permanentemente?`)) {
      setEstudiantes(estudiantes.filter((el) => el.id !== id));
    }
  };

  const editData = (data) => {
    setForm(data);
    setIsEditing(true);
    setErrorMsg('');
  };

  return (
    <div className="container">
      <header className="main-header">
        <h1>Cátedra Dr. José Gregorio Hernández</h1>
        <p>Sistema de Gestión Académica</p>
      </header>

      <main className="grid-layout">
        <section className="form-section">
          <h2>{isEditing ? 'Editar Registro' : 'Nueva Inscripción'}</h2>
          
          {/* Feedback Visual de Errores */}
          {errorMsg && <div className="error-alert">⚠️ {errorMsg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input 
                id="nombre"
                type="text" 
                name="nombre" 
                onChange={handleChange} 
                value={form.nombre} 
                maxLength={50} // Seguridad: Evitar buffer overflow visual
                placeholder="Ej: Juan Pérez"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="tema">Tema de Investigación</label>
              <input 
                id="tema"
                type="text" 
                name="tema" 
                onChange={handleChange} 
                value={form.tema} 
                maxLength={100} 
                placeholder="Ej: Ética Médica"
              />
            </div>

            <div className="input-group">
              <label htmlFor="fecha">Fecha de Inscripción</label>
              <input 
                id="fecha"
                type="date" 
                name="fecha" 
                onChange={handleChange} 
                value={form.fecha} 
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Actualizar Datos' : 'Registrar Estudiante'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setForm(INITIAL_FORM); setIsEditing(false); setErrorMsg(''); }} 
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="data-section">
          <h2>Estudiantes Inscritos ({estudiantes.length})</h2>
          {estudiantes.length === 0 ? (
            <div className="empty-state">
              <p>No hay registros disponibles.</p>
              <small>Utilice el formulario para agregar estudiantes.</small>
            </div>
          ) : (
            <div className="card-container">
              {estudiantes.map((el) => (
                <article key={el.id} className="student-card">
                  <div className="card-info">
                    <h3>{el.nombre}</h3>
                    <p><strong>Tema:</strong> {el.tema}</p>
                    <small>📅 {el.fecha}</small>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => editData(el)} className="btn-edit" aria-label="Editar">Editar</button>
                    <button onClick={() => deleteData(el.id)} className="btn-delete" aria-label="Eliminar">Borrar</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="main-footer">
        <p>&copy; 2025 - Proyecto Académico sin fines de lucro.</p>
      </footer>
    </div>
  );
};

export default App;