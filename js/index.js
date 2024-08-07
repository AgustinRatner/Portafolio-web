// Variable para almacenar el contenedor y las secciones
const container = document.querySelector('.container');
const sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let isScrolling = false;

const logosAr = document.querySelector('.logos_ar');
const navigation = document.querySelector('.navigation');
const formContainer = document.querySelector('.form_container');
const actions_select = document.querySelector('#actions_selected');

/*Ahora agregamos a cada texto del documento (Que podemos modificar) la clase "editable". Estos son de clase 
"section_title", "section_subtitle", "section_item" o "section_description"*/
const titles = document.querySelectorAll('.section_title');
const subtitles = document.querySelectorAll('.section_subtitle');
const items = document.querySelectorAll('.section_item');
const descriptions = document.querySelectorAll('.section_description');

//Variable para los indicadores
const navButtons = document.querySelectorAll('.nav-button');
const btns_menuDesplegable = document.querySelectorAll('.menu_desplegable button');
const menuDesplegable = document.querySelector('.menu_desplegable');
const nav_page = document.querySelector('.opciones_menu');
const options_nav = document.querySelectorAll('.opciones_menu li');
const links_nav = document.querySelectorAll('#navegation_page p');

const updateActiveButton = (index) => {
    navButtons.forEach(button => {
        button.classList.remove('active');
        if(index != 2 && index !=4){
            button.classList.add('first_background');
            button.classList.remove('second_background');
        }
        else{
            button.classList.add('second_background');
            button.classList.remove('first_background');
        }
    });
    if (navButtons[index]) {
        navButtons[index].classList.add('active');
    }

    btns_menuDesplegable.forEach(button => {
        if(index != 2 && index !=4){
            button.classList.add('first_background');
            button.classList.remove('second_background');
        }
        else{
            button.classList.add('second_background');
            button.classList.remove('first_background');
        }
    });
    
    // Actualizar imágenes de los logos según la sección
    const imgA = document.getElementById('img_a');
    const imgR = document.getElementById('img_r');

    if (index == 1 || index == 3 || index == 5) {
        imgA.src = "img/circulado-a-blue.png";
        imgR.src = "img/circulado-r-blue.png";
    } else {
        imgA.src = "img/circulado-a-green.png";
        imgR.src = "img/circulado-r-green.png";
    }

};

// Función para desplazarse a la siguiente sección
const scrollToSection = (index) => {
    if (isScrolling) return;
    isScrolling = true;

    const offset = -index * 100;
    container.style.transform = `translateY(${offset}vh)`;
    currentSectionIndex = index;
    updateActiveButton(index);

    setTimeout(() => {
        isScrolling = false;
    }, 800); // Duración de la transición
};

// Manejador de eventos para el desplazamiento de la rueda del ratón
const handleWheelEvent = (event) => {
    if (event.deltaY > 0) {
        // Desplazamiento hacia abajo
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
        }
    } else {
        // Desplazamiento hacia arriba
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
        }
    }
};
const desplegar_menu = () => {
    if(nav_page.classList.contains('invisible'))
    {
        nav_page.classList.add('visible');
        nav_page.classList.remove('invisible');
    } 
    else
    {
        nav_page.classList.add('invisible');
        nav_page.classList.remove('visible');
    }
};
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        scrollToSection(index);
    });
});
options_nav.forEach(item => {
    item.addEventListener('click', () =>{
        if(item.getAttribute('data-index') != null){
            const index = parseInt(item.getAttribute('data-index'));
            scrollToSection(index);
        }
        else{
            options_view_selection(); /*Esto ocurre cuando se hace click en la opción "quit"*/
        }
    });
});
links_nav.forEach(link => {
    link.addEventListener('click', () =>{
        const index = parseInt(link.getAttribute('data-index'));
        scrollToSection(index);
    });
});

// Añadir el evento wheel y otros más al documento
document.addEventListener('wheel', handleWheelEvent);
updateActiveButton(currentSectionIndex);
document.addEventListener('DOMContentLoaded', () => {
    
    fetch('http://localhost:3000/get-elements')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            document.getElementById(`${element.id_element}`).innerHTML = `${element.inner_html}`;
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
});
menuDesplegable.addEventListener('click', desplegar_menu);
document.getElementById('btn_query').addEventListener('click', getNormalView);
document.getElementById('btn_admin').addEventListener('click', getLoginView);
document.getElementById('btn_login').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita el envío automático del formulario
    try{
        let data = {
            user_id: document.getElementById('input_user').value,
            pass: document.getElementById('input_pass').value
        };

        let response = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if(response.ok)
        {
            /*Podemos ingresar a vista admin, salir y luego volver a ingresar a admin*/
            if(!container.classList.contains('admin')){
                container.classList.add('admin');
                titles.forEach(title => {
                    title.classList.add('editable');
                });
                subtitles.forEach(subtitle => {
                    subtitle.classList.add('editable');
                });
                items.forEach(item => {
                    item.classList.add('editable');
                });
                descriptions.forEach(description => {
                    description.classList.add('editable');
                });
            }
            console.log(result.message);
            formContainer.classList.add('invisible');
            formContainer.classList.remove('visible');
            getPageView();
        }
        else {
            alert(result.message); // Alerta si las credenciales son inválidas
            options_view_selection();
        }
    }
    catch(error){
        console.error('Error:', error);
    }
});
document.getElementById('btn_send').addEventListener('click', async (event) => {
    event.preventDefault();
    try{
        let date = new Date();

        let data = {
            name: document.getElementById('input_name').value,
            email: document.getElementById('input_email').value,
            time_registered: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            text: document.getElementById('input_mensaje').value
        };
        let response = await fetch('http://localhost:3000/update-messages',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if(response.ok)
            alert('Se registro el mensaje correctamente!!');
        
    }
    catch(error){
        console.error('Error:', error);
    }
    finally{
        document.getElementById('input_name').value = '';
        document.getElementById('input_email').value = '';
        document.getElementById('input_mensaje').value = '';
    }
});
