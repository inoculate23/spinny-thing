# Spinny Thing - Spiral Line Drawer

A beautiful, interactive web application that draws colorful spiral patterns using HTML5 Canvas. Watch mesmerizing spiral animations unfold with customizable speed and density controls.

## Features

- 🎨 **Colorful Spiral Animation**: Creates beautiful gradient spiral patterns with 7 different colors
- ⚡ **Interactive Controls**: Start, pause, and reset the animation at any time
- 🎚️ **Customizable Parameters**: Adjust speed (1-10) and spiral density (1-20) with sliders
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- 🌈 **Modern UI**: Features a stunning purple gradient background with glassmorphism effects

## Live Demo

Once deployed to Netlify, your spiral drawer will be live!

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser, or
3. Serve with any HTTP server:
   ```bash
   python3 -m http.server 8080
   ```
   Then open `http://localhost:8080` in your browser

## How It Works

The application uses HTML5 Canvas and JavaScript's `requestAnimationFrame` to create smooth spiral animations. The spiral is drawn by:
- Calculating points along a spiral path using polar coordinates
- Incrementing the angle and radius on each frame
- Applying different colors based on the current angle
- Automatically resetting when the spiral reaches the canvas edge

## Technologies Used

- **HTML5**: Structure and Canvas element
- **CSS3**: Modern styling with gradients and responsive design
- **Vanilla JavaScript**: Animation logic and user interaction
- **Netlify**: Hosting and deployment

## Deployment

This app is ready to deploy on Netlify! The `netlify.toml` configuration is already set up:

```toml
[build]
  publish = "."
  command = "echo 'Static site - no build needed'"
```

Simply connect your repository to Netlify and it will automatically deploy.

## License

MIT License - see LICENSE file for details
