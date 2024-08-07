const popup_edition = document.querySelector('#popup');

const getEditionView = (id_last) => {
    const visible_elements = document.querySelectorAll('.visible');
    const text_edition = document.getElementById('input_textEditable');
    const text_ElemEdited = document.getElementById(id_last);

    visible_elements.forEach(element => {
        element.classList.remove('visible');
        element.classList.add('invisible');
    });
    popup_edition.classList.remove('invisible');
    popup_edition.classList.add('visible');

    text_edition.value = text_ElemEdited.innerHTML;
};
const options_view_selection = () => {
    const visible_elements = document.querySelectorAll('.visible');
    visible_elements.forEach(element => {
        element.classList.remove('visible');
        element.classList.add('invisible');
    });
    actions_select.classList.remove('invisible');
    actions_select.classList.add('visible');
};
const getPageView = () => {
    actions_select.classList.remove('visible');
    actions_select.classList.add('invisible');
    container.classList.add('visible');
    container.classList.remove('invisible');
    logosAr.classList.add('visible');
    logosAr.classList.remove('invisible');
    menuDesplegable.classList.add('visible');
    menuDesplegable.classList.remove('invisible');
    navigation.classList.add('visible');
    navigation.classList.remove('invisible');
};
const getNormalView = () => {
    /*Si salimos de vista admin, y luego queremos ingresar a consulta, entonces vamos a tener la clase "admin" todavia*/
    if(container.classList.contains('admin')){
        container.classList.remove('admin');
        titles.forEach(title => {
            title.classList.remove('editable');
        });
        subtitles.forEach(subtitle => {
            subtitle.classList.remove('editable');
        });
        items.forEach(item => {
            item.classList.remove('editable');
        });
        descriptions.forEach(description => {
            description.classList.remove('editable');
        });
    }
    getPageView();
};
const getLoginView = () => {

    const visible_elements = document.querySelectorAll('.visible');
    visible_elements.forEach(element => {
        element.classList.remove('visible');
        element.classList.add('invisible');
    });
    formContainer.classList.remove('invisible');
    formContainer.classList.add('visible');
};