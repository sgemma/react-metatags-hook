import { getState, clearStore } from './state';
import { generateMetasMarkup } from './render/static';

const LINK_PRELOAD = 'link_rel=preload~';

// Function to generate metas static HTML
export const generateStaticHtml = () => {
  const metas = getState();
  return generateMetasMarkup(metas);
};
export const resetMetaTags = () => {
  clearStore();
};
export const generateStaticHtmlHighPriority = () => {
  const { tags, title } = getState();

  const highPriorityTags = Object.keys(tags)
    .filter((key) => key.startsWith(LINK_PRELOAD))
    .reduce((cur, key) => Object.assign(cur, { [key]: tags[key] }), {});

  return generateMetasMarkup({ tags: highPriorityTags, title });
};
export const generateStaticHtmlLowPriority = () => {
  const { tags, title, ...all } = getState();

  const lowPriorityTags = Object.keys(tags)
    .filter((key) => !key.startsWith(LINK_PRELOAD))
    .reduce((cur, key) => Object.assign(cur, { [key]: tags[key] }), {});

  return generateMetasMarkup({ ...all, tags: lowPriorityTags });
};
