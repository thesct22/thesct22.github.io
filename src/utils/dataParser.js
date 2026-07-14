import { parse } from 'yaml';
import contentYaml from '../data/content.yaml?raw';

const content = parse(contentYaml);

export function getSiteContent() {
  return content;
}
