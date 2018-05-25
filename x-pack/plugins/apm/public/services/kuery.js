/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  fromKueryExpression,
  toElasticsearchQuery,
  getSuggestionsProvider
} from 'ui/kuery';

export function convertKueryToEsQuery(kuery, indexPattern) {
  const ast = fromKueryExpression(kuery);
  return toElasticsearchQuery(ast, indexPattern);
}

export async function getSuggestions(query, apmIndexPattern) {
  const config = {
    get: () => true
  };

  const getKuerySuggestions = getSuggestionsProvider({
    config,
    indexPatterns: [apmIndexPattern]
  });
  return getKuerySuggestions({
    query,
    selectionStart: query.length,
    selectionEnd: query.length
  });
}
