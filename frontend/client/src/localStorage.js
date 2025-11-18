export const getUserIdFromLocalStorage = () => {

    const userDataString = localStorage.getItem('user_data');


    if (!userDataString || userDataString === 'undefined') return null;

    try {

        const userData = JSON.parse(userDataString);


        return userData.id || null;
    } catch (e) {

        console.error("Error al parsear user_data de localStorage:", e);
        return null;
    }
};

export const getRolUserFromLocalStorage = () => {

    const userDataString = localStorage.getItem('user_data');


    if (!userDataString || userDataString === 'undefined') return null;

    try {

        const userData = JSON.parse(userDataString);
        console.log(userData.tipo);
        return userData.tipo ==='VENDEDOR' ;
    } catch (e) {

        console.error("Error al parsear user_data de localStorage:", e);
        return null;
    }
};