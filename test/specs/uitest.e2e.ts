import * as assert from 'assert';

describe('my awesome website', () => {
  it('should do some assertions', async () => {
    await expect(browser).toHaveTitle('file-base');

    const button = await $(
      '/html/body/div/div/div[1]/div[1]/main/div/div[2]/div[1]/button'
    );
    button.click();

    const div = await $('/html/body/div[3]/div/div/form/div[1]/div');

    await assert(await div.getText(), 'Create library');
  });
});
