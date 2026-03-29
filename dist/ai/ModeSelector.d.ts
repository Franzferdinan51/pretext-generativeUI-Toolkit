import { default as React } from 'react';

export type DeliberationMode = 'legislative' | 'research' | 'coding' | 'creative' | 'general';
export interface ModeOption {
    mode: DeliberationMode;
    label: string;
    description: string;
    icon: string;
    color: string;
    defaultCouncilors?: number;
}
export interface ModeSelectorProps {
    selectedMode?: DeliberationMode;
    onModeChange?: (mode: DeliberationMode) => void;
    showDescription?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Detect optimal mode from input
 */
export declare function detectOptimalMode(input: string): DeliberationMode;
/**
 * Get mode option by mode type
 */
export declare function getModeOption(mode: DeliberationMode): ModeOption;
/**
 * ModeSelector component
 */
export declare const ModeSelector: React.FC<ModeSelectorProps>;
/**
 * AutoModeSelector - Automatically detects and selects mode
 */
export interface AutoModeSelectorProps extends Omit<ModeSelectorProps, 'selectedMode' | 'onModeChange'> {
    input: string;
    onAutoSelect?: (mode: DeliberationMode) => void;
}
export declare const AutoModeSelector: React.FC<AutoModeSelectorProps>;
/**
 * Hook for mode selection
 */
export declare function useModeSelector(initialMode?: DeliberationMode): {
    selectedMode: DeliberationMode;
    setSelectedMode: React.Dispatch<React.SetStateAction<DeliberationMode>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    detectedMode: DeliberationMode;
    option: ModeOption;
    detectMode: typeof detectOptimalMode;
};
export default ModeSelector;
