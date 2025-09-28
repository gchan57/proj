// The base URL of your new backend server
const API_URL = 'http://localhost:5001/api';

// --- GIGS API ---

// GET Gigs with filtering and search
export const getGigs = (category = 'All', searchTerm = '') => {
  // Note: Search term functionality needs to be built on the backend
  return fetch(`${API_URL}/gigs?category=${category}`)
    .then(res => res.json());
};

// GET Gig by ID
export const getGigById = (id) => {
  return fetch(`${API_URL}/gigs/${id}`)
    .then(res => res.json());
};

// GET Gigs by a specific Freelancer
export const getGigsByFreelancer = (freelancerId) => {
  return fetch(`${API_URL}/gigs?freelancerId=${freelancerId}`)
    .then(res => res.json());
};

// CREATE a new Gig
export const createGig = (gigData, freelancerId) => {
  return fetch(`${API_URL}/gigs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...gigData, freelancerId }),
  }).then(res => res.json());
};

// UPDATE a Gig
export const updateGig = (gigId, updatedData) => {
  return fetch(`${API_URL}/gigs/${gigId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  }).then(res => res.json());
};

// DELETE a Gig
export const deleteGig = (gigId) => {
  return fetch(`${API_URL}/gigs/${gigId}`, {
    method: 'DELETE',
  }).then(res => res.json());
};


// --- USER/AUTH API (Simplified) ---
// In a real app, you would create these routes on the backend.
// For now, we will keep localStorage for user session management.
export const signUp = (userData) => new Promise((resolve) => {
  // This would be a POST request to /api/auth/signup
  // For now, we simulate it.
  const newUser = { id: Date.now(), ...userData };
  console.log("Simulating SignUp:", newUser);
  resolve(newUser);
});

export const login = (credentials) => new Promise((resolve, reject) => {
  // This would be a POST request to /api/auth/login
  // This simplified version doesn't actually log in a real user.
  if (credentials.email === "client@test.com") {
    resolve({ id: 1, name: 'Test Client', email: 'client@test.com', role: 'client' });
  } else if (credentials.email === "freelancer@test.com") {
    resolve({ id: 2, name: 'Test Freelancer', email: 'freelancer@test.com', role: 'freelancer' });
  } else {
    reject(new Error('Invalid email or password.'));
  }
});