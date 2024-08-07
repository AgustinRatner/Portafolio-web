const editable_elements = document.querySelectorAll('.editable');
const btns_edition = document.querySelectorAll('#popup-content button');
let id_last_elemEdited = '';
let classes_last_elemEdited = '';

editable_elements.forEach(element => {
    element.addEventListener('click', () => {
        id_last_elemEdited = element.id;
        classes_last_elemEdited = element.classList.toString();
        getEditionView(id_last_elemEdited);
    });
});
btns_edition.forEach(btn => {
    btn.addEventListener('click', async () => {

        const text_edition = document.getElementById('input_textEditable');
        if(btn.id == 'btn_save'){
            let data = {
                id_element: id_last_elemEdited,
                classes: classes_last_elemEdited,
                inner_html: text_edition.value
            };
            try{
                let response = await fetch('http://localhost:3000/update-element',{
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                const result = response.json();
                if(response.ok){
                    console.log('Se inserto correctamente!!'); 
                }
            }
            catch(error){
                const result = response.json();
                console.log(result.message);
            }
        }

        text_edition.value = "";
        popup_edition.classList.remove('visible');
        popup_edition.classList.add('invisible');
        getPageView(); 
    });
});

