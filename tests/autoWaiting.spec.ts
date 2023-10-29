import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto("http://uitestingplayground.com/ajax")
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    await successButton.click()

    /** Auto-waiting for textContext() */
    const text1 = await successButton.textContent()
    expect(text1).toEqual('Data loaded with AJAX get request.')

    /** 
     * Iteract with the element do not support auto-wait, e.g. allTextContents() 
     * => You need to build a Additional wait change the assertion method "toContain()"
     **/
    await successButton.waitFor({state: "attached"})
    const text2 = await successButton.allTextContents()
    expect(text2).toContain('Data loaded with AJAX get request.')

    /** Alternative way */
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //___ wait for element
    // await page.waitForSelector('.bg-success')

    //__ wait for particlular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //__ wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({page}) => {
    // test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})