const config = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@web/mocks/storybook-addon'
  ],
  framework: {
    name: '@web/storybook-framework-web-components',
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
