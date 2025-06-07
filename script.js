document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    const toast = document.getElementById('toast')

    function display_toast(message){
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }

    function showError(input, message){
        let error = input.parentNode.querySelector('.error');
        if (!error){
            error = document.createElement('div');
            error.className = 'error';
            error.setAttribute('role', 'alert');
            input.parentNode.appendChild(error); 
        }
        error.textContent = message;
    }

    function clearError(input){
        let error = input.parentNode.querySelector('.error');
        if (error) {
            error.remove();
        }
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        let valid = true;

        const first_name = form.querySelector('#first-name');
        if (!first_name.value.trim()){
            showError(first_name, 'First name is required');
            valid = false;
        } 
        else{
            clearError(first_name);
        }
        const last_name = form.querySelector('#last-name');
        if (!last_name.value.trim()){
            showError(last_name, 'Last name is required');
            valid = false;
        } 
        else{
            clearError(last_name);
        }
        const email = form.querySelector('#email-address')
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required.');
            valid = false;
        } else if (!email_pattern.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address.');
            valid = false;
        } else {
            clearError(email);
        }
        const general = form.querySelector('#general');
        const support = form.querySelector('#support');
        if ((!general || !general.checked) && (!support || !support.checked)) {
            if (general) showError(general, 'Please select a query type.');
            if (support) showError(support, 'Please select a query type.');
            valid = false;
        } else {
            if (general) clearError(general);
            if (support) clearError(support);
        }
        const consent = form.querySelector('#consent');
        if (!consent || !consent.checked) {
            if (consent) showError(consent, 'Consent is required.');
            valid = false;
        } else {
            clearError(consent);
        }

        if (valid) {
            form.reset();
            display_toast('Message sent! We will get back to you soon.');
        }
    });
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('change', () => clearError(input));
  });
});