// @ts-check

/** @type {import("@commitlint/types").UserConfig} */
export default {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'polish',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'workflow',
        'ci',
        'chore',
        'types',
        'revert',
        // custom types
        'build',
        'release',
        'wip',
      ],
    ],
  },
}
