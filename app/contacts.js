/** 
 * @typedef Contact
 * @type {object}
 * @property {string} id El id del contacto
 * @property {string} name El nombre del contacto
 * @property {string} phone El numero del contacto
 */

/** 
 * @type {Contact[]} */
let contacts = [];

/**
 * Agrega un contacto al array de contactos
 * @param {Contact} newContact
 */
const addContact = (newContact) => {
  contacts = contacts.concat(newContact);
}

// Icons
const editIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg> 
`

const editingIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
`

/**
 * Renderiza los contactos
 * @param {Element} list La lista en el HTML donde vamos a cargar los contactos
 */

/**
 * Renderiza los contactos
 */
const renderContacts = (list) => {
	// Borrar la lista del html
	list.innerHTML = '';
    // 1. Por cada contacto del array, creo y agrego el  contacto al HTML
    contacts.forEach(contact => {
        // console.log(contact);
        
        // 1. Crear el li
        const li = document.createElement('li');

        // 2. Agregar la clase al li
        li.classList.add('contacts-list-item');

        // 3. Agregar el id al li
        li.id = contact.id;
        // 3.1 Establecer el status
        li.setAttribute('status', 'disabled-inputs')
				// 4. Crear div del input
				const inputsDiv = `
				<div class="inputs-container">
          <input class="contacts-list-item-name-input" type="text" value="${contact.name}" readonly>
          <input class="contacts-list-item-phone-input" type="text" value="${contact.phone}" readonly>
        </div>
				`;

				// Forma 1
				li.innerHTML = inputsDiv;
				// 5. Crear div de los botones
				const btnsDiv = `
				<div class="btns-container">
          <button class="edit-btn">
            ${editIcon}         
          </button>
          <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
				`;

				// Podria llamarlos y crear la estructura del li de esta forma 1
				li.innerHTML = li.innerHTML + btnsDiv;

				// 6. Crear la estructura del li
				// Pero usaremos la siguiente forma 2
				const liChildren = `
				${inputsDiv}
				${btnsDiv}
				`;
				li.innerHTML = liChildren;
				// 7. Agregar el li a la ul
				list.appendChild(li)
				

    });
    
}

/**
 * Guarda el array de los contactos en el navegador
 */
const saveContactsInBrowser = () => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

/**
 * Obtener los contactos del navegador y guardarlos en el array
 */
const getContactsFromBrowser = () => {
  // 1. Obtener la lista de localStorage
	const contactsLocalJson = localStorage.getItem('contacts');
	// 2.Transformar de JSON a JavaScript
	const contactsLocal = JSON.parse(contactsLocalJson);
	// 3. Guardar los contactos
	contacts = contactsLocal ?? [];
}

/**
 * Elimina un contacto del array de contactos
 * @param {string} id El id del contacto a eliminar
 */
const removeContact = (id) => {
  contacts = contacts.filter(contact => contact.id !== id);

  // Manera de hacerlo sin metodos de javascript

  // contacts = []
  // for (const contact of contacts) {
  //   if (contact.id !== id) {
  //     contacts = [...contacts, contact]
  //   }
  // }
}

/**
 * Actualizar un contacto
 * @param {Contact} updatedContact El contacto actualizado
 */

const updateContact = (updatedContact) => {

  contacts = contacts.map(contact => {
    if (contact.id === updatedContact.id) {
      return updatedContact;
    } else {
    return contact;
    }
  })
}

export {
  addContact,
  renderContacts,
  saveContactsInBrowser,
  getContactsFromBrowser,
  removeContact,
  updateContact,
  editIcon,
  editingIcon
}