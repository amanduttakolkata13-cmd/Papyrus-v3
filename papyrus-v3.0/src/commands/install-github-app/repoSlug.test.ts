import assert from 'node:assert/strict'
import test from 'node:test'

import { extractGitHubRepoSlug } from './repoSlug.ts'

test('keeps owner/repo input as-is', () => {
  assert.equal(extractGitHubRepoSlug('papyrus/papyrus'), 'papyrus/papyrus')
})

test('extracts slug from https GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('https://github.com/papyrus/papyrus'),
    'papyrus/papyrus',
  )
  assert.equal(
    extractGitHubRepoSlug('https://www.github.com/papyrus/papyrus.git'),
    'papyrus/papyrus',
  )
})

test('extracts slug from ssh GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('git@github.com:papyrus/papyrus.git'),
    'papyrus/papyrus',
  )
  assert.equal(
    extractGitHubRepoSlug('ssh://git@github.com/papyrus/papyrus'),
    'papyrus/papyrus',
  )
})

test('rejects malformed or non-GitHub URLs', () => {
  assert.equal(extractGitHubRepoSlug('https://gitlab.com/papyrus/papyrus'), null)
  assert.equal(extractGitHubRepoSlug('https://github.com/papyrus'), null)
  assert.equal(extractGitHubRepoSlug('not actually github.com/papyrus/papyrus'), null)
  assert.equal(
    extractGitHubRepoSlug('https://evil.example/?next=github.com/papyrus/papyrus'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://github.com.evil.example/papyrus/papyrus'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://example.com/github.com/papyrus/papyrus'),
    null,
  )
})
