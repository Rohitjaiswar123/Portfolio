'use client';

import { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
}

const AdminPanel = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    imageLink: '',
    projectLink: '',
  });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null); // Ref for scrolling

  // Fetch projects from the backend on client side
  useEffect(() => {
    fetch('http://localhost:8080/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false); // Data is loaded
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setIsLoading(false); // Error occurred
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (editingProjectId !== null) {
      // Update project
      fetch(`http://localhost:8080/api/projects/${editingProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedProject) => {
          setProjects(projects.map((project) => (project.id === editingProjectId ? updatedProject : project)));
          resetForm();
        })
        .catch((error) => console.error('Error updating project:', error));
    } else {
      // Add project
      fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newProject) => {
          setProjects([newProject, ...projects]); // Prepend the new project to the top
          resetForm();
        })
        .catch((error) => console.error('Error adding project:', error));
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageLink: project.imageLink,
      projectLink: project.projectLink,
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to form
  };

  const handleDeleteProject = (id: number) => {
    fetch(`http://localhost:8080/api/projects/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
      })
      .catch((error) => console.error('Error deleting project:', error));
  };

  const resetForm = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      description: '',
      imageLink: '',
      projectLink: '',
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>

      <div ref={formRef} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingProjectId ? 'Edit Project' : 'Add Project'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            placeholder="Image Link"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
            placeholder="Project Link"
            className="border border-gray-700 bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 transition duration-200"
          >
            {editingProjectId ? 'Update Project' : 'Add Project'}
          </button>
          {editingProjectId && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

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
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
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
