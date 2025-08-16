import os
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    # Get the absolute path of the repository root
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # --- Test 1: Super Admin Login and Dashboard ---
    print("Running Test 1: Super Admin Login and Dashboard")
    login_url = f'file://{repo_root}/auth/login.html'
    page.goto(login_url)

    # Fill out the login form for superadmin
    # Dispatch 'change' event after selecting to ensure JS fires.
    page.locator("#login-role").select_option("superadmin")
    page.locator("#login-role").dispatch_event("change")

    page.locator("#login-email").fill("admin@test.com")
    page.locator("#login-password").fill("password")

    # Wait for the passcode field to be visible before filling
    passcode_input = page.locator("#login-passcode")
    expect(passcode_input).to_be_visible()
    passcode_input.fill("OGBC/ACCESS/SUPER")

    page.locator("#login-form button[type='submit']").click()

    # Wait for navigation to the dashboard and check title
    expect(page).to_have_url(f'file://{repo_root}/superadmin/dashboard.html')
    print("Successfully navigated to Super Admin dashboard.")
    page.screenshot(path="jules-scratch/verification/01_superadmin_dashboard.png")

    # --- Test 2: System Settings Page ---
    print("Running Test 2: System Settings Page")
    settings_link = page.locator('a[href="../superadmin/system-settings.html"]')
    settings_link.click()

    expect(page).to_have_url(f'file://{repo_root}/superadmin/system-settings.html')
    print("Successfully navigated to System Settings.")
    # Check for a key element of the 2-column layout
    expect(page.locator('.settings-card .card-header h4')).to_have_text(['Organization Info', 'Branding', 'Home Page Content', 'Access Passcodes'])
    page.screenshot(path="jules-scratch/verification/02_system_settings.png")

    # --- Test 3: Public Homepage ---
    print("Running Test 3: Public Homepage")
    # First, log out
    logout_link = page.locator('a[href="../auth/logout.html"]')
    logout_link.click()

    # After logout, we should be back at the login page
    expect(page).to_have_url(f'file://{repo_root}/auth/login.html')

    # Now navigate to the public homepage
    public_home_url = f'file://{repo_root}/public/index.html'
    page.goto(public_home_url)

    expect(page.locator('.public-nav')).to_be_visible()
    print("Successfully navigated to Public Homepage.")
    page.screenshot(path="jules-scratch/verification/03_public_homepage.png")

    print("Verification script finished successfully!")
    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
