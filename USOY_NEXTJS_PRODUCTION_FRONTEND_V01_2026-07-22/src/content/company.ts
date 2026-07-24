export const company = {
  name: "Ullanlinnan Sähkö Oy",
  legalName: "Ullanlinnan Sähkö Oy",
  businessId: "0106899-8",
  owner: "Hanna Haapalainen",
  phoneDisplay: "040 574 3094",
  phoneE164: "+358405743094",
  email: "hanna.haapalainen1@gmail.com",
  address: { street: "Pietarinkatu 21", postalCode: "00150", city: "Helsinki", countryCode: "FI" },
  openingHours: { display: "Keskiviikkoisin klo 10–17", dayOfWeek: "https://schema.org/Wednesday", opens: "10:00", closes: "17:00" }
} as const;

export const contactLinks = {
  phone: `tel:${company.phoneE164}`,
  email: `mailto:${company.email}`,
  directions: "https://www.google.com/maps/dir/?api=1&destination=Pietarinkatu+21%2C+00150+Helsinki"
} as const;
