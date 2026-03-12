// This page is now wrapped in a main with responsive margin in the layout, so no need for extra margin here.
export default function AdminPage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">
        Welcome to the admin dashboard. Here you can manage your application.
      </p>
      {/* Add your dashboard content here */}
    </div>
  );
}
