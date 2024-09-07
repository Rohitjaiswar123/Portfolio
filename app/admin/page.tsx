import React, { useState, useEffect } from 'react';

// Define the structure of a Project
interface Project {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
}

// Main component
const AdminPanel: React.FC = () => {
  // State variables
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageLink: '',
    projectLink: '',
  });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch projects
  const fetchProjects = async () => {
    try {
      const response = await fetch('https://portfolio-backend-java.onrender.com/api/projects');
      const data = await response.json();
      setProjects(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const url = editingProjectId
      ? `https://portfolio-backend-java.onrender.com/api/projects/${editingProjectId}`
      : 'https://portfolio-backend-java.onrender.com/api/projects';
    const method = editingProjectId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updatedProject = await response.json();

      if (editingProjectId) {
        setProjects(projects.map(project => project.id === editingProjectId ? updatedProject : project));
      } else {
        setProjects([updatedProject, ...projects]);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  // Handle editing a project
  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageLink: project.imageLink,
      projectLink: project.projectLink,
    });
  };

  // Handle deleting a project
  const handleDeleteProject = async (id: number) => {
    try {
      await fetch(`https://portfolio-backend-java.onrender.com/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Reset form after submission or cancellation
  const resetForm = () => {
    setEditingProjectId(null);
    setFormData({ title: '', description: '', imageLink: '', projectLink: '' });
  };

  // Render the component
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>

      {/* Project Form */}
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingProjectId ? 'Edit Project' : 'Add Project'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md h-24"
          />
          <input
            type="text"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            placeholder="Image Link"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md"
          />
          <input
            type="text"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
            placeholder="Project Link"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
          >
            {editingProjectId ? 'Update Project' : 'Add Project'}
          </button>
          {editingProjectId && (
            <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Project List */}
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
        {isLoading ? (
          <p>Loading projects...</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="border border-gray-700 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-700">
                <div className="mb-4 md:mb-0 md:flex md:items-center md:space-x-4">
                  <img src={project.imageLink} alt={project.title} className="w-20 h-20 object-cover rounded-md mb-2 md:mb-0" />
                  <div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;