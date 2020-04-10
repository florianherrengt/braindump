import React, {
    HTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    useCallback,
} from 'react';
import classNames from 'classnames';
import { Color, Variant } from '../../config/theme';
import { AutoComplete } from '../AutoComplete';
import { Tag, TagEmotion } from '../../helpers';
import { RootState } from '../../redux';
import { ValuesType } from 'utility-types';
import { Button } from '../Button';

interface TagProps {
    tag: ValuesType<RootState['currentUserTags']['tags']>;
    onDelete?(): void;
}

export const TagChip: React.SFC<TagProps> = props => {
    return (
        <span
            className={classNames([
                'TagChip',
                {
                    'TagChip--neutral':
                        props.tag.emotion === TagEmotion.neutral,
                },
                {
                    'TagChip--positive':
                        props.tag.emotion === TagEmotion.positive,
                },
                {
                    'TagChip--negative':
                        props.tag.emotion === TagEmotion.negative,
                },
                {
                    'TagChip--delete': !!props.onDelete,
                },
            ])}
        >
            {props.tag.label}
            {props.onDelete ? (
                <Button
                    className='TagChip_Button_Delete'
                    ariaLabel='delete tag'
                    variant={Variant.tertiary}
                    onClick={() => {}}
                >
                    <i className='material-icons'>cancel</i>
                </Button>
            ) : null}
        </span>
    );
};
