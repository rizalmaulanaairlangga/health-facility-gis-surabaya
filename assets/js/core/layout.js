export function renderHeader() {
  return `
    <header class="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 class="font-bold text-lg">GIS Kesehatan Surabaya</h1>
      
      <nav class="flex gap-4 text-sm">
        <a href="/map.html" class="hover:text-blue-600">Map</a>
        <a href="/dashboard.html" class="hover:text-blue-600">Dashboard</a>
      </nav>
    </header>
  `;
}