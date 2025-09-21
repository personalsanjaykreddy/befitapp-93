# Deployment Guide - Fit Map Voyage

This guide covers deploying your Fit Map Voyage app to various platforms and converting it to a mobile app.

## Web Deployment

### Static Hosting (Recommended)

Your app is a Single Page Application (SPA) that can be deployed to any static hosting service:

#### Netlify
1. Build your app: `npm run build`
2. Drag the `dist` folder to Netlify's deploy interface
3. Configure redirects by adding `_redirects` file to `public/`:
   ```
   /*    /index.html   200
   ```

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

#### GitHub Pages
1. Build your app: `npm run build`  
2. Push the `dist` folder contents to your `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Traditional Web Servers

For Apache/Nginx servers, ensure proper SPA routing:

**Apache (.htaccess)**:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Mobile App Development

### Option 1: Capacitor (Recommended)

Convert to native iOS/Android apps:

1. **Install Capacitor**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   ```

2. **Initialize Capacitor**:
   ```bash
   npx cap init "Fit Map Voyage" "com.yourcompany.fitmapvoyage"
   ```

3. **Build web assets**:
   ```bash
   npm run build
   ```

4. **Add platforms**:
   ```bash
   npx cap add ios
   npx cap add android
   ```

5. **Sync assets**:
   ```bash
   npx cap sync
   ```

6. **Open in IDE**:
   ```bash
   npx cap open ios     # Opens Xcode (macOS only)
   npx cap open android # Opens Android Studio
   ```

#### App Store Deployment

**iOS (requires macOS + Xcode)**:
1. Configure app icons and splash screens in Xcode
2. Set up signing certificates
3. Archive and upload to App Store Connect
4. Submit for review

**Android**:
1. Configure app icons in Android Studio
2. Generate signed APK/AAB:
   ```bash
   cd android
   ./gradlew assembleRelease
   # or for Play Store:
   ./gradlew bundleRelease
   ```
3. Upload to Google Play Console

### Option 2: Progressive Web App (PWA)

Your app already includes PWA configuration:

- `manifest.json` for app metadata
- Service worker ready
- Mobile-optimized design
- Offline capabilities

Users can "Install" directly from their mobile browser.

### Option 3: React Native (Advanced)

For full native performance, consider React Native conversion:
1. Create new React Native project
2. Port components to React Native equivalents
3. Use React Navigation for routing
4. Adapt styles to React Native's styling system

## Environment Configuration

### Production Environment Variables

Create `.env.production` for production-specific settings:

```env
VITE_APP_NAME="Fit Map Voyage"
VITE_API_URL="https://your-api.com"
VITE_ANALYTICS_ID="your-analytics-id"
```

### Build Optimization

For production builds, ensure:

- Asset optimization is enabled
- Source maps are disabled for security
- Bundle analysis for size optimization:
  ```bash
  npm run build -- --report
  ```

## Domain & SSL Setup

### Custom Domain
1. Configure DNS to point to your hosting provider
2. Set up SSL certificate (usually automatic with modern hosts)
3. Update canonical URLs in `index.html`

### CDN Configuration
Consider using a CDN for global performance:
- Cloudflare (free tier available)
- AWS CloudFront
- Google Cloud CDN

## Performance Monitoring

### Analytics Integration
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring
Consider integrating:
- Sentry for error tracking
- LogRocket for user session replay
- New Relic for performance monitoring

## Maintenance & Updates

### Automated Deployment
Set up CI/CD with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run smoke
      # Deploy to your hosting service
```

### Version Management
- Use semantic versioning
- Tag releases in Git
- Maintain changelog
- Test thoroughly before deployment

---

**Ready to deploy your fitness app? Choose the option that best fits your needs and follow the steps above!**