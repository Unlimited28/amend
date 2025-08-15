/**
 * A lightweight front-end authentication and role-based visibility handler.
 *
 * Simulates user login by storing role in sessionStorage and controls UI element
 * visibility based on `data-role` attributes.
 *
 * TODO: This is for front-end demonstration ONLY. Real authentication and
 * access control MUST be enforced on the server-side.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Role Simulation ---
    // In a real app, this would be set upon login from a server response.
    // For demonstration, we can manually set it in the browser's console:
    // e.g., sessionStorage.setItem('userRole', 'SUPER_ADMIN');

    const getCurrentRole = () => {
        // Default to 'AMBASSADOR' if no role is set, for demonstration purposes.
        return sessionStorage.getItem('userRole') || 'AMBASSADOR';
    };

    // --- Visibility Control ---
    const applyRoleBasedVisibility = () => {
        const userRole = getCurrentRole();
        const allRoleGatedElements = document.querySelectorAll('[data-role]');

        // Add role class to body for broad CSS targeting
        if (document.body) {
            document.body.setAttribute('data-current-role', userRole);
        }

        allRoleGatedElements.forEach(element => {
            const requiredRoles = element.getAttribute('data-role').split('|');

            // If the user's role is in the list of required roles, show the element.
            // Otherwise, hide it.
            if (requiredRoles.includes(userRole) || requiredRoles.includes('ALL')) {
                element.style.display = ''; // Use default display
            } else {
                element.style.display = 'none';
            }
        });
    };

    // --- Public Functions (for login/logout simulation) ---
    window.auth = {
        /**
         * Simulates a user login by setting the role.
         * @param {string} role - The role to log in as (e.g., 'SUPER_ADMIN', 'PRESIDENT').
         */
        login: (role) => {
            if (!role) {
                console.error('Login function requires a role.');
                return;
            }
            sessionStorage.setItem('userRole', role.toUpperCase());
            console.log(`User logged in as: ${role.toUpperCase()}`);
            // Re-apply visibility rules after role change
            applyRoleBasedVisibility();
            // Optionally, redirect to the correct dashboard
            // window.location.href = '/dashboard'; // This would need a router
        },

        /**
         * Simulates a user logout by clearing the role.
         */
        logout: () => {
            sessionStorage.removeItem('userRole');
            console.log('User logged out.');
            // Re-apply visibility rules (will default to public/guest view)
            applyRoleBasedVisibility();
            // Optionally, redirect to the login page
            // window.location.href = '/login.html';
        },

        /**
         * Gets the current simulated user role.
         * @returns {string} The current role.
         */
        getCurrentRole: getCurrentRole,
    };

    // Initial application of visibility rules on page load
    applyRoleBasedVisibility();
});
