import { $Keys } from 'utility-types';
import { english } from './english';

export const french: { [key in $Keys<typeof english>]: string } = {
    edit: 'editer',
    delete: 'supprimer',
    reset: 'annuler',
    save: 'sauvegarder',
    add: 'ajouter',
    cancel: 'annuler',
};
