"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/app/components/ui/Apple-cards-carousel";

interface Project {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
}

export function AppleCardsCarouselDemo() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('https://portfolio-backend-java.onrender.com/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const cards = projects.map((project, index) => (
    <Card 
      key={project.id} 
      card={{
        category: "Project",
        title: project.title,
        src: project.imageLink,
        content: <ProjectContent project={project} />
      }} 
      index={index} 
    />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {project.title}
        </span>{" "}
        {project.description}
      </p>
      <Image
        src={project.imageLink}
        alt={`${project.title} preview`}
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
      <a 
        href={project.projectLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        View Project
      </a>
    </div>
  );
};