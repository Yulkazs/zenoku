export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Theme Switcher Demo</h1>
      <p className="subtext mb-8">This is a demonstration of light and dark mode switching</p>
      
      <div id="container" className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">Content Card</h2>
        <p className="subtext">This container changes color based on the theme</p>
      </div>
    </div>
  );
}