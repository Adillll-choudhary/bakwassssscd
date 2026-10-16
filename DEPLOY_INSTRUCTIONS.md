# Deployment Instructions

Your site has been updated with ultra-smooth animations and cinematic transitions. The production build is ready in the `out/` folder.

Since I don't have direct access to your Netlify account credentials, please follow these steps to deploy the changes to `https://sprightly-torte-3f6426.netlify.app/`:

## Option 1: Using Netlify CLI (Recommended)

Run the following command in your terminal:

```bash
npx netlify deploy --prod --dir=out
```

Follow the prompts to log in and select your site.

## Option 2: Manual Upload

1.  Open your [Netlify Dashboard](https://app.netlify.com/).
2.  Navigate to the site **sprightly-torte-3f6426**.
3.  Go to the **Deploys** tab.
4.  Drag and drop the `out` folder from your project directory into the upload area.

## Key Changes
- **Smoother Scroll**: Enhanced Lenis configuration.
- **Cinematic Hero**: Slowed down entry animations.
- **Page Transitions**: Added fade effects between pages.
- **Fluent Cursor**: Optimized spring physics.
