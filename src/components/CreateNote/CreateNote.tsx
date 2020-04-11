import React, { useState } from 'react';
import { Color, Variant } from '../../config/theme';
import { i18n } from '../../i18n';
import { Button } from '../Button';
import { Card } from '../Card';
import { TagsPicker, TagsPickerProps } from '../TagsPicker';

export interface CreateNoteProps {
    tags: TagsPickerProps['tags'];
    value?: string;
}
export const CreateNote: React.SFC<CreateNoteProps> = props => {
    const [text, setText] = useState(props.value || '');
    const onChange = (text: string) => {
        setText(text);
    };
    return (
        <Card className='CreateNote'>
            <textarea
                onChange={event => onChange(event.target.value)}
                value={text}
                placeholder="What's on your mind?"
                className='CreateNote_TextArea'
                rows={(text.match(/\n/g)?.length || 0) + 2}
            />
            <TagsPicker placeholder='Add tags' tags={props.tags} />
            <Button
                className='uppercase'
                variant={Variant.secondary}
                color={Color.negative}
                ariaLabel='reset'
            >
                {i18n.text.reset}
            </Button>
            <Button
                className='uppercase'
                variant={Variant.primary}
                ariaLabel='add note'
            >
                {i18n.text.add}
            </Button>
        </Card>
    );
};
