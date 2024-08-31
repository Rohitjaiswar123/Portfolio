"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Carousel, Card } from "@/app/components/ui/Apple-cards-carousel";

interface Project {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
}

export default function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const ProjectContent: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {project.title}
        </span>{" "}
        {project.description}
      </p>
      <Image
        src={project.imageLink}
        alt={project.title}
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
        View Project
      </a>
    </div>
  );

  const cards = projects.map((project, index) => (
    <Card
      key={project.id}
      card={{
        category: "Project",
        title: project.title,
        src: project.imageLink,
        content: <ProjectContent project={project} />,
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Here's my Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}