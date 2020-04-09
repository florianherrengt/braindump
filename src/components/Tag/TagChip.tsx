import React, {
    HTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    useCallback,
} from 'react';
import classNames from 'classnames';
import { Color, Variant } from '../../config/theme';
import { AutoComplete } from '../AutoComplete';
import { Tag } from '../../helpers';

interface TagProps {
    tag: Tag;
}

export const TagChip: React.SFC<TagProps> = props => {
    return <span className='TagChip'>{props.tag.label}</span>;
};
