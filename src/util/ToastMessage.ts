import {toast} from "vuetify-sonner";


function infoToast(title: string, content?: string){
    toast(title,{
        description: content,
        duration: 3000,
        cardProps: {
            color: 'primary',
            rounded: 'md'
        },
        prependIcon: 'mdi-information-outline',
    });
}

function errorToast(title: string, content?: string){
    toast(title,{
        description: content,
        duration: 3000,
        cardProps: {
            color: 'error',
            rounded: 'md'
        },
        prependIcon: 'mdi-information-outline',
    });
}

function successToast(title: string, content?: string){
    toast(title,{
        description: content,
        duration: 3000,
        cardProps: {
            color: 'success',
            rounded: 'md'
        },
        prependIcon: 'mdi-information-outline',
    });
}

function warningToast(title: string, content?: string){
    toast(title,{
        description: content,
        duration: 3000,
        cardProps: {
            color: 'warning',
            rounded: 'md'
        },
        prependIcon: 'mdi-information-outline',
    });
}

export {infoToast, errorToast, successToast, warningToast}