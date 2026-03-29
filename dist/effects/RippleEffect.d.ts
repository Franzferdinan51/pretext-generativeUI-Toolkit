import { default as React } from 'react';

export interface RippleEffectProps {
    children?: React.ReactNode;
    className?: string;
    color?: string;
    duration?: number;
}
export declare function RippleEffect({ children, className, color, duration, }: RippleEffectProps): import("react/jsx-runtime").JSX.Element;
export declare function withRipple<P extends object>(Component: React.ComponentType<P>): (props: P & RippleEffectProps) => import("react/jsx-runtime").JSX.Element;
export default RippleEffect;
