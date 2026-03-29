import { default as React } from 'react';

export interface Councilor {
    id: string;
    name: string;
    title: string;
    persona: string;
    expertise: string[];
    color: string;
    avatar?: string;
    votingStyle?: 'analytical' | 'pragmatic' | 'idealistic' | 'cautious';
}
export interface CouncilorSelectorProps {
    availableCouncilors: Councilor[];
    selectedIds?: string[];
    maxSelections?: number;
    minSelections?: number;
    onSelectionChange?: (selected: Councilor[]) => void;
    showExpertise?: boolean;
    groupByExpertise?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Predefined councilor archetypes
 */
export declare const COUNCILOR_ARCHETYPES: Record<string, Omit<Councilor, 'id'>>;
/**
 * Select councilors based on context
 */
export declare function selectCouncilorsForContext(available: Councilor[], context: string, count?: number): Councilor[];
/**
 * CouncilorSelector component
 */
export declare const CouncilorSelector: React.FC<CouncilorSelectorProps>;
/**
 * Hook for councilor selection
 */
export declare function useCouncilorSelector(availableCouncilors: Councilor[], initialSelection?: string[]): {
    selectedIds: string[];
    selectedCouncilors: Councilor[];
    select: (id: string) => void;
    deselect: (id: string) => void;
    toggle: (id: string) => void;
    selectForContext: (context: string, count?: number) => Councilor[];
    clear: () => void;
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
};
export default CouncilorSelector;
