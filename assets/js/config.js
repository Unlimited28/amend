// Single Source of Truth for Front-End Configuration

const ROLES = {
    SUPER_ADMIN: 'superadmin',
    PRESIDENT: 'president',
    AMBASSADOR: 'ambassador',
    FINANCE: 'finance',
    PUBLIC: 'public'
};

// Organization Details
const config = {
    org_name: "Ogun Baptist Conference",
    tagline: "Royal Ambassadors",
    org_address: "Baptist Mission Compound, Idi-Aba, Abeokuta, Ogun State",
    org_phone: "+234 123 456 7890",
    org_email: "info@ogunbaptist.com",
    uid_prefix: "OGBC/RA/",
};

// Associations List
window.OGBC_ASSOCIATIONS = [
    "Agape Baptist Association", "Abeokuta North West Baptist Association", "Ketu Baptist Association",
    "Irepodun Oke-Yewa Baptist Association", "Zion Baptist Association", "Abeokuta South Baptist Association",
    "Ijebu North East Baptist Association", "Great Grace Baptist Association", "Abeokuta East Baptist Association",
    "Upper Room Baptist Association", "Ijebu North Baptist Association", "Abeokuta North-East Baptist Association",
    "Abeokuta west Baptist Association", "Bethel Baptist Association", "Ayetoro Baptist Association",
    "Dominion Baptist Association", "Iroyin Ayo Baptist Association", "Ijebu Central Baptist Association",
    "Rehoboth Baptist Association", "Christlife Baprist Association", "Ifeoluwa Baptist Association",
    "Ijebu Progressive Baptist Association", "Yewa Baptist Association", "Ayooluwa Baptist Association",
    "Macedonia Baptist Association"
];

// Ranks List
window.OGBC_RANKS = [
    "Candidate", "Assistant Intern", "Intern", "Senior Intern", "Envoy",
    "Senior Envoy", "Special Envoy", "Ambassador", "Ambassador Extraordinary", "Ambassador Plenipotentiary"
];

// Simulated Passcodes for Front-End Validation
window.ADMIN_PASSCODE = "OGBC/ACCESS/SUPER";
window.PRESIDENT_PASSCODE = "OGBC/ACCESS/PRESIDENT";
window.FINANCE_PASSCODE = "OGBC/ACCESS/FIN";

// Mock Data for Placeholders
const mockData = {
    total_users: "1,250",
    pending_payments: "82",
    upcoming_exams: "5",
    unread_notifications: "12",
    user_uid: "OGBC/RA/0635",
    about_excerpt: "A brief, compelling excerpt about the Royal Ambassadors of the Ogun Baptist Conference.",
    blog_preview: "Latest news and updates...",
    gallery_preview: "Images from our latest events...",
    events_list: "Upcoming camps, meetings, and exams."
};

// Function to apply placeholders
function applyPlaceholders() {
    const allElements = document.getElementsByTagName('*');
    for (const element of allElements) {
        if (element.children.length === 0) {
            let content = element.innerHTML;
            content = content.replace(/{org_name}/g, config.org_name)
                             .replace(/{tagline}/g, config.tagline)
                             .replace(/{org_address}/g, config.org_address)
                             .replace(/{org_phone}/g, config.org_phone)
                             .replace(/{org_email}/g, config.org_email)
                             .replace(/{total_users}/g, mockData.total_users)
                             .replace(/{pending_payments}/g, mockData.pending_payments)
                             .replace(/{upcoming_exams}/g, mockData.upcoming_exams)
                             .replace(/{unread_notifications}/g, mockData.unread_notifications)
                             .replace(/{user_uid}/g, mockData.user_uid)
                             .replace(/{about_excerpt}/g, mockData.about_excerpt)
                             .replace(/{blog_preview}/g, mockData.blog_preview)
                             .replace(/{gallery_preview}/g, mockData.gallery_preview)
                             .replace(/{events_list}/g, mockData.events_list);
            element.innerHTML = content;
        }
    }
}
