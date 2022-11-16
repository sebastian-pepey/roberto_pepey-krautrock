window.onload = () => {
    
    let fullName = document.querySelector('input[name = "fullName"]');

    let userName = document.querySelector('input[name = "userName"]');

    let email = document.querySelector('input[name = "email"]');

    let phone = document.querySelector('input[name = "phone"]');

    let address = document.querySelector('input[name = "address"]');

    let location = document.querySelector('select[name = "location"]');

    let avatarImage = document.querySelector('input[name = "avatarImage"]');

    let buttonSubmit = document.querySelector('button[type = "submit"]');

    buttonSubmit.addEventListener('click',(e) => {
         
        let errors = [];

        if(fullName.value === ''){
            errors.push('El nombre no puede estar vacío');
        }
        else if(fullName.value.length<2){
            errors.push('El nombre debe contener más de 2 caracteres');
        }

        if(userName.value === ''){
            errors.push('El nombre de usuario no puede estar vacío');
        }

        if(email.value === ''){
            errors.push('El email no puede estar vacío');
        }

        if(phone.value === ''){
            errors.push('El teléfono no puede estar vacío');
        }

        if(address.value === ''){
            errors.push('Debe ingresar una dirección');
        }

        if(location.value === ''){
            errors.push('Debe ingresar una locación');
        }

        if(avatarImage.value.length !== 0){

            let extension = avatarImage.value.split('.')[1];

            const extValidas = ['jpg','jpeg','png','gif'];

            if(extValidas.indexOf(extension) === -1){
                errors.push('La extensión del archivo debe ser jpg, jpeg, png o gif');
            }
        }

        if(errors.length > 0){

            e.preventDefault();

            const divError = document.querySelector('div#errors');

            divError.innerHTML = '';

            divError.setAttribute('class','error-sign');
            
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
