import { ReactElement } from 'react';

interface FilterComponent {
    [key: string]: ReactElement;
}

export interface FilterComponentsProps {
    character: FilterComponent;
    location: FilterComponent;
    episodes: FilterComponent;
}