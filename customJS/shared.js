// look for div with class error-message and add popup to it
function showModal(message, styleClass) {
    if (!message) return;
    const modalContainer = document.querySelector('.modal-container');
    const messageDiv = document.createElement('div');
    modalContainer.appendChild(messageDiv);
    messageDiv.outerHTML = `
    <div class="alert alert-${styleClass} alert-dismissible fade show" role="alert">
        ${message}.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
}


bsCustomFileInput.init();