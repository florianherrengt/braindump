import React, { useState } from 'react';
import { Color, Variant } from '../../config/theme';
import { i18n } from '../../i18n';
import { BlockSpacer } from '../BlockSpacer';
import { Button } from '../Button';
import { Card } from '../Card';
import { LineSpacer } from '../LineSpacer';
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
            <LineSpacer size='small' />
            <TagsPicker placeholder='Add tags' tags={props.tags} />
            <LineSpacer size='small' />
            <div className='flex CreateNote_Actions'>
                <Button
                    disabled={true}
                    className='uppercase CreateNote_Actions_Button_Add'
                    variant={Variant.primary}
                    ariaLabel='add note'
                >
                    {i18n.text.add}
                </Button>
                <BlockSpacer size='small' />
                <Button
                    disabled={!text}
                    className='uppercase CreateNote_Actions_Button_Discard'
                    variant={Variant.secondary}
                    color={Color.negative}
                    ariaLabel='reset'
                >
                    {i18n.text.reset}
                </Button>
            </div>
        </Card>
    );
};
