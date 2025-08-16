/**
 * Injects shared HTML partials (header, footer, sidebar) into the page.
 * @param {object} options - The options for layout injection.
 * @param {string} options.role - The role of the current user ('public', 'superadmin', 'president', 'ambassador', 'finance').
 * @param {string} options.basePath - The relative path to the root directory (e.g., '.' or '..').
 */
async function injectLayout({ role, basePath }) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // 1. Inject Header
    if (headerPlaceholder) {
        const headerFile = role === ROLES.PUBLIC ? 'header-public.html' : 'header.html';
        try {
            const response = await fetch(`${basePath}/partials/${headerFile}`);
            headerPlaceholder.innerHTML = await response.text();
        } catch (error) {
            console.error('Failed to load header:', error);
            headerPlaceholder.innerHTML = '<p>Error loading header.</p>';
        }
    }

    // 2. Inject Sidebar (if applicable)
    if (sidebarPlaceholder && role !== 'public') {
        const sidebarUrl = `${basePath}/partials/sidebar-${role}.html`;
        try {
            const response = await fetch(sidebarUrl);
            if(response.ok) {
                sidebarPlaceholder.innerHTML = await response.text();
            } else {
                throw new Error(`Sidebar not found at ${sidebarUrl}`);
            }
        } catch (error) {
            console.error('Failed to load sidebar:', error);
            sidebarPlaceholder.innerHTML = '<p>Error loading sidebar.</p>';
        }
    }

    // 3. Inject Footer
    if (footerPlaceholder) {
        const footerFile = role === ROLES.PUBLIC ? 'footer-public.html' : 'footer.html';
        try {
            const response = await fetch(`${basePath}/partials/${footerFile}`);
            footerPlaceholder.innerHTML = await response.text();
        } catch (error) {
            console.error('Failed to load footer:', error);
            footerPlaceholder.innerHTML = '<p>Error loading footer.</p>';
        }
    }

    // Wait for all content to be injected before applying other functions
    await new Promise(resolve => setTimeout(resolve, 100));

    // 4. Apply Placeholders
    if (typeof applyPlaceholders === 'function') {
        applyPlaceholders();
    } else {
        console.warn('applyPlaceholders function not found. Did you include config.js?');
    }

    // 5. Set Active Menu Item
    setActiveMenu();

    // 6. Guard Role
    guardRole(role);
}

/**
 * Highlights the active menu item in the sidebar based on the current URL.
 */
function setActiveMenu() {
    const currentPath = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('#sidebar-placeholder a');

    sidebarLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
            // If it's in a dropdown, open the dropdown
            const parentCollapse = link.closest('.collapse');
            if (parentCollapse) {
                parentCollapse.classList.add('show');
                const toggler = document.querySelector(`[data-bs-target="#${parentCollapse.id}"]`);
                if (toggler) {
                    toggler.setAttribute('aria-expanded', 'true');
                }
            }
        }
    });
}

/**
 * Simulates role-based access control on the front-end.
 * It checks localStorage for a 'userRole' and redirects if it doesn't match the expected role.
 * @param {string} expectedRole - The role required to view the page (e.g., ROLES.SUPER_ADMIN).
 */
function guardRole(expectedRole) {
    // Public pages don't need guarding. ROLES.PUBLIC is 'public'.
    if (expectedRole === ROLES.PUBLIC) {
        return;
    }

    // For testing, you can manually set the role in the browser's console:
    // localStorage.setItem('userRole', 'superadmin');
    const storedRole = localStorage.getItem('userRole');

    if (storedRole !== expectedRole) {
        alert(`Access Denied. You need '${expectedRole}' privileges to view this page. You have '${storedRole || 'no role'}'. Redirecting to login.`);

        // Determine the correct path to the login page from any depth.
        // This assumes a flat structure within each role directory.
        const isPublicOrAuth = window.location.pathname.includes('/public/') || window.location.pathname.includes('/auth/');
        const loginPath = isPublicOrAuth ? 'auth/login.html' : '../auth/login.html';

        window.location.href = loginPath;
    }
}

// Simple 404 handler for broken links
document.addEventListener('click', function(event) {
    const target = event.target.closest('a');
    if (target && target.hostname === window.location.hostname) {
        const path = target.getAttribute('href');
        // A very basic check for missing files. In a real app, this would be more robust.
        if (path && !path.startsWith('#') && path.endsWith('.html')) {
            fetch(path, { method: 'HEAD' })
                .then(res => {
                    if (!res.ok) {
                        console.warn(`Link points to a non-existent page: ${path}. Redirecting to 404.`);
                        // To prevent infinite loops if 404 is also missing
                        if (!window.location.pathname.endsWith('404.html')) {
                           // window.location.href = '/public/404.html'; // Assuming basePath logic will be complex
                        }
                    }
                }).catch(err => {
                    console.error('Could not check link validity', err);
                });
        }
    }
});
