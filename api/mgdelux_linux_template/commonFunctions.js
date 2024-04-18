function homeConnect() {
    const unlockForm = document.querySelector('.homeWrapper .unlockForm');
    const unlockFormStyles = getComputedStyle(unlockForm);
    if (unlockFormStyles.display === 'none') {
        unlockForm.style.display = 'block'
    } else {
        unlockForm.style.display = 'none'
    }
}

function homeUnlock() {
    const unlockForm = document.querySelector('.homeWrapper .unlockForm .formWrapper');
    unlockForm.style.display = 'none';

    const status = document.querySelector('.status');
    status.style.display = 'block';

    const login = document.querySelector('.login');
    login.style.display = 'block';

    const disconnect = document.querySelector('.disconnect');
    disconnect.style.display = 'block';

    const connect = document.querySelector('.connect');
    connect.style.display = 'none';

}