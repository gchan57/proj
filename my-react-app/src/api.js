// In a real app, this data would come from a database
const gigs = [
    { id: 1, title: 'Website Development', price: 500, description: 'I will build a responsive website for your business. I am a full-stack developer with 5 years of experience.', category: 'Web Development', rating: 4.8, freelancerId: 1 },
    { id: 2, title: 'Logo Design', price: 100, description: 'I will design a professional and unique logo for your brand. I have a strong portfolio in branding and identity design.', category: 'Design', rating: 4.5, freelancerId: 2 },
    { id: 3, title: 'Content Writing', price: 50, description: 'I will write SEO-friendly and engaging content for your blog or website. I specialize in tech and marketing content.', category: 'Writing', rating: 4.7, freelancerId: 3 },
    { id: 4, title: 'Social Media Management', price: 300, description: 'I will manage your social media accounts and grow your online presence. I can create a content strategy and schedule posts.', category: 'Marketing', rating: 4.9, freelancerId: 1 },
    { id: 5, title: 'Mobile App Development', price: 1000, description: 'I will develop a cross-platform mobile app for iOS and Android using React Native. Let\'s build your dream app!', category: 'Development', rating: 4.6, freelancerId: 2 },
    { id: 6, title: 'Data Analysis', price: 250, description: 'I will analyze your business data and provide actionable insights. I am proficient in Python, R, and SQL.', category: 'Analytics', rating: 4.4, freelancerId: 3 }
];

const users = [
    { id: 1, name: 'Alice', role: 'freelancer' },
    { id: 2, name: 'Bob', role: 'freelancer' },
    { id: 3, name: 'Charlie', role: 'freelancer' },
];

export const getGigs = () => new Promise(resolve => {
    setTimeout(() => resolve(gigs), 500);
});

export const getGigById = (id) => new Promise(resolve => {
    setTimeout(() => resolve(gigs.find(gig => gig.id === parseInt(id))), 500);
});

export const getGigsByFreelancer = (freelancerId) => new Promise(resolve => {
    setTimeout(() => resolve(gigs.filter(gig => gig.freelancerId === freelancerId)), 500);
});