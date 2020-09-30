import { $Keys } from 'utility-types';
import { english } from './english';

export const french: { [key in $Keys<typeof english>]: string } = {
    edit: 'editer',
    delete: 'supprimer',
    reset: 'annuler',
    save: 'sauvegarder',
    add: 'ajouter',
    cancel: 'annuler',
    username: "Nom d'utilisateur",
    password: 'Mot de passe',
    passwordConfirm: 'confirmation du mot de passe',
    passwordConfirmNoMatch:
        'La confirmation du mot de passe ne correspond pas au mot de passe',
};
