window.onload = () => {
    
    let productName = document.querySelector('input[name = "name"]');

    let list_price = document.querySelector('input[name = "list_price"]');

    let quantity = document.querySelector('input[name = "quantity"]');

    let description = document.querySelector('textarea[name = "description"]');

    let category = document.querySelector('select[name = "category"]');

    let productImage = document.querySelector('input[name = "productImage"]');

    let buttonSubmit = document.querySelector('button[type = "submit"]')

    buttonSubmit.addEventListener('click',(e) => {
         
        let errors = [];

        if(productName.value === ''){
            errors.push('El nombre no puede estar vacío')
        }
        else if(productName.value.length<5){
            errors.push('El nombre debe contener más de 5 caracteres')
        }

        if(list_price.value === ''){
            errors.push('El precio no puede estar vacío')
        }
        else if(parseFloat(list_price.value) < 0){
            errors.push('El precio debe ser positivo')
        }

        if(quantity.value === ''){
            errors.push('La cantidad no puede estar vacía')
        }
        else if(parseInt(quantity.value) < 0){
            errors.push('La cantidad debe ser positiva')
        }

        if(description.value === ''){
            errors.push('La descripción no puede estar vacía')
        }

        if(category.value === ''){
            errors.push('La categoría no puede estar vacía')
        }

        if(productImage.value.length !== 0){

            let extension = productImage.value.split('.')[1];

            const extValidas = ['jpg','jpeg','png','gif'];

            if(extValidas.indexOf(extension) === -1){
                errors.push('La extensión del archivo debe ser jpg, jpeg, png o gif');
            }
        }
        
        if(errors.length > 0){
            e.preventDefault();

            const divError = document.querySelector('div#errors');

            divError.innerHTML = '';

            divError.setAttribute('class','error-sign')
            
            for(error of errors){

                let textoError = document.createElement('h5');
                textoError.setAttribute('class','error');
                textoError.textContent = error;

                divError.appendChild(textoError);
                divError.appendChild(document.createElement('br'));

            }
        }
    })
}
