export const company = {
  name: "DEVOTRICX",
  legalName: "DEVOTRICX Technologies Private Limited",
  tagline: "Transforming Ideas into Immersive Digital Experiences",
  phone: "7672041816",
  phoneE164: "917672041816",
  email: "hello@devotricx.com",
  address:
    "Sai Nagar Colony, road no 3E, near Alkapuri X Road, Nagole, Hyderabad, Telangana, 500068",
  whatsapp: "https://wa.me/917672041816",
  mapsQuery: encodeURIComponent(
    "Sai Nagar Colony, road no 3E, near Alkapuri X Road, Nagole, Hyderabad, Telangana 500068",
  ),
  get mapsEmbed() {
    return `https://maps.google.com/maps?q=${this.mapsQuery}&z=16&output=embed`;
  },
  get mapsLink() {
    return `https://www.google.com/maps/search/?api=1&query=${this.mapsQuery}`;
  },
  get telLink() {
    return `tel:+${this.phoneE164}`;
  },
} as const;

/** Single source of truth for public metrics */
export const companyStats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Specialists" },
  { value: 4, suffix: "+", label: "Service Lines" },
] as const;
