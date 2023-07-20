export type Filter<T> = {
    column: keyof T;
    filter: (...args: any[] | any) => any;
};
export type HeightValue = `${number}px` | `${number}%` | `${number}vh` | `${number}rem` | `${number}em` | 'auto';
export type ActionRow = 'Selectable' | 'Action';
