const Modal = {
    open() {
        //Abrir o modal
        //Adicionar a classe active
        document.querySelector('.modal-overlay')
        .classList.add('active');
    },

    close(){
        //Fechar o modal
        //remover a classe active
        document.querySelector('.modal-overlay')
        .classList.remove('active');
    }
}