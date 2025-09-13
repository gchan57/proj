// --- Mock Database using localStorage ---

const GIGS_KEY = 'gighub_gigs';

// Initialize gigs with default data if none exists in localStorage
const initializeGigs = () => {
  let gigs = JSON.parse(localStorage.getItem(GIGS_KEY));
  if (!gigs || gigs.length === 0) {
    gigs = [
        { id: 1, title: 'Website Development', price: 500, description: 'I will build a responsive website for your business. I am a full-stack developer with 5 years of experience.', category: 'Web Development', rating: 4.8, freelancerId: 1 },
        { id: 2, title: 'Logo Design', price: 100, description: 'I will design a professional and unique logo for your brand. I have a strong portfolio in branding and identity design.', category: 'Design', rating: 4.5, freelancerId: 2 },
        { id: 3, title: 'Content Writing', price: 50, description: 'I will write SEO-friendly and engaging content for your blog or website. I specialize in tech and marketing content.', category: 'Writing', rating: 4.7, freelancerId: 3 },
        { id: 4, title: 'Social Media Management', price: 300, description: 'I will manage your social media accounts and grow your online presence. I can create a content strategy and schedule posts.', category: 'Marketing', rating: 4.9, freelancerId: 1 },
        { id: 5, title: 'Mobile App Development', price: 1000, description: 'I will develop a cross-platform mobile app for iOS and Android using React Native. Let\'s build your dream app!', category: 'Development', rating: 4.6, freelancerId: 2 },
        { id: 6, title: 'Data Analysis', price: 250, description: 'I will analyze your business data and provide actionable insights. I am proficient in Python, R, and SQL.', category: 'Analytics', rating: 4.4, freelancerId: 3 }
    ];
    localStorage.setItem(GIGS_KEY, JSON.stringify(gigs));
  }
  return gigs;
};

let gigs = initializeGigs();

const saveGigs = () => {
  localStorage.setItem(GIGS_KEY, JSON.stringify(gigs));
};

// --- API Functions ---

// GET Gigs with filtering and search
export const getGigs = (category = 'All', searchTerm = '') => new Promise(resolve => {
  let filteredGigs = [...gigs];

  if (category !== 'All') {
    filteredGigs = filteredGigs.filter(gig => gig.category === category);
  }

  if (searchTerm) {
    const lowercasedTerm = searchTerm.toLowerCase();
    filteredGigs = filteredGigs.filter(gig => 
      gig.title.toLowerCase().includes(lowercasedTerm) ||
      gig.description.toLowerCase().includes(lowercasedTerm)
    );
  }
  
  setTimeout(() => resolve(filteredGigs), 300);
});

// GET Gig by ID
export const getGigById = (id) => new Promise(resolve => {
  setTimeout(() => resolve(gigs.find(gig => gig.id === parseInt(id))), 300);
});

// GET Gigs by a specific Freelancer
export const getGigsByFreelancer = (freelancerId) => new Promise(resolve => {
  setTimeout(() => resolve(gigs.filter(gig => gig.freelancerId === freelancerId)), 300);
});

// CREATE a new Gig
export const createGig = (gigData, freelancerId) => new Promise(resolve => {
  const newGig = {
    ...gigData,
    id: Date.now(), // Simple unique ID
    freelancerId,
    rating: (Math.random() * (5 - 4) + 4).toFixed(1) // Random rating for demo
  };
  gigs.unshift(newGig); // Add to the beginning of the list
  saveGigs();
  setTimeout(() => resolve(newGig), 300);
});

// UPDATE a Gig
export const updateGig = (gigId, updatedData) => new Promise(resolve => {
  gigs = gigs.map(gig => (gig.id === gigId ? { ...gig, ...updatedData } : gig));
  saveGigs();
  setTimeout(() => resolve(gigs.find(gig => gig.id === gigId)), 300);
});

// DELETE a Gig
export const deleteGig = (gigId) => new Promise(resolve => {
  gigs = gigs.filter(gig => gig.id !== gigId);
  saveGigs();
  setTimeout(() => resolve({ success: true }), 300);
});