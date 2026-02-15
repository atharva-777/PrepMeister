// Database configuration is now handled by the backend
// This file is kept for backward compatibility only
// Frontend now communicates with backend API endpoints

export async function connect() {
  // This function is deprecated - frontend should use backend API
  console.warn("Frontend should use backend API instead of direct DB connection");
}