import * as assert from 'assert';

describe('UI Test starting', () => {
  it('Should have title file-base', async () => {
    expect(browser).toHaveTitle('file-base');
    expect(browser).

    const button = await $(
      '/html/body/div/div/div[1]/div[1]/main/div/div[2]/div[1]/button'
    );
    button.click();

    const div = await $('/html/body/div[3]/div/div/form/div[1]/div');

    await assert(await div.getText(), 'Create library');
  });
});

/**
//*[@id="root"]/div/div[1]/div[1]/main/div/div[2]/div[1]/button
//*[@id="root"]/div/div[1]/div[1]/main/div/div[2]/div[1]/button
/html/body/div/div/div[1]/div[1]/main/div/div[2]/div[1]/button
 * */
