const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const webhook = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
const failures = [];
if (!siteUrl || !/^https:\/\//i.test(siteUrl) || /VAHVISTETTAVA|LOPULLINEN|localhost/i.test(siteUrl)) failures.push("NEXT_PUBLIC_SITE_URL must be the final HTTPS production domain.");
if (!webhook || !/^https:\/\//i.test(webhook)) failures.push("CONTACT_FORM_WEBHOOK_URL must be the verified HTTPS form transport endpoint.");
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log("Production environment verification passed.");
