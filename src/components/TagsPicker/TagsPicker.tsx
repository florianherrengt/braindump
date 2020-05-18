import { useClickAway } from '@umijs/hooks';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import React, { useMemo, useState } from 'react';
import { ValuesType } from 'utility-types';
import { RootState } from '../../redux';
import { TagChip } from '../TagChip';
import { TextField } from '../TextField';

export interface TagsPickerProps {
    tags: RootState['currentUserTags']['tags'];
    value?: string;
    pickedTags?: RootState['currentUserTags']['tags'];
    onChange?(pickedTags: RootState['currentUserTags']['tags']): void;
    placeholder?: string;
}

export const TagsPicker: React.SFC<TagsPickerProps> = props => {
    const [filterValue, setFilterValue] = useState(props.value || '');
    const [pickedTags, setPickedTags] = useState<TagsPickerProps['tags']>(
        props.pickedTags || [],
    );
    const [focused, setFocused] = useState(false);
    const pickedTagsId = pickedTags.map(({ id }) => id);
    const [searchableTags, setSearchableTags] = useState(
        props.tags.filter(({ id }) => !pickedTagsId.includes(id)),
    );
    const [showResults, setShowResults] = useState(!!props.value);

    const resultsClickAwayRef = useClickAway(() => {
        showResults && setShowResults(false);
    });

    const inputClickAwayRef = useClickAway(() => {
        focused && setFocused(false);
    });

    const fuse = useMemo(
        () =>
            new Fuse(searchableTags, {
                isCaseSensitive: false,
                findAllMatches: false,
                includeMatches: false,
                includeScore: false,
                useExtendedSearch: true,
                minMatchCharLength: 1,
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                caseSensitive: false,
                keys: ['label'],
            }),
        [searchableTags],
    );

    const results = fuse.search(filterValue).slice(0, 3);

    const pickTag = (tag: ValuesType<TagsPickerProps['tags']>) => {
        setPickedTags([...pickedTags, tag]);
        setShowResults(false);
        setSearchableTags(searchableTags.filter(({ id }) => tag.id !== id));
        setFilterValue('');
        props.onChange && props.onChange(pickedTags);
    };

    const removeTag = (tag: ValuesType<TagsPickerProps['tags']>) => {
        setPickedTags(pickedTags.filter(({ id }) => tag.id !== id));
        setSearchableTags([...searchableTags, tag]);
        props.onChange && props.onChange(pickedTags);
    };

    const onChange = (value: string) => {
        setFilterValue(value);
        setShowResults(true);
    };

    return (
        <div className='TagsPicker'>
            <div
                ref={inputClickAwayRef}
                className={classNames([
                    'TagsPicker_Input',
                    { 'TagsPicker_Input--focused': focused },
                    { 'TagsPicker_Input--unfocused': !focused },
                ])}
            >
                {pickedTags.length ? (
                    <div className='TagsPicker_PickedTags'>
                        {pickedTags.map(tag => {
                            return (
                                <TagChip
                                    key={tag.id}
                                    tag={tag}
                                    onDelete={removeTag}
                                />
                            );
                        })}
                    </div>
                ) : null}
                <TextField
                    onFocus={() => setFocused(true)}
                    onKeyUp={event => {
                        if (event.key.toLowerCase() === 'enter') {
                            pickTag(results[0].item);
                        }
                        if (event.key.toLowerCase() === 'backspace') {
                            pickedTags.length &&
                                removeTag(pickedTags[pickedTags.length - 1]);
                        }
                    }}
                    onClick={() => setShowResults(true)}
                    value={filterValue}
                    onChange={onChange}
                    ariaLabel='Select tags'
                    placeholder={props.placeholder || 'Select tags'}
                />
                {/* <i className='material-icons'>keyboard_arrow_down</i> */}
            </div>
            {filterValue && showResults ? (
                <div className='TagsPicker_Results' ref={resultsClickAwayRef}>
                    <ul className='TagsPicker_Results_List'>
                        {results.map(row => {
                            return (
                                <li className='TagsPicker_Results_List_Item'>
                                    <a onClick={() => pickTag(row.item)}>
                                        {row.item.label}
                                    </a>
                                </li>
                            );
                        })}
                        {!results.length ? (
                            <li className='TagsPicker_Results_List_Item TagsPicker_Results_List_Item--no-results'>
                                No results
                            </li>
                        ) : null}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
