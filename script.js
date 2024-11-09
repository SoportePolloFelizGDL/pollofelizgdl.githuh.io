function toggleDropdown(id) {
    // Obtener todos los elementos de contenido desplegable
    const dropdowns = document.querySelectorAll('.dropdown-content');
    
    // Cerrar todos los desplegables, excepto el que fue seleccionado
    dropdowns.forEach(dropdown => {
      if (dropdown.id === id) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      } else {
        dropdown.style.display = 'none';
      }
    });
  }