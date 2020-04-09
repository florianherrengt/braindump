import React, {
    HTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    useState,
    useCallback,
    useMemo,
} from 'react';
import classNames from 'classnames';
import { Color, Variant } from '../../config/theme';
import { TextField } from '../TextField';
import { FuseSearchOptions } from 'fuse.js';
import Fuse from 'fuse.js';

interface AutoCompleteProps {
    data: Array<{ id: string; label: string }>;
    ariaLabel: string;
    placeholder: string;
    value?: string;
}

export const AutoComplete: React.SFC<AutoCompleteProps> = props => {
    const [filterValue, setFilterValue] = useState(props.value || '');

    const fuse = useMemo(
        () =>
            new Fuse(props.data, {
                isCaseSensitive: false,
                findAllMatches: false,
                includeMatches: false,
                includeScore: false,
                useExtendedSearch: false,
                minMatchCharLength: 1,
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                keys: ['label'],
            }),
        [props.data],
    );

    const results = fuse.search(filterValue);

    return (
        <div className='AutoComplete'>
            <TextField
                value={filterValue}
                onChange={setFilterValue}
                ariaLabel={props.ariaLabel}
                placeholder={props.placeholder}
            />
            {filterValue ? (
                <ul className='AutoComplete_Results_List'>
                    {results.map(row => {
                        return (
                            <li className='AutoComplete_Results_List_Item'>
                                <a>{row.item.label}</a>
                            </li>
                        );
                    })}
                    {!results.length ? (
                        <li className='AutoComplete_Results_List_Item'>
                            No results
                        </li>
                    ) : null}
                </ul>
            ) : null}
        </div>
    );
};
