// --- Title ---
/**
 * TODO jsdoc when properly implemented
 */
export function validateTitle(title: string) {
  // TODO decide on max title length
  // TODO do i do input sanitization front end for the title?
  const tlen = title.length;
  if (tlen <= 0) {
    return "Please enter a title for your post.";
  } else if (tlen > 100) {
    return "Title can have at most 100 characters.";
  }
  return true;
}

// --- Authors ---
/**
 * TODO jsdoc when properly implemented
 */
export function validateAuthors(authors: string[]) {
  // TODO this should check that the user who is creating the post is in the author list
  // or at least in the contributor list
  if (authors.length <= 0) {
    return "You must select at least one author for your post.";
  }

  return true;
}
