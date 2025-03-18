/**
 * Merges classes into a single string.
 *
 * @param classes - The classes to be merged.
 * @returns A clean string of classes.
 */
export function mergeClasses<T = string | undefined | null>(...classes: T[]) {
  return classes
    .filter((className, index, array) => {
      return (
        Boolean(className) &&
        (className as string).trim() !== '' &&
        array.indexOf(className) === index
      )
    })
    .join(' ')
    .trim()
}
