import { useClickAway } from '@umijs/hooks';
import Fuse from 'fuse.js';
import React, { useMemo, useState } from 'react';
import { ValuesType } from 'utility-types';
import { RootState } from '../../redux';
import { TagChip } from '../TagChip';
import { TextField } from '../TextField';

interface TagsPickerProps {
    tags: RootState['currentUserTags']['tags'];
    ariaLabel: string;
    placeholder: string;
    value?: string;
    pickedTags?: RootState['currentUserTags']['tags'];
    onChange?(pickedTags: RootState['currentUserTags']['tags']): void;
}

export const TagsPicker: React.SFC<TagsPickerProps> = props => {
    const [filterValue, setFilterValue] = useState(props.value || '');
    const [pickedTags, setPickedTags] = useState<TagsPickerProps['tags']>(
        props.pickedTags || [],
    );
    const pickedTagsId = pickedTags.map(({ id }) => id);
    const [searchableTags, setSearchableTags] = useState(
        props.tags.filter(({ id }) => !pickedTagsId.includes(id)),
    );
    const [showResults, setShowResults] = useState(!!props.value);

    const clickAwayRef = useClickAway(() => {
        showResults && setShowResults(false);
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
                keys: ['label'],
            }),
        [searchableTags],
    );

    const results = fuse.search(filterValue);

    const pickTag = (tag: ValuesType<TagsPickerProps['tags']>) => {
        setPickedTags([...pickedTags, tag]);
        setShowResults(false);
        setSearchableTags(searchableTags.filter(({ id }) => tag.id !== id));
        setFilterValue('');
        props.onChange && props.onChange(pickedTags);
    };

    const removeTags = (tag: ValuesType<TagsPickerProps['tags']>) => {
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
            <div className='TagsPicker_Input flex'>
                <div className='TagsPicker_PickedTags'>
                    {pickedTags?.map(tag => {
                        return (
                            <TagChip
                                key={tag.id}
                                tag={tag}
                                onDelete={removeTags}
                            />
                        );
                    })}
                </div>
                <TextField
                    onKeyDown={event => {
                        if (event.key.toLocaleLowerCase() === 'enter') {
                            pickTag(results[0].item);
                        }
                    }}
                    onClick={() => setShowResults(true)}
                    value={filterValue}
                    onChange={onChange}
                    ariaLabel={props.ariaLabel}
                    placeholder={props.placeholder}
                />
            </div>
            {filterValue && showResults ? (
                <div ref={clickAwayRef}>
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
