/**
 * Add null and undefined to a type.
 */
export type Nullable<T> = T | null | undefined;

/**
 * Add null and undefined to ALL props of an object.
 *
 * NOTE: Optional props (?:) will stay optional.
 */
export type NullableProps<T> = {
  [P in keyof T]: Nullable<T[P]>;
};

/**
 * Add undefined to ALL props of an object.
 *
 * NOTE: Optional props (?:) will stay optional.
 */
export type UndefinedProps<T> = {
  [P in keyof T]: undefined | T[P];
};
