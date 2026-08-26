# Zentrixa Official Website

This is the official website for Zentrixa, a StartupTN registered IT company.

## Project Structure
- `index.html`: Main entry point with Tailwind configuration.
- `app.js`: Main React application component.
- `components/`: Contains all UI sections (Hero, About, Services, etc.).

## Theme
- Dark Corporate Tech Theme
- Primary Colors: Neon Cyan, Neon Purple
- Background: Deep Dark Blue/Black

## Database Integration
- **Inquiries**: The Contact form is connected to the `inquiry` table in Trickle Database.
  - Fields: Name, Email, Category (Project/Workshop), Service, Message, Date
  - Flow: User selects Category -> Fills form -> Data stored in DB -> Redirects to WhatsApp.
- **Client Reviews**: The 'Write a Review' feature is connected to the `client_review` table.
  - Fields: Name, Role, Content, Rating, Date
  - Flow: User clicks 'Write a Review' -> Modal opens -> Data stored in DB.

## SEO & Accessibility
- The site is optimized for SEO with descriptive meta tags, Open Graph (OG) tags, and Twitter card metadata.
- ARIA labels have been implemented across navigation, modals, and interactive buttons to ensure accessibility compliance and high SEO scores.
