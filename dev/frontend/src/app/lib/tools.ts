function removeTrailingSlashes(str: string): string {
  if (!str) return '';
  const regex = /[\\/\s]+$/;
  return str.replace(regex, '');
}


export {
  removeTrailingSlashes
};
