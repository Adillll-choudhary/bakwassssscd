# Optimization & Deployment Recommendations

## 1. Critical: Image Compression
The primary cause of mobile crashes is the massive size of media assets.
- **Problem**: `shoes.mov` is 51MB. `portfolio-2.mov` is 12MB. Images are 2-4MB each.
- **Solution**: You MUST compress these files.
    - **Videos**: Convert `.mov` to `.mp4` (H.264) with lower bitrate (e.g. 2-3 Mbps for HD, 1 Mbps for mobile). Use Handbrake or FFmpeg.
    - **Images**: Convert `.png` to `.webp` or `.jpg` with 80% quality. Resize them to max 1920px width (some are 4K+).
    - **Tools**: [Squoosh.app](https://squoosh.app), [Handbrake](https://handbrake.fr/).

## 2. Environment Setup
- Ensure your `next.config.ts` remains set to `output: "export"` for static hosting (Netlify/Vercel static).
- If hosting on Netlify, ensure the build command is `npm run build` and publish directory is `out`.

## 3. What Was Fixed
- **Mobile Crashes**: 
    - Implemented mobile detection to reduce 3D render quality (`dpr`) on phones.
    - Reduced the number of active videos in the Work slider on mobile.
    - Disabled autoplay for non-visible videos.
- **Error Handling**:
    - Added `ErrorBoundary` to catch crashes in heavy components and show a friendly UI instead of a whitespace or "Try Again".
    - Removed unused `SplineRobot` component.
- **Performance**:
    - Preload policies adjusted for videos.
    - Memory usage reduced by disposing video textures on unmount.

## 4. Deployment Check
Run the following before deploying:
```bash
npm run build
```
If it passes, dragging the `out` folder to Netlify (or git push) should work perfectly.
